FROM ubuntu:18.04
LABEL version="1.0.0"

# Install git & node
RUN apt-get update
RUN apt-get install -y git curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
