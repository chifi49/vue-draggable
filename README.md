# Installation
`npm install --save @chifi49/vue-draggable`

or

`<script src="vue-draggable.umd.min.js"></script>`

# Usage
```
<template>
    <ul class="vue-droppable">
        <vuedraggable tag="li" :dropto="dropto" axis="y" :sortable="true">
            Item 1
        </vuedraggable>
        <vuedraggable tag="li" :dropto="dropto" axis="y" :sortable="true">
            Item 2
        </vuedraggable>
        <vuedraggable tag="li" :dropto="dropto" axis="y" :sortable="true">
            Item 3
        </vuedraggable>
    </ul>
    <ul class="vue-droppable">

    </ul>
</template>
<script>
import vuedraggable from 'chifi49@/vue-draggable'
export default{
    components:{
        vuedraggable
    },
    data(){
        return {
            dropto:['vue-droppable']
        }
    }
}
</script>
```
or
```
<html>
<body>
<div id="app">
</div>
<script src="vue-draggable.umd.js"></script>
<script>
new Vue({
    el:'#app',
    components:{
        'vuedraggable':window['vue-draggable']
    },
    data:function(){
        return {
            dropto:['vue-droppable']
        }
    }
})
</script>
</body>
</html>
```