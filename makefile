extensions := $(shell cat extensions.txt | sed 's/^/--with /' | tr '\n' ' ')


#  ---------------
#  LOCAL RUN
#  ---------------

.PHONY: build
build:
	rm -f ./k6
	xk6 build ${extensions}
	sudo mv k6 /usr/local/bin

.PHONY: run
run:
	k6 run --config loadtests/profiles/default.json --out experimental-prometheus-rw loadtests/scripts/load_ephemerex.js

.PHONY: infra
infra:
	docker compose -f docker-compose.load.yml up -d