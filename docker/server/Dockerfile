FROM ubuntu:18.04
LABEL version="0.0.1"

# Install git & node
RUN apt-get update
RUN apt-get install -y git curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Clone repository
COPY GITHUB_ACCESS_TOKEN GITHUB_ACCESS_TOKEN
RUN export GITHUB_ACCESS_TOKEN=`cat github-access-token`
RUN git clone https://whitekiwi:$GITHUB_ACCESS_TOKEN@github.com/whitekiwi/cnsa-bamboo-api.git
WORKDIR cnsa-bamboo-api

# Start
COPY .env .env
COPY run.sh run.sh
RUN chmod +x run.sh
ENTRYPOINT [ "/bin/bash", "run.sh" ]
