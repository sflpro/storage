# Set the base image to node
FROM node:9.5.0

# Define working directory
RUN mkdir -p /usr/local/app
ADD . /usr/local/app
WORKDIR /usr/local/app
RUN npm install

# Run app using node
CMD ["/bin/sh", "start.sh"]
