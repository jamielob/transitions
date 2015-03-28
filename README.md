# Meteor Transitions

Easy to use CSS3 transitions for use in MeteorJS.  Works with iron:router.

**Demo**: http://transitions-demo.meteor.com

**Demo Repository**: https://github.com/jamielob/transitions-demo

## Example usage

Add the iron router and transitions packages to you your project:

```
meteor add iron:router
meteor add jamielob:transitions
```

Set up your routes in iron:router an wrap your `{{>yield}}` in a `<div>` with an id of layout.

```
  <div id="layout">
    {{>yield}}
  </div>
```

Make sure any content that you want to transition is wrapped within a `<div>` with a class of `content`
Any link that you want to transition must have two data attributes:  `data-transition-out` and `data-transition-in`

**data-transition-out** is the transition you would like applied to the outgoing page, the one your user is currently on.
**data-transition-in** is the transtions to apply to the incoming page, the target of the link.

```
<template name="page">
	 <div class="content">
	    <a href="{{pathFor 'anotherPage'}}" data-transition-out="slideLeftOut" data-transition-in="slideLeftIn">Go to another page</a>
	 </div>
</template>
```

## Available Transitions

Build the transition name using the options below.  For example, slideUpIn and slideUpOut are valid tansition names.

* slide - Up | Down | Left | Right - Out | In
* slideFade - Up | Down | Left | Right - Out | In
* scale - Out | In
* pivot - Up | Down | Left | Right - Out | In
* flip - Up | Down | Left | Right - Out | In
* fall
* newspaper - Out | In
* fold - Up | Down | Left | Right - Out | In
* hinge - Top | Bottom | Left | Right - Out | In
* room - Up | Down | Left | Right - Out | In
* cube - Up | Down | Left | Right - Out | In
* carousel - Up | Down | Left | Right - Out | In
* swing - Up | Down | Left | Right - Out | In
* sweep - Up | Down | Left | Right - Out | In
=======
# Meteor Transitions

Easy to use CSS3 transitions for use in MeteorJS.  Works with iron:router.

**Demo**: http://transitions-demo.meteor.com

## Example usage

Add the iron router and transitions packages to you your project:

```
meteor add iron:router
meteor add jamielob:transitions
```

Configure in iron:router to have a `layoutTemplate` called `layout`.

```
Router.configure({layoutTemplate: 'layout'});
```

Create a template called `layout`.  Wrap your `{{>yield}}` in a `<div>` with an id of layout.

```
<template name="layout">
  <div id="layout">
    {{>yield}}
  </div>
</template>
```

Make sure any content that you want to transition is wrapped within a `<div>` with a class of `content`
Any link that you want to transition must have two data attributes:  `data-transition-out` and `data-transition-in`

**data-transition-out** is the transition you would like applied to the outgoing page, the one your user is currently on.
**data-transition-in** is the transtions to apply to the incoming page, the target of the link.

```
<template name="page">
	 <div class="content">
	    <a href="{{pathFor 'anotherPage'}}" data-transition-out="slideLeftOut" data-transition-in="slideLeftIn">Go to another page</a>
	 </div>
</template>
```

## Available Transitions

Build the transition name using the options below.  For example, slideUpIn and slideUpOut are valid tansition names.

* slide - Up | Down | Left | Right - Out | In
* slideFade - Up | Down | Left | Right - Out | In
* scale - Out | In
* pivot - Up | Down | Left | Right - Out | In
* flip - Up | Down | Left | Right - Out | In
* fall
* newspaper - Out | In
* fold - Up | Down | Left | Right - Out | In
* hinge - Top | Bottom | Left | Right - Out | In
* room - Up | Down | Left | Right - Out | In
* cube - Up | Down | Left | Right - Out | In
* carousel - Up | Down | Left | Right - Out | In
* swing - Up | Down | Left | Right - Out | In
* sweep - Up | Down | Left | Right - Out | In
>>>>>>> FETCH_HEAD
