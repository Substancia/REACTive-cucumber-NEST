startServersLocal() {
    BASE_PATH=$PWD
    cd ./backend
    yarn
    $BASE_PATH/node_modules/pm2/bin/pm2 start yarn --interpreter bash --name cucumber-backend -- start
    cd $BASE_PATH
    cd ./frontend
    yarn
    $BASE_PATH/node_modules/pm2/bin/pm2 start yarn --interpreter bash --name cucumber-frontend -- start
    cd $BASE_PATH
}

startServersDocker() {
	docker-compose \
    -f docker-compose.yml \
    up -d  --renew-anon-volumes  --no-build
}

case "$1" in
    "start:local")
        startServersLocal
        exit
        ;;
    "start:docker")
        startServersDocker
        exit
        ;;
esac
