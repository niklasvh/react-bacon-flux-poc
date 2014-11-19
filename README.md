# Flux with Bacon.js

[Blog post](http://blog.hertzen.com/post/102991359167/flux-inspired-reactive-data-flow-using-react-and) regarding the implementation. Examples forked from [facebook/flux](https://github.com/facebook/flux).

## Running

    $ npm install
    $ node examples/<flux-chat|flux-todomvc>/server

## Deploying

With [fleet](https://github.com/coreos/fleet):

    $ fleetctl start <flux-chat|todomvc>.service
