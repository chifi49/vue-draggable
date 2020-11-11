<template>
    <div class="vue-row">
        <div v-for="(col,index) in cols" :key="'vue-row-col-'+index" class="vue-column vue-droppable">

        </div>
    </div>
</template>
<script>
export default{
    props:{
        cols:{
            type:Number,
            required:false,
            default:2
        }
    },
    computed:{

    },
    methods:{

    },
    mounted(){
        
    }
}
</script>
<style scoped>
.vue-row{
    display:flex;
}
.vue-column{
    flex-grow:1;
}
</style>