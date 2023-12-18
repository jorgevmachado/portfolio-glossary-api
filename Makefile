RUN:=yarn

install:
	yarn

clean-all:
	rm -Rf ./node_modules

setup:
	make clean-all
	make install

start:
	$(RUN) start

create-migration:
	$(RUN) typeorm migration:create ./src/migration/$(NAME)

run-migration:
	$(RUN) typeorm migration:run -- -d ./src/data-source.ts

revert-migration:
	$(RUN) typeorm migration:revert -- -d ./src/data-source.ts

lint:
	$(RUN) lint
