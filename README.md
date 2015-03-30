# Meteor Transitions

Easy to use CSS3 transitions for use in MeteorJS with iron:router.

**Demo**: http://transitions-demo.meteor.com

**Demo Repository**: https://github.com/jamielob/transitions-demo

## Example usage

Add the iron router and transitions packages to you your project:

```
meteor add iron:router
meteor add jamielob:transitions
```

Set up your routes in iron:router an wrap your `{{>yield}}` in a `<div>` with an id of `transitions-container`.  This id can be configured to whatever you want if it conflicts for you (see configuration below)

```
  <div id="transitions-container">
    {{>yield}}
  </div>
```

Make sure any content that you want to transition is wrapped within a `<div>` with a class of `transitions-content` (also configurable).
Any link that you want to transition must have two data attributes:  `data-transition-out` and `data-transition-in`.

**data-transition-out** is the transition you would like applied to the outgoing page, the one your user is currently on.
**data-transition-in** is the transtions to apply to the incoming page, the target of the link.

```
<template name="page">
	 <div class="transitions-content">
	    <a href="{{pathFor 'anotherPage'}}" data-transition-out="slideLeftOut" data-transition-in="slideLeftIn">Go to another page</a>
	 </div>
</template>
```

## Configuration (Optional)

You can set the id of the container and the class of the content to whatever you want like this:
```
Transitions.container = '#custom-container';
Transitions.content = '.custom-content';
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

**onTop**: Ensures that the transition remains on top. Needed for some transition combinations.  For example, you might decide to use roomUpIn and onTop together like so - `data-transition-in="roomUpIn onTop`

**delay100**: Delays the transition from started for set time in ms.  Available in 100 increments up to 1000.  For example - `data-transition-in="sweepUpIn delay500`

## Known Issues / To Do

* Cube transition doesn't always display correctly (timing issue?) on iPhone Safari.  Needs the special class delay1 added to transition-in (as in demo).
* Sweep needs delay100 or above to work consistently on iPhone (as in demo).