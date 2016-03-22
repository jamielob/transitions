# Meteor Transitions

Easy to use CSS3 transitions for use in MeteorJS.

**Demo**: http://transitions-demo.meteor.com

**Demo Repository**: https://github.com/jamielob/transitions-demo

## Getting started

Add the transitions package to you your project:

```
meteor add jamielob:transitions
```

Only 3 things are needed to make transitions work.
* A container div
* A content div
* Choosing the animations you want to use for the in and out transitions


## Full page transitions using iron-router

After adding and setting up the iron-router package, wrap your `{{>yield}}` in a `<div>` with a class of `transitions-container`.   If you want the container to be full screen then you'll need to add `height: 100%;` to the container.

```
<template name="yourLayoutTemplate">
  <div class="transitions-container" style="height:100%;">
    {{>yield}}
  </div>
</template>
```

Next, wrap your content on each template in a `<div>` with a class of `transitions-content`.

```
<template name="page">
	 <div class="transitions-content">
	    <a href="{{pathFor 'anotherPage'}}" data-transition-out="slideLeftOut" data-transition-in="slideLeftIn">Go to another page</a>
	 </div>
</template>
```
Pick the in and out transition animations you want and set them on the link or button, using `data-transition-in` and `data-transition-out`.

## Inline transitions using dynamic templates

Wrap your dynamic template in a `<div>` with a class of `transitions-container`.

```
  <div class="transitions-container">
    {{> UI.dynamic template=dynamicTemplate}}
  </div>
```

Next, wrap your content on each template in a `<div>` with a class of `transitions-content`.

```
<template name="dynamic1">
	 <div class="transitions-content">
	    Some content
	 </div>
</template>
```
Now, each time you switch the value of `dynamicTemplate`, the content with transition with the animation of your choice.  If you are triggering the change via a button or link, you can put the `data-transition-in` and `data-transition-out` on there as in the iron:router example.  Or you can set a default animation for all transitions to use.



## Configuration (Optional)

You can set the classes of the container and content to whatever you want like this:

```
Transitions.container = '.custom-container';
Transitions.content = '.custom-content';
```

You can set up default transitions so that all of your links will use.  For example:

```
Transitions.transitionIn = 'slideLeftIn';
Transitions.transitionOut = 'slideLeftOut';
```

## Available Transitions

Build the transition name using the options below.  For example, slideUpIn and slideUpOut are valid tansition names.

* slide - Up | Down | Left | Right - Out | In
* slideFade - Up | Down | Left | Right - Out | In
* scale - Out | In
* pivot - Up | Down | Left | Right - Out | In
* flip - Up | Down | Left | Right - Out | In
* fall
* spin - Left | Right - Out | In
* fold - Up | Down | Left | Right - Out | In
* hinge - Top | Bottom | Left | Right - Out | In
* room - Up | Down | Left | Right - Out | In
* cube - Up | Down | Left | Right - Out | In
* swing - Up | Down | Left | Right - Out | In
* sweep - Up | Down | Left | Right - Out | In

## Additional Classes

**onTop**: Ensures that the transition remains on top. Needed for some transition combinations.  For example, you might decide to use roomUpIn and onTop together like so - `data-transition-in="roomUpIn onTop"`

**delay100**: Delays the transition from started for set time in ms.  Available in 100 increments up to 1000.  For example - `data-transition-in="sweepUpIn delay500"`

## Reacting when a transition is completed

When the transition is completed, a `data-transition-done` event is triggered. You can capture it as shown below.

```javascript
$(document).on("data-transition-done", function() {
  console.log("transition-done received")
});
```

A simple example code that sets an `onRendered` callback which will change the _background-color_ right after the transition is completed can be done as follows.

```javascript
Template.onRendered(function() {

  var _dependency = new Tracker.Dependency();

  Tracker.autorun(function() {
    _dependency.depend();
    $('h1').first().css('background-color','green');
  });

  $(document).on("data-transition-done", function() {
    _dependency.changed();
  });

});
```
## Jade Compatibility
By default this package doesnt support jade completely. You can however use a combination of jade and HTML Templates. You just have to make sure that your main transitions-container div is inside an HTML template, and then you can use Jade templates for all of your other templates. Here is a simple example:

layout.html:
```
<template name="layout">  
    <div class="transitions-container" style="height:100%">
        {{> yield}}
    </div>
</template>
```

home.tpl.jade (which uses the layout template above):
```
.transitions-content    
        a.home-menu-link(href="{{pathFor 'page2'}}" data-transition-out="slideFadeLeftOut" data-transition-in="slideFadeRightIn") page2     
```

See [this issue](https://github.com/jamielob/transitions/issues/11) for more details.

## Known Issues / To Do

* Sweep seems to need delay100 or above to work consistently on iPhone (as in demo).
