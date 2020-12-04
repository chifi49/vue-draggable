<template>
    <div id="app">
        <heading :size="5" link="https://vue-draggable-demo.vercel.app/" link_target="_blank" :placeholder="'<span>{{text}}</span>'" text="Visit Docs" />
        <table width="100%">
            <tr valign="top">
                <td width="45%">
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <ul class="vue-droppable" id="vue-droppable-1">
                        <vuedraggable tag="li" :sortable="true" :classes="['.i-am-a-draggable']"
                         draghandle=".vue-draggable-handle"
                        axis="xy" :dropareas="droptoall" :offset="offset" :clone="false">
                            <div style="width:200px;line-height:30px;background-color:#000;color:#fff;margin:10">you can drag me
                                <div class="vue-draggable-handle" style="background-color:red;color:white;width:80%;margin:10px;">dragme from here</div>
                            </div>
                        </vuedraggable>
                        <vuedraggable tag="li" 
                        axis="xy" :sortable="true"
                        :dropareas="droptoall" :offset="offset" :clone="false">
                            <div style="width:300px;height:50px;line-height:30px;background-color:#000;color:#fff;margin:10">you can drag me 2</div>
                        </vuedraggable>
                        <vuedraggable :dropping_element="dropping_element" tag="li" 
                        :clone_element="clone_element" 
                        :sortable="true"
                        @dropped="dropped" @drag_ended="drag_ended" @dragging="dragging" @drop_enter="drop_enter" @drop_exit="drop_exit"
                        axis="xy" :dropareas="droptoall" :offset="offset" :clone="false">
                            <div style="width:200px;height:30px;line-height:30px;background-color:#000;color:#fff;margin:10">you can drag me 3</div>
                        </vuedraggable>

                        <vuedraggable tag="li" :sortable="true"
                         
                        axis="xy" :dropareas="droptoall" :offset="offset" :clone="false">
                            <div style="width:250px;height:60px;line-height:30px;background-color:#000;color:#fff;margin:10">you can drag me 4</div>
                        </vuedraggable>

                        <vuedraggable tag="li" 
                        axis="xy" :sortable="true"
                        :dropareas="droptoall" :offset="offset" :clone="false">
                            <div style="width:200px;height:30px;line-height:30px;background-color:#000;color:#fff;margin:10">you can drag me 5</div>
                        </vuedraggable>

                        
                    </ul>
                </td>
                <td width="45%">
                    <ul class="vue-droppable2" id="vue-droppable-2">
                        <vuedraggable :draghandle="'.draghandle'" :is_droparea="true" tag="li" axis="xy" :dropareas="['.vue-droppable2']" :sortable="true" :offset="offset" :clone="false">
                            <div style="position:relative" >
                                <div style="position:absolute;right:10px;top:-10px;background-color:#000;width:20px;height:20px;" class="draghandle"></div>
                            <ul class="vue-droppable2 vue-droppable2-child">
                                </ul>
                            </div>
                        </vuedraggable>
                    </ul>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import vuedraggable from './vue-draggable.vue';
import heading from './heading-component.vue';
export default{
    components:{
        vuedraggable,
        heading
    },
    data(){
        return {
            offset:10,
            clone:true,
            dropto:['.vue-droppable','.vue-droppable3'],
            droptoall:['.vue-droppable2','.vue-droppable'],
            ghost:true
        }
    },
    methods:{
        dropping_element(){
            var li = document.createElement('li');
            li.style.cssText = 'height:20px;border:dashed 2px #afafaf;margin-top:10px;';
            li.classList.add('vue-dropping-ghost');
            li.innerHTML = '';
            return li;
        },
        dropped(params){
            console.log(params);
            console.log('dropped in to area with index',params.newIndex)
        },
        dragging(params){
            //console.log(1)
            params.instance;
        },
        drop_enter(params){
            params.instance;
            console.log('entered drop area')
        },
        drop_exit(params){
            params.instance;
            console.log('exited drop area');
        },
        drag_ended(params){
            params.instance;
            console.log('drag ended');
        },
        clone_element(params){
            params.instance;
            params.el;
            var div = document.createElement('div');
            div.style.cssText = 'height:50px;width:150px;background-color:red;color:white;margin-top:10px;';
            div.innerHTML = 'copy';
            return div;
        }
    },
    mounted(){

    },
    created(){

    },
    beforDestroy(){
        
    }
}
</script>
<style >
.vue-droppable, .vue-droppable2{
    border:solid 1px #ccc;
    background-color:#efefef;
    width:100%;
    height:500px;
    list-style:none;
    margin:0;
    padding:0;
    padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;
}
.vue-droppable2-child{
    height:200px;
    max-width:90%;
}
ul li{
    margin-top:10px;
}
.vue-droppable3{
    border:solid 1px #ddd;
    background-color:#f3f3f3;
    width:90%;
    margin:0 auto;
    height:100px;
}
.vue-dropping{
    border:solid 1px red;
}

</style>