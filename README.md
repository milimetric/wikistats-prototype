# Project Plan

* look at webpack config
    ** sometimes when saving, watcher doesn't live update the browser, have to save a bunch of times
    ** source mapping seems off, look at browser vue tools and find debugging method
    ** complicated - should we simplify or is boilerplate needed
    ** testing - let's have it run tests, look at vue webpack template and options provided there
    ** consider upstreaming any improvements to the vue template

* set up new project/folder structure
    ** components (flat or structured)?
    ** apis - default configuration from wiki?, data from aqs, preferences local storage
        *** Config:Dashiki:General:
    ** internationalization
    ** semantic ui / static assets, is hacked-together way from prototype ok?
    ** routing
    ** tests are fine under /test

* state management - vuex?

# wikistats-prototype

> Prototype for the new version of wikistats, using Vue and Semantic UI

## Build Setup

``` bash
# install dependencies
npm install

# setup semantic
cd semantic
gulp build

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
