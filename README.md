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
    <vuedraggable tag="div">
        <p>Drag me</p>
    </vuedraggable>
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

# Props

#### tag
defaults: span

accepts any valid html tag e.x `<vuedraggable tag='li'></vuedraggable>`

except 'br','script','noscript','dfn','object'
#### zindex
defaults: 100

the css z-index to set to dragging elemnt
#### axis
defaults: 'xy'

in which axis to drag

ex. set axis='y' if you want only vertical dragging
#### clone
defaults: false

while dragging the dragging element can be a clone of the original element
#### clone_element
defaults: null

accepts a function that returns a div element

while dragging the dragging element can be any dom element that you return from the function

e.x.
```
<vuedraggable :clone_element="clone_element"></vuedraggable>
methods:{
    clone_element:function(params){
        var div  = document.createElement('div');
        div.style.cssText = 'height:20px;background-color:#000;color:#fff;width:100px';
        return div;
    }
}
```
#### clone_opacity
default: 0.5

the opacity of the dragging element
#### drop_areas
default: []

the areas where the dragging element can be dropped

accepts an array with css selectors
#### containment
default:  body 

the area that the dragging element is allowed to be dragged
#### sortable
default: false

if the dragging element can be sorted within its parent

# Callbacks
#### drag_started
called when the dragging starts (called only once)
#### drag_ended
called when the dragging stops 
#### dragging
called continuously while the dragging takes place
#### drop_enter
called when the draggable enters a droppable area (called only once)
#### dropping
called while the dragable is being dragged inside the droppable area
#### dropped
called when the draggable element is dropped