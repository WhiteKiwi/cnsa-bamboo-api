# 수동으로 배포할 때 사용
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
	# TODO: Usage 추가
	echo "Usage: "
	exit 0
fi

docker login --username AWS -p $(aws ecr get-login-password --region ap-northeast-2 --profile kiwi) 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com
# Upload image to ECR
docker build --no-cache -t 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/node-server-base:latest ./docker/node-server-base
docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/node-server-base:latest
if [ $1 ]; then
	docker tag 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/node-server-base:latest 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/node-server-base:$1
	docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/node-server-base:$1
fi
