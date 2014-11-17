FROM node:0.10.33
ADD . /opt/app
WORKDIR /opt/app
RUN npm install --production
EXPOSE 8080
