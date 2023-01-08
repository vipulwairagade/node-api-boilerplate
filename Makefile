TAG_NAME=node-api-boilerplate
VERSION=$(shell git rev-parse --short HEAD)
IMAGE_TAG=$(TAG_NAME):$(VERSION)
IMAGE_TAG_LATEST=$(TAG_NAME):latest
DOCKER_USERNAME=username-here
USER="$(shell id -u):$(shell id -g)"
COMPOSE_RUN=docker-compose run --rm --user=$(USER)
COMPOSE_EXEC=docker exec -it

start: build up logs
workdir:
	$(COMPOSE_EXEC) api sh

npm-install:
	$(COMPOSE_EXEC) api npm install

migrate-up:
	$(COMPOSE_EXEC) api npm run migrate:up

migrate-down:
	$(COMPOSE_EXEC) api npm run migrate:down

build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

logs:
	docker logs -f api

down-v:
	docker-compose down -v

reset: 
	down-v

test:

lint:
	$(COMPOSE_RUN) --no-deps --entrypoint='' api npm run lint

lint-fix:
	$(COMPOSE_RUN) --no-deps --entrypoint='' api npm run lint:fix

docker-build:
	docker build . -f prod.Dockerfile -t $(IMAGE_TAG)

docker-login:
	cat docker_password.txt | docker login --username $(DOCKER_USERNAME) --password-stdin

docker-login-ci:
	docker login --username $(DOCKER_USERNAME) --password $(DOCKER_PASSWORD)

docker-tag-latest:
	docker tag $(IMAGE_TAG) $(IMAGE_TAG_LATEST)

docker-push:
	docker push $(IMAGE_TAG)

docker-push-latest:
	docker push $(IMAGE_TAG_LATEST)

docker-run-image:
	docker run -it --rm $(IMAGE_TAG) sh

docker-release: docker-build docker-push
docker-release-latest: docker-release docker-tag-latest docker-push-latest

show_local_development_url:
	node -r dotenv/config ./subdomain.js --full-url