# 수동으로 배포할 때 사용
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
	# TODO: Usage 추가
	echo "Usage: "
	exit 0
fi

docker login --username AWS -p $(aws ecr get-login-password --region ap-northeast-2 --profile kiwi) 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com
if [ $1 ]; then
	# Upload image to ECR
	docker build --no-cache -t 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:$1 ./docker/server --build-arg BRANCH=$(git branch --show-current)
	docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:$1

	# Restart services
	aws ecs update-service --force-new-deployment --service api --cluster cnsa-bamboo-api --profile kiwi
else
	# Upload image to ECR
	docker build --no-cache -t 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:latest ./docker/server --build-arg BRANCH=$(git branch --show-current)
	docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:latest

	# Restart services
	aws ecs update-service --force-new-deployment --service api-dev --cluster cnsa-bamboo-api --profile kiwi
fi

if [ "$2" == "--clear" ] || [ "$2" == "-c" ]; then
	docker images | grep 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cnsa-bamboo-api:{}
fi

