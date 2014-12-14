# Flux with Bacon.js

[Blog post](http://reaktor.fi/blog/flux-inspired-reactive-data-flow-using-react-and-bacon-js/) regarding the implementation. Examples forked from [facebook/flux](https://github.com/facebook/flux).

## Running

    $ npm install
    $ node examples/<flux-chat|flux-todomvc>/server

## Deploying

With [fleet](https://github.com/coreos/fleet):

    $ fleetctl start <flux-chat|todomvc>.service
