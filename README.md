# Readish

An in-memory key-value database and cache. The TCP server is made using Node.js. The protocol used for communicating between the client and the server is according to the Redis Serialization Protocol. 
<br>

More information about the <b>redis serialization protocol</b> can he found <a href="https://redis.io/docs/latest/develop/reference/protocol-spec/">here</a>.

---
## Getting Started

Please follow the code snippets below to set up the environment for running the project on the local machine.

### Pre-requisite Installation

* <b>Node</b>

  You can install node.js and npm easily with apt install using the following command.

  ```sh
  > sudo apt install nodejs
  > sudo apt install npm
  ```

  If the installation is successful, you can run the following command to check the version.

  ```sh
  > node --version
  v21.4.0

  > npm --version
  10.6.0
  ```

  If you need to update `npm`, you can make it using `npm`!
  ```sh
  > npm install npm -g
  ```

* <b>Redis CLI</b>

  This <a href="https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/">reference</a> can also be used to install redis-cli.

  ```sh
  > sudo apt install redis-tools
  ```

  You can run the following command to check if the installation was successful.

  ```sh
  > redis-cli -v
  redis-cli 6.0.16
  ```


### Installation

* Clone the repository on your local machine.

  ```sh
  > git clone https://github.com/kaustubh0201/Readish.git
  > cd Readish
  > npm install
  ```

### Running the project

* Start the TCP server on the port `8080` using the below command.

  ```sh
  > npm start
  ```

* Connect the redis client to the server using the below command.
  ```sh
  > redis-cli -p 8080
  ```

  The client is connected to your server and you can run redis commands directly from your terminal.

---


## Commands

* <a href="https://redis.io/docs/latest/commands/ping/">Ping</a>
* <a href="https://redis.io/docs/latest/commands/set/">Set</a>
* <a href="https://redis.io/docs/latest/commands/get/">Get</a>
* <a href="https://redis.io/docs/latest/commands/del/">Del</a>
* <a href="https://redis.io/docs/latest/commands/keys/">Keys</a>

---

