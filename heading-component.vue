<template>
    <component :is="heading">
        <template v-if="link!=''" >
            <a :href="link" :target="link_target" v-html="final_text"></a>
        </template>
        <template v-else v-html="final_text">
        </template>
    </component>
</template>
<script>
export default{
    props:{
        placeholder:{
            type:String,
            required:false,
            default:''
        },
        text:{
            type:String,
            required:true
        },
        size:{
            type:Number,
            required:false,
            default:1
        },
        link:{
            type:String,
            required:false,
            default:''
        },
        link_target:{
            type:String,
            required:false,
            default:'_parent',
            validator:function(value){
                return ['_parent','_blank','_window'].indexOf(value)!=-1;
            }
        }
    },
    computed:{
        heading(){
            return 'h'+this.size;
        },
        final_text(){
            if(this.placeholder!=''){
            return this.placeholder.replace('{{text}}',this.text);
            }else{
                return this.text;
            }
        }
    },
    mounted(){
        
    }
}
</script>