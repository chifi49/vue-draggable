<template>
    <div id="app">
        <table width="100%">
            <tr valign="top">
                <td width="33%">
                    <vuedraggable axis="xy" :dropareas="dropto" :offset="offset" :clone="true">
                        <div style="width:200px;background-color:#000;color:#fff;">you can drag me</div>
                    </vuedraggable>
                    <vuedraggable axis="xy" :dropareas="dropto" :offset="offset" :clone="false">
                        <div style="width:200px;background-color:#000;color:#fff;">you can drag me 2</div>
                    </vuedraggable>
                    <vuedraggable axis="xy" :dropareas="droptoall" :offset="offset" :clone="true">
                        <div style="width:200px;background-color:#000;color:#fff;">you can drag me 3</div>
                    </vuedraggable>
                    <vuedraggable axis="xy" :offset="offset">
                        <button>drag me</button>
                    </vuedraggable>
                </td>
                <td width="33%">
                    <div class="vue-droppable">
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
            dropto:['.vue-droppable'],
            droptoall:['.vue-droppable','.vue-droppable2']
        }
    },
    methods:{

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
.vue-dropping{
    border:solid 1px red;
}

</style>