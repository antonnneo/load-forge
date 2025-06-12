-include .env

.PHONY: build
build:
	docker buildx build -f dockerfile.k6 . -t loadforge

.PHONY: run
run:
	docker run --network ephemerex_ephnet \
			loadforge \
				run \
					--config profiles/${PROFILE}.json \
					--out experimental-prometheus-rw \
					scripts/${SCRIPT}.js

.PHONY: infra
infra:
	docker compose -f docker-compose.load.yml up -d