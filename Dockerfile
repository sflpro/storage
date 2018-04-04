# Set the base image to node
FROM node:alpine

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install && npm install -g nodemon
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD . /src

# Run app using node
CMD ["/bin/sh", "start.sh"]
