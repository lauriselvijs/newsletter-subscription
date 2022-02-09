# Simple REST API back-end in PHP with React.js front-end

This example shows how to configure back-end and front-end of this application

**Prerequisites:** PHP, Composer, MySQL, Node.js, Apache or NGINX

## Getting Started

To install <b>Composer</b> follow these directions in https://getcomposer.org/download/\

To install <b>Node.js</b> follow these directions in https://nodejs.org/en/\

To install configure <b>MySQL</b> follow these directions in https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/\

To install configure <b>Apache</b> follow these directions in https://httpd.apache.org/docs/2.4/install.html or
to install configure <b>NGINX</b> follow these directions in https://www.nginx.com/resources/wiki/start/topics/tutorials/install/\

Clone this project using the following commands:

```
git@github.com:lauriselvijs/magebit-test.git
cd magebit-test
```

### Configure the application

Create the database and user for the project:

```
mysql -uroot -p
CREATE DATABASE magebit_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'username'@'localhost' identified by 'password';
GRANT ALL on api_example.* to 'username'@'localhost';
quit
```

Create and edit the `.env` file and enter your database details there:

```
DB_HOST="localhost"
DB_PORT=3306
DB_DATABASE="magebit_db"
DB_USERNAME="username"
DB_PASSWORD="password"
```

Copy `.env` file in in your root folder directory:

```
cp .env ~/magebit-test
```

Install the project dependencies and start the PHP server:

```
cd magebit-test
composer install
cd public
php -S localhost:8000
```

To seed db run following commands:

```
cd magebit-test
php dbseed.php
```

Go to your view folder in root directory and install front-end dependencies and start react project:

```
cd magebit-test/view
npm i or yarn install
npm start or yarn start
```

NOTE: if using a virtual machine and NAT, you might need to run the server as `php -S localhost:8000 -t public` instead.

## Help

Please post any issues in Github issues section. You can also email lauriselvijsm@gmail.com for any comments or questions.

## License

Apache 2.0, see [LICENSE](LICENSE).
