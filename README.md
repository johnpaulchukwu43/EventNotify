## Event Notify

This projects servers as a HTTP notification system, where a server keeps
track of topics and their subscribers. Such that when a message is published on a topic, it gets forwarded to all subscriber endpoints.

### `Requirement`
1. Project requires a running instance of mongo db
2. NodeJs runtime installed on system
3. `.env` file in the root directory of project specifying the connection property (A sample one is provided already.)

### Installation
```
git clone https://github.com/johnpaulchukwu43/EventNotify.git
```

```
1. Enter project Dir (cd EventNotify)
2. run npm install (Installs all required dependencies)
3. run start (starts the project)

```


The project listens on [http://localhost:8000](http://localhost:8000) for the publisher app
and on [http://localhost:9000](http://localhost:9000) for the subscriber app
