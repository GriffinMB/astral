To install:
```
npm install -g astral-meteor
```

Usage:
```
astral project [projectName]
```

This creates the basic file structure I use to work with Meteor.

```
client/
  helpers/
  stylesheets/
  views/
    application/
      layout.html.example

  main.html
  main.js

collections/

lib/
  router.js

public/
server/
  fixtures.js
  publications.js

```

To enable all default packages:

```
astral project [projectName] -f
```

Included default packages:
- iron:router
- mrt:iron-router-progress
- accounts-base
- accounts-password
- less
- jquery
- underscore
- cfs:standard-packages
- cfs:filesystem

The -f option also adds a default hello world router skeleton:

```
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('hello', {
    path: '/'
  });
});
```

To enable iron-router only:
```
astral project [projectName] -r
```

TODO:

1. Add form, auth, file-upload default packages.
2. Collection/View/Route easy generation.
