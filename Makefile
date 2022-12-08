up:
	docker-compose up -d
down:
	docker-compose down
rm: down
	docker image prune -a -f
up-dev:
	docker-compose -f docker-compose.dev.yml up -d
down-dev:
	docker-compose -f docker-compose.dev.yml down
rm-dev: down-dev
	docker image prune -a -f
up-yifactory:
	docker-compose -f docker-compose.yifactory.yml up -d
down-yifactory:
	docker-compose -f docker-compose.yifactory.yml down
rm-yifactory: down-yifactory
	docker image prune -a -f
restart: rm up
restart-dev: rm up
restart-yifactory: rm up
