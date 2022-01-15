cd services/dev

docker build -t "rcp-auth:dev" -f "Dockerfile.auth" ../../../services/
docker build -t "rcp-database:dev" -f "Dockerfile.database" ../../../services/

cd -