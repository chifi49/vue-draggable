<template>
    <div id="app">
        <table width="100%">
            <tr valign="top">
                <td width="33%">
                    <div class="vue-droppable">
                    <vuedraggable @dropped="dropped" @dragging="dragging" @drop_enter="drop_enter" @drop_exit="drop_exit" axis="xy" :dropareas="dropto" :offset="offset" :clone="true">
                        <div style="width:200px;background-color:#000;color:#fff;">you can drag me</div>
                    </vuedraggable>
                    <vuedraggable axis="xy" :dropareas="dropto" :offset="offset" :clone="false">
                        <div style="width:200px;background-color:#000;color:#fff;">you can drag me 2</div>
                    </vuedraggable>
                    <vuedraggable  :clone_element="clone_element" axis="xy" :dropareas="droptoall" :offset="offset" :clone="true">
                        <div style="width:200px;background-color:#000;color:#fff;">you can drag me 3</div>
                    </vuedraggable>
                    </div>
                </td>
                <td width="33%">
                    <div class="vue-droppable">
                        <br />
                        <div class="vue-droppable3">
                        </div>
                    </div>
                    <br />
                    <div class="vue-droppable">
                    </div>
                </td>
                <td width="33%">
                    <div class="vue-droppable2">
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import vuedraggable from './vue-draggable.vue';
export default{
    components:{
        vuedraggable
    },
    data(){
        return {
            offset:10,
            clone:true,
            dropto:['.vue-droppable','.vue-droppable3'],
            droptoall:['.vue-droppable','.vue-droppable2'],
            ghost:true
        }
    },
    methods:{
        dropped(params){
            console.log(params);
            console.log('dropped in to area')
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
        clone_element(params){
            params.instance;
            params.el;
            var div = document.createElement('div');
            div.style.cssText = 'height:50px;width:150px;background-color:red;color:white;';
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
<style scoped>
.vue-droppable, .vue-droppable2{
    border:solid 1px #ccc;
    background-color:#efefef;
    width:100%;
    height:200px;
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