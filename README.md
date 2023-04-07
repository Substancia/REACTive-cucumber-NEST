# REACTive cucumber NEST

An educational monorepo for a chat app written utilizing various technologies.

## Installation

This project runs with 2 microservices: ReactJS frontend and NestJS backend.

To start contributing, please run `yarn` in these microservice directories.

```bash
$ cd ./backend
$ yarn
$ cd ../frontend
$ yarn
$ cd ..
```

For containerised executions, please install docker.

For non-docker executions, please run `yarn` in repo root directory.

```bash
$ yarn
```

## Running the app

### On local machine

NOTE: This project was created linux-centric; Windows (limited) execution will be discussed.

1. Automated servers start/stop scripts on linux machines

This requires making the script executable first (one-time action)

```bash
# make script executable
$ chmod +x cucumber.sh
```

Containerised executions (requires Docker to be installed)

```bash
# start servers
$ ./cucumber.sh start:docker

# stop servers
$ ./cucumber.sh stop:docker
```

Non-docker executions

```bash
# start servers
$ ./cucumber.sh start:local

# stop servers
$ ./cucumber.sh stop:local
```

2. Manual servers start/stop (Windows option)

This is basically traversing to different microservice directories and manually starting/stopping servers.

```bash
# start servers
$ cd ./backend
$ yarn start

# open new terminal session
$ cd ../frontend
$ yarn start

# hit ctrl+c in both sessions to stop servers
```

### On kubernetes

Follow https://github.com/Substancia/REACTive-cucumber-NEST/blob/main/kubernetes/README.md

## Support

This is an open source project. If you'd like to join, please feel free to create an issue ticket and start working (with confitmation from maintainers) or take up any existing issues.

## Maintainers

- Frontend - [boltkk95](https://boltkk95.github.io)
- Backend & DevOps - [substancia](https://substancia.github.io)
- Data & SecOps - [cooliscool](https://cooliscool.github.io)

## License

(To be licensed)
