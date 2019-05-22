.PHONY:
start-db:
	docker-compose -f docker/docker-compose.mongo.yml up

.PHONY:
stop-db:
	docker-compose -f docker/docker-compose.mongo.yml down