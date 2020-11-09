<template>
    <span>
        <slot></slot>
    </span>
</template>
<script>
import Vue from 'vue';
export default{
    name:'vue-draggable',
    props:{
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
        target:{
            required:false,
            type:String,
            default:''
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
        ghost:{ //drag but after you drop, return to its first position
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
            original_target:null,
            orginal_handle:null,
            isDragging:false,
            dragStartX:-1,
            dragStartY:-1,
            elementX:-1,
            elemnentY:-1,
            elementDiffX:0,
            elementDiffY:0,
            isDroppable:false, // if we have dropareas than it is a droppable
            dropped_area:null,//the about to drop area
            drop_areas:[],
            cssPosition:''
        }
    },
    methods:{
        dragStarted(event){
            event.preventDefault();

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

            document.addEventListener('mousemove',this.dragMove)
            document.addEventListener('touchmove',this.dragMove);
            document.addEventListener('mouseup',this.dragEnd);
            document.addEventListener('touchend',this.dragEnd);
        },
        dragMove(event){
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
                    var dim = this.dsDom.getBoundingClientRect();
                    this.dragElement = this.dsDom.cloneNode(true);
                    this.dragElement.style.opacity = this.clone_opacity;
                    this.dragElement.style.position='absolute';
                    this.dragElement.style.left = dim.left+'px';
                    this.dragElement.style.top = dim.top+'px';
                    document.body.appendChild(this.dragElement);

                    this.$emit('dragStarted',{instance:this,dragElement: this.dragElement, clone: this.clone})
                }else if(this.dragElement==null){
                    this.dragElement = this.dsDom;
                    this.$emit('dragStarted',{instance:this,dragElement: this.dragElement, clone:this.clone})
                }
                this.dragElement.style.position='absolute';

                var finalX = pageX - this.elementDiffX;
                var finalY = pageY - this.elementDiffY;
                //console.log(diffX, diffY);
                if(this.axis=='xy' || this.axis=='x'){
                    this.dragElement.style.left = finalX+'px';
                }
                if(this.axis=='xy' || this.axis=='y'){
                    this.dragElement.style.top = finalY+'px';
                }

                this.$emit('isDragging',{instance:this, dragElement: this.dragElement, clone: this.clone, coords:{x:finalX,y:finalY}})

                if(this.isDroppable){
                    //find in which droppable we are contained
                    for(var d=0;d<this.drop_areas.length;d++){
                        var drop_area = this.drop_areas[d];
                        //console.log(drop_area);
                        var draggable = {
                            left: finalX,
                            top: finalY,
                            width: this.dragElement.offsetWidth,
                            height: this.dragElement.offsetHeight
                        };
                        
                        if(this.contains(drop_area,draggable)){ 
                            drop_area.el.classList.add('vue-dropping');
                            this.dropped_area = drop_area;
                            this.$emit('isDropping',{instance:this,dragElement:this.dragElement,clone:this.clone,areaElement: drop_area.el})    
                        }else{
                            drop_area.el.classList.remove('vue-dropping')
                        }
                    }
                }
                
            }
        },
        dragEnd(event){
            event.preventDefault();
            //console.log(event);
            if(this.clone){
                document.body.removeChild(this.dragElement);
                this.dragElement = null;
            }
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
                console.log('dropped too');
                this.dropped_area.el.appendChild(this.dsDom);
            }else if(this.isDroppable){
                //return to previous position
                this.dsDom.style.position = this.cssPosition;
            }
            this.isDroppable = false;
            this.isDragging = false;
            this.dropped_area = null;
            document.removeEventListener('mousemove',this.dragMove);
            document.removeEventListener('mouseup',this.dragEnd)
        },
        setupEventHandlers(){
            this.dsDom.addEventListener('mousedown',this.dragStarted)
            this.dsDom.addEventListener('touchstart',this.dragStarted);
            this.dsDom.addEventListener('dragstart',(event)=>{
                event.preventDefault();
            } )
        },
        getId(){
            var d = new Date();
            return 'vdraggable-'+d.getMilliseonds();
        },
        getDropAreas(){
            this.isDroppable = false;
            if(this.dropareas.length==0){
                return;
            }
           var areas = document.querySelectorAll(this.dropareas.join(','));
           [].forEach.call(areas,(el)=>{
               var drop = {
                   el: el,
                   dim: el.getBoundingClientRect()
               };
               this.drop_areas.push(drop);
           })
           if(this.drop_areas.length>0){
               this.isDroppable = true;
           }
        },
        contains(droppable,draggable){
            var dim = droppable.dim;
           // console.log(droppable.)
            //console.log(dim, draggable);
            //console.log(draggable);
            if(dim.left<draggable.left+draggable.width && dim.left+dim.width>draggable.left 
            && dim.top<draggable.top+draggable.height && dim.top+dim.height>draggable.top){
                return true;
            }
            if( ( dim.left<draggable.left+draggable.width && dim.left+dim.offsetWidth>draggable.left+draggable.width )
            ||  ( dim.left+droppable.offsetWidth< dim.left) ){
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
            this.dsDom = this.$slots.default[0].elm;
        }else if(this.target!='' && typeof this.target=='string'){
            this.dsDom = document.querySelector(this.target)
        }
        if(this.draghandle!='' && this.dsDom!=null){
            this.domHandle = this.dsDom.querySelector(this.draghandle);
        }
        if(this.dropareas.length>0){
            this.isDroppable = true;
        }
        this.cssPosition = this.dsDom.style.position;
        console.log(this.cssPosition);
        //console.log(this.dsDom);
        this.setupEventHandlers();
    }
}
</script>