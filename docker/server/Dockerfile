FROM 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/node-server-base:1.1.0
LABEL version="0.0.1"

# Clone repository
COPY GITHUB_ACCESS_TOKEN GITHUB_ACCESS_TOKEN
ARG BRANCH
RUN git clone -b $BRANCH --single-branch https://whitekiwi:$(cat GITHUB_ACCESS_TOKEN)@github.com/whitekiwi/cnsa-bamboo-api.git
WORKDIR cnsa-bamboo-api

# Start
COPY .env .env
RUN yarn build
ENTRYPOINT [ "yarn", "run", "start:prod" ]
