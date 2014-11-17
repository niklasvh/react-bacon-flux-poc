FROM node:0.10.33
ADD . /opt/app
WORKDIR /opt/app
RUN npm install -g uglify-js browserify
RUN npm install --production
ENV NODE_ENV production
RUN NODE_ENV=production browserify /opt/app/examples/flux-chat/client.js -t reactify | uglifyjs > /opt/app/examples/flux-chat/app.js
RUN NODE_ENV=production browserify /opt/app/examples/flux-todomvc/client.js -t reactify | uglifyjs > /opt/app/examples/flux-todomvc/app.js
EXPOSE 8080
