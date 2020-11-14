<template>
    <component :is="tag" :class="component_classes" @click="clicked">
        <slot></slot>
    </component>
</template>
<script>
import Vue from 'vue';
export default{
    name:'vue-draggable',
    props:{
        is_droparea:{
            required:false,
            type:Boolean,
            default:false
        },
        custom_data:{
            required:false,
            type:Object,
            default:function(){
                return {}
            }
        },
        classes:{
            required:false,
            type:Array,
            default:function(){
                return []
            }
        },
        tag:{
            required:false,
            type:String,
            default:'span',
            validator:function(value){
                return ['br','script','noscript','dfn','object']
                .indexOf(value)==-1
            }
        },
        zindex:{
            required:false,
            type:Number,
            default:100 //what z-index to set while dragging
        },
        axis:{
            required:false,
            type:String,
            default:'xy'
        },
        offset:{ //how many pixels to move to count it as dragging
            required:false,
            type:Number,
            default:10
        },
        
        draghandle:{
            required:false,
            type:String,
            default:'' //a selector from the slot or the target
        },
        clone:{
            required:false,
            type:Boolean,
            default:false
        },
        clone_element:{
            required:false,
            type:Function,
            default:null
        },
        clone_opacity:{
            required:false,
            type:Number,
            default:0.5
        },
        dropareas:{
            required:false,
            type:Array,
            default:function(){
                return [];
            }
        },
        dropping_element:{
            required:false,
            type:Function,
            default:function(){
                var div = document.createElement('div');
                div.style.cssText = 'height:20px;border:dashed 2px #afafaf';
                div.classList.add('vue-dropping-ghost');
                return div;
            }
        },
        drop_ghost:{ //drag but after you drop, return to its first position
            required:false,
            type:Boolean,
            default:false
        },
        containment:{
            required:false,
            type:String,
            default:'body'
        },
        sortable:{
            required:false,
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            domElement:null, //which one to drag
            dragElement:null,
            cloneElement:null,
            domHandle:null, //from where to drag
            droppingElement:null,
            containmentElement:null,
            containmentRect:null,
            original_target:null,
            orginal_handle:null,
            isDragging:false,
            isDropping:false,
            dragStartX:-1,
            dragStartY:-1,
            elementX:-1,
            elemnentY:-1,
            elementDiffX:0,
            elementDiffY:0,
            isDroppable:false, // if we have dropareas than it is a droppable
            dropped_area:null,//the about to drop area
            drop_areas:[],
            cssPosition:'',
            sortDroppingElement_timeout:0,
            zIndex:0
        }
    },
    computed:{
        component_classes(){
            var _classes = {'vue-draggable':true, 'vue-dragging':this.is_dragging};
            for(var i=0;i<this.classes.length;i++){
                _classes[this.classes[i]] = true;
            }
            return _classes;
        },
        is_dragging(){
            return this.isDragging;
        },
        is_dropping(){
            return this.isDropping;
        }
    },
    methods:{
        clicked(event){
            this.$emit('clicked',{instance:this,customData: this.custom_data,nativeEvent:event});
        },
        dragStarted(event){
            event.stopPropagation();
            event.preventDefault();
            

            if( (event.which && event.which==3) || (event.button && event.button==2)){//should not detect right clicks as mousedown for dragging
                return;
            }

            this.isDroppable = false;
            this.dropped_area = null;

            this.dragStartX = event.touches && event.touches.length>0?event.touches[0].pageX:event.pageX;
            this.dragStartY = event.touches && event.touches.length>0?event.touches[0].pageY:event.pageY;
            this.$vdraggable.current = this;

            var dim = this.dsDom.getBoundingClientRect();
            this.elementX = dim.left;
            this.elementY = dim.top;
            this.elementDiffX = event.pageX - dim.left;
            this.elementDiffY = event.pageY - dim.top;

            if(this.containment=='body'){
                var rect = this.containmentElement.getBoundingClientRect();
                var wrect = this.viewportSize();
                if(rect.height<wrect.height){
                    this.containmentRect = wrect;
                }else{
                    this.containmentRect = rect;
                }
            }else{
                this.containmentRect = this.containmentElement.getBoundingClientRect();
            }

            document.addEventListener('mousemove',this.dragMove);
            document.addEventListener('touchmove',this.dragMove);
            document.addEventListener('mouseup',this.dragEnd);
            document.addEventListener('touchend',this.dragEnd);

            return false;
        },
        viewportSize(){
            var view = document.createElement( "div" );

            view.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index:-1,";
            document.documentElement.insertBefore( view, document.documentElement.firstChild );
            
            var dims = { width: view.offsetWidth, height: view.offsetHeight, x:0, y:0,left:0,top:0 };
            document.documentElement.removeChild( view );
            
            return dims;
        },
        dragMove(event){
            event.stopPropagation();
            event.preventDefault();

            this.dropped_area = null;
            
            var pageX = event.touches && event.touches.length>0?event.touches[0].pageX:event.pageX;
            var pageY = event.touches && event.touches.length>0?event.touches[0].pageY:event.pageY;
            var diffX = pageX - this.dragStartX;
            var diffY = pageY - this.dragStartY;
            if(this.axis=='xy' && (Math.abs(diffX)>this.offset || Math.abs(diffY)>this.offset ) ){
                this.isDragging = true;
            }else if(this.axis=='x' && Math.abs(diffX)>this.offset){
                this.isDragging = true;
            }else if(this.axis=='y' && Math.abs(diffY)>this.offset){
                this.isDragging = true;
            }
            if(this.isDragging){
                if(this.dragElement==null){
                    //first time we enter here when isDragging became true for first time
                    
                    this.getDropAreas();
                }
                if(this.clone && this.dragElement==null){
                    if(this.clone_element!=null){
                        this.dragElement = this.clone_element({instance:this,el: this.dsDom});
                    }else{
                        var dim = this.dsDom.getBoundingClientRect();
                        this.dragElement = this.dsDom.cloneNode(true);
                        this.dragElement.style.opacity = this.clone_opacity;
                        this.dragElement.style.position='absolute';
                        this.dragElement.style.left = dim.left+'px';
                        this.dragElement.style.top = dim.top+'px';
                    }
                    document.body.appendChild(this.dragElement);

                    this.$emit('drag_started',{instance:this,dragElement: this.dragElement, clone: this.clone,
                        customData: this.custom_data })
                }else if(this.dragElement==null){
                    this.dragElement = this.dsDom;
                    this.$emit('drag_started',{instance:this,dragElement: this.dragElement, clone:this.clone,
                        customData: this.custom_data })
                }
                this.dragElement.style.position='absolute';
                this.dragElement.style.zIndex = this.zindex;

                var finalX = pageX - this.elementDiffX;
                var finalY = pageY - this.elementDiffY;

                //check the containment, if we are inside the bounds of permitted dragging area
                if(finalX<this.containmentRect.left || finalX+this.dragElement.offsetWidth>this.containmentRect.left+this.containmentRect.width
            || finalY<this.containmentRect.top || finalY+this.dragElement.offsetHeight>this.containmentRect.top+this.containmentRect.height){
                return;//do not drag outside containment
            }


                //console.log(diffY);

                if(this.axis=='xy' || this.axis=='x'){
                    this.dragElement.style.left = finalX+'px';
                }
                if(this.axis=='xy' || this.axis=='y'){
                    this.dragElement.style.top = finalY+'px';
                }

                this.$emit('dragging',
                {instance:this, 
                dragElement: this.dragElement, 
                clone: this.clone, 
                coords:{x:finalX,y:finalY},
                nativeEvent: event,
                customData: this.custom_data })

                if(this.isDroppable){
                    //find in which droppable we are contained
                    //var is_contained = false;
                    for(var d=0;d<this.drop_areas.length;d++){
                        var drop_area = this.drop_areas[d];
                        
                        var draggable = {
                            left: finalX,
                            top: finalY,
                            width: this.dragElement.offsetWidth,
                            height: this.dragElement.offsetHeight
                        };
                        
                        if(this.contains(drop_area,draggable)){ 
                            
                            //is_contained = true;
                            drop_area.el.classList.add('vue-dropping');
                            this.dropped_area = drop_area;
                            //if we have not marked as active drop area, mark it (so we do not send none stop drop enter event)
                            //also we do not need to recreate the ghost dropping_element again and again, one time is enought
                            if(!drop_area.active){
                                drop_area.active = true;
                                drop_area.createDroppingElement({
                                    left: finalX,
                                    top: finalY
                                });
                                if(this.sortable){
                                    //get all first depth children of drop_area
                                    drop_area.sortDroppingElement({
                                        left: finalX,
                                        top: finalY,
                                        moveX: diffX, //minus going left, plus going down
                                        movedY: diffY //minus is going up, plus going down
                                    });
                                }
                                this.$emit('drop_enter',
                                {instance:this, 
                                dragElement:this.dragElement,
                                clone:this.clone,
                                areaElement: drop_area.el,
                                customData: this.custom_data 
                                });    
                                this.drop_areas[d] = drop_area;
                            }else{
                                drop_area.sortDroppingElement(
                                    {
                                        left: finalX,
                                        top: finalY,
                                        moveX: diffX, //minus going left, plus going down
                                        movedY: diffY //minus is going up, plus going down
                                    }
                                );
                                this.$emit('dropping',
                                {instance:this, 
                                dragElement:this.dragElement, 
                                clone:this.clone, 
                                areaElement: drop_area.el,
                                customData: this.custom_data 
                                });
                            }
                        }else{
                            //is_contained = false;
                            /**
                            if(drop_area.active){
                                if(drop_area.dropping_element!=null){
                                    drop_area.el.removeChild(drop_area.dropping_element);
                                    drop_area.dropping_element = null;
                                }
                                this.$emit('drop_exit',{instance:this, dragElement:this.dragElement, clone:this.clone, areaElement: drop_area.el});
                                drop_area.active= false;
                                this.drop_areas[d] = drop_area;
                            }
                            drop_area.el.classList.remove('vue-dropping')
                            **/
                        }

                    }//for
                    
                    //loop through all the drop_areas and any drop_area that is not currently active
                    //remove its active state and remove also any ghost dropping element
                    for(var dd=0;dd<this.drop_areas.length;dd++){
                        if(this.drop_areas[dd]!=this.dropped_area && this.drop_areas[dd].active){
                            this.drop_areas[dd].el.classList.remove('vue-dropping');
                            this.drop_areas[dd].active = false;
                            this.drop_areas[dd].removeDroppingElement();
                        }
                    }
                    

                }//if(this.isDroppable)
                
            }//if(this.isDragging)
        },
        dragEnd(event){
            event.preventDefault();
            
            /** CHECK IF WE WERE DRAGGING vis isDragging, because might never started */
            //console.log(event);
            if(this.isDragging){
                var drag_element = this.dragElement;
                if(this.clone && this.isDragging){ //be sure to remove clone element if we indeed dragged
                    document.body.removeChild(this.dragElement);
                    
                }

                
                this.dragElement = null;
                this.dsDom.style.position = 'absolute';

                var pageX = event.touches && event.touches.length>0?event.touches[0].pageX:event.pageX;
                var pageY = event.touches && event.touches.length>0?event.touches[0].pageY:event.pageY;

                if(this.axis=='xy' || this.axis=='x'){
                    this.dsDom.style.left = pageX - this.elementDiffX+'px';
                }
                if(this.axis=='xy' || this.axis=='y'){
                    this.dsDom.style.top = pageY - this.elementDiffY+'px';
                }
                if(this.isDroppable && this.dropped_area!=null){
                    var index = -1;
                    if(this.sortable){
                        index = this.dropped_area.dropping_element_index;
                    }
                    this.$emit('dropped',
                    {
                        instance:this,
                        areaElement:this.dropped_area.el,
                        dragElement:drag_element,
                        clone:this.clone,
                        sortable: this.sortable, 
                        newIndex: index,
                        customData: this.custom_data 
                    }
                    )
                    
                    //this.dropped_area.el.classList.remove('vue-dropping');

                    //remove the dropping_element
                    //this.dropped_area.el.removeChild(this.dropped_area.dropping_element);
                    //if we are acting as a ghost then do not append the element in the droppable area and return it
                    //to its previous position, we are responsible to create the element we want in the dropped area
                    if(!this.drop_ghost){
                    // alert('done');
                        if(this.sortable){
                            var dropping_index = this.dropped_area.dropping_element_index;
                            if(dropping_index>=0 && dropping_index<=this.dropped_area.children.length){
                                this.dropped_area.el.insertBefore(this.dsDom, this.dropped_area.children[dropping_index])
                            }else{
                                this.dropped_area.el.appendChild(this.dsDom);
                            }
                        }else{
                            this.dropped_area.el.appendChild(this.dsDom);
                        }
                        this.dsDom.style.position = this.cssPosition;
                        this.dsDom.style.zIndex = this.zIndex;
                    }else if(this.drop_ghost){
                        this.dsDom.style.position = this.cssPosition;
                        this.dsDom.style.zIndex = this.zIndex;
                    }
                }else if(this.isDroppable){
                    //return to previous position
                    this.dsDom.style.position = this.cssPosition;
                    this.dsDom.style.zIndex = this.zIndex;
                }
            }
            this.isDragging = false;
            this.isDroppable = false;
            //this.isDragging = false;
            this.dropped_area = null;
            this.$emit('drag_ended',{instance:this,customData: this.custom_data });
            this.resetDropAreas();
            document.removeEventListener('mousemove',this.dragMove);
            document.removeEventListener('mouseup',this.dragEnd);
        },
        setupEventHandlers(){
            this.domHandle.addEventListener('mousedown',this.dragStarted)
            this.domHandle.addEventListener('touchstart',this.dragStarted);
            this.domHandle.addEventListener('dragstart',(event)=>{
                event.preventDefault();
            } )
        },
        getId(){
            var d = new Date();
            return 'vdraggable-'+d.getMilliseonds();
        },
        resetDropAreas(){
            
            for(var d=0;d<this.drop_areas.length;d++){
                this.drop_areas[d].el.classList.remove('vue-dropping');
                this.drop_areas[d].active = false;
                //ean exo dropping element dimiourgimeno, katestrepse to
                if(this.drop_areas[d].dropping_element!=null){
                    this.drop_areas[d].removeDroppingElement();
                }
            }
            this.drop_areas = [];
        },
        getDropAreas(){
            this.isDroppable = false;
            if(this.dropareas.length==0){
                return;
            }
           var areas = document.querySelectorAll(this.dropareas.join(','));
           var my_areas = [];
           //find if me or my child have drop areas and do not include them in sorting
           //this.is_droparea = true;
           //if(this.is_droparea){
               var myareas=this.$el.querySelectorAll(this.dropareas.join(','));
               [].forEach.call(myareas,function(myel){
                   my_areas.push(myel);
               })
           //}
           var me = this;
           [].forEach.call(areas,function(el){
               if(my_areas.indexOf(el)!=-1){
                   //console.log('found my descendants');
                   return;
               }
               var drop = {
                   el: el,
                   dim: el.getBoundingClientRect(),
                   active: false,
                   children:[],
                   dropping_element_index:-1,
                   dropping_element:null, //holds a reference to dropping element in order to remove it
                   removeDroppingElement:function(){
                       if(this.dropping_element!=null){
                           //console.log(this.el);
                           this.el.removeChild(this.dropping_element);
                           this.dropping_element = null;
                       }
                   },
                   createDroppingElement:function(params){
                       this.dropping_element = me.dropping_element();
                       this.dropping_element.classList.add('vue-dropping-placeholder');
                       if(!me.sortable){
                        this.el.appendChild(this.dropping_element);
                       }
                       var new_index = this.findDroppingElement_index(params)
                       var that = this;
                       that.dropping_element_index = new_index;
                        if(new_index==-1){
                            //console.log('first');
                            that.el.appendChild(that.dropping_element);
                        }else 
                        if(new_index==that.children.length){
                            //console.log('last');
                            that.el.appendChild(that.dropping_element);
                        }else{
                            //console.log('before')
                            that.el.insertBefore(that.dropping_element,that.children[new_index]);
                        }
                   },
                   findDroppingElement_index:function(params){
                       var index=0;
                       var top = params.top;    
                       var new_index = 0;
                        for(var child of this.el.children){
                           //var child = this.children[index];
                           var placeholder_dim = {
                                width:0,
                                height:0
                            };
                           if(child.classList.contains('vue-dropping-placeholder')){
                               //found_placeholder = true;
                               placeholder_dim = child.getBoundingClientRect();
                               placeholder_dim.width;
                                //continue;
                               //console.log('found',found_placeholder, found_placeholder_before);
                           }
                           //var dim = child.dim;//getBoundingClientRect();
                           var dim = child.getBoundingClientRect();

                           
                                if(top>dim.top+(dim.height/2)){
                                    
                                    new_index = index;
                                }
                            
                           index++;
                       }
                       /**
                       if(false && found_placeholder_before){
                           new_index = parseInt(new_index);
                       }else{
                           **/
                        new_index=parseInt(new_index);
                        return new_index;
                   },
                   sortDroppingElement:function(params){
                       //var left = params.left;
                       var top = params.top;    
                       var new_index = 0;

                       var diffY = params.movedY;
                       var direction = 'down';
                       if(diffY<0){
                           direction = 'up';
                       }
                       var placehold_dim = this.dropping_element.getBoundingClientRect();
                       var appendTop = 0;
                       if(direction=='up'){
                           appendTop = parseInt(placehold_dim.height);
                       }
                       //console.log('appendtop',appendTop);
                       
                        var index=0;
                        for(var child of this.el.children){
                           //var child = this.children[index];
                           var placeholder_dim = {
                                width:0,
                                height:0
                            };
                           if(child.classList.contains('vue-dropping-placeholder')){
                               //found_placeholder = true;
                               placeholder_dim = child.getBoundingClientRect();
                               placeholder_dim.width;
                                //continue;
                               //console.log('found',found_placeholder, found_placeholder_before);
                           }
                           //var dim = child.dim;//getBoundingClientRect();
                           var dim = child.getBoundingClientRect();

                           
                                if(top + (appendTop/2) > dim.top+(dim.height/2)){
                                    
                                    new_index = index;
                                }
                            
                           index++;
                       }
                       /**
                       if(false && found_placeholder_before){
                           new_index = parseInt(new_index);
                       }else{
                           **/
                        new_index=parseInt(new_index);
                       //}
                       
                       if(new_index!=this.dropping_element_index){
                            clearTimeout(me.sortDroppingElement_timeout);
                            var that = this;
                            me.sortDroppingElement_timeout = setTimeout(function(){
                                if(that.dropping_element==null){
                                    return;
                                }
                                that.dropping_element_index = new_index;
                                if(new_index==-1){
                                    //console.log('first');
                                    that.el.appendChild(that.dropping_element);
                                }else 
                                if(new_index==that.children.length){
                                    //console.log('last');
                                    that.el.appendChild(that.dropping_element);
                                }else{
                                    //console.log('before')
                                    that.el.insertBefore(that.dropping_element,that.children[new_index]);
                                }
                            },12);
                       }
                   }
               };
               if(me.sortable){
                   var counter=0;
                   for(var child of el.children){
                       
                       child.dim = child.getBoundingClientRect();
                       if(child!==me.$el){
                        drop.children.push(child);//should we push our self?
                       }else{
                           drop.dropping_element_index = counter;
                       }
                       
                      counter++;
                   }
               }
               me.drop_areas.push(drop);
           })
           if(this.drop_areas.length>0){
               this.isDroppable = true;
           }
        },
        contains(droppable,draggable){
            var dim = droppable.dim;
           
            if(dim.left<draggable.left+(draggable.width/1.5) && dim.left+dim.width>draggable.left+(draggable.width/1.5) 
            && dim.top<draggable.top+(draggable.height/1.5) && dim.top+dim.height>draggable.top+(draggable.height/1.5)){
                return true;
            }
            
            return false;
        }
    },
    created(){
        if(typeof this.$vdraggable=='undefined'){
            Vue.prototype.$vdraggable = Vue.observable({
                creations:0,
                instances:0,
                isDragging:false,
                current:null
            })
        }
        this.$vdraggable.creations++;
        this.$vdraggable.instances++;
    },
    destroy(){
        this.$vdraggable.instances--;
        this.removeEventHandlers();
    },
    mounted(){
        //console.log(this.$slots.default);
        if(typeof this.$slots.default!=='undefined' && this.$slots.default.length>0){
            //console.log(this.$slots.default);
            this.dsDom = this.$el;//this.$slots.default[0].elm;
        }
        if(this.draghandle!='' && this.dsDom!=null){
            this.domHandle = this.dsDom.querySelector(this.draghandle);
        }else if(this.dsDom!=null && this.draghandle==''){
            this.domHandle = this.dsDom;
        }
        if(this.dropareas.length>0){
            this.isDroppable = true;
        }
        
        this.containmentElement = document.querySelector(this.containment);
        
        this.cssPosition = this.dsDom.style.position;
        this.zIndex = this.dsDom.style.zIndex;
        
        this.setupEventHandlers();
    }
}
</script>