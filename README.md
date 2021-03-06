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
default: 100

the css z-index to set to dragging elemnt
#### axis
default: 'xy' - possible values xy, x, y

in which axis to drag

ex. set axis='y' if you want only vertical dragging
#### clone
default: false

while dragging the dragging element can be a clone of the original element
#### clone_element
default: null

accepts a function that returns a dom element

while moving the dragging element, this element can be any dom element that you return from the function

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

#### offset
default: 20

how many pixels to move from the original position before dragging starts

the opacity of the dragging element
#### draghandle
default: '' (empty)

accepts a css selector which will serve as the handle for dragging and not the original element
#### dropareas
default: []

the areas where the dragging element can be dropped

accepts an array with css selectors
#### containment
default:  body 

the area that the dragging element is allowed to be dragged
#### sortable
default: false

if the dragging element can be sorted within its parent

#### classes
default: []

custom classes that you want to pass and append in draggable in class attribute

#### custom_data
default: {}

an object with any data that you wish to pass and receive in back from callbacks with property name "customData"

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
#### clicked
called when the draggable is clicked