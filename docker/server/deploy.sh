docker login --username AWS -p $(aws ecr get-login-password --region ap-northeast-2 --profile kiwi) 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com
docker build --no-cache -t 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:$1 . --build-arg BRANCH=$(git branch --show-current)
docker tag 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:$1 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:latest
docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:$1
