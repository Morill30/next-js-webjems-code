all: host-create ssl-create

host-create:
	@echo "- Creating host at 127.0.0.1 local.jmprofile.com...."
	@echo "- Please enter password when requested"
	@sh ./scripts/manage-etc-hosts.sh add local.jmprofile.com
ssl-create:
	@echo "To install certificate. Please enter your computer ->"
	@sudo sh ./scripts/make-cert.sh
	@echo ""
	@echo "Done!"

deploy-images: build-images ecr-login deploy-next deploy-nginx

ecr-login:
	@aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin //Removed for safety purposes

build-images:
	@docker compose -f ./docker-compose-build.yaml build

deploy-nginx:
	@docker push //Removed for safety purposes/nginx-psite:latest

deploy-next:
	@docker push //Removed for safety purposes/nextjs-psite:latest

ecs-deploy:
	@aws ecs update-service --cluster Personal-Website-Cluster --service personal-site-service --force-new-deployment

# aws ecs update-service --service my-service --task-definition my-task:v2
