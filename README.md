# README #
This is the micorservice to manage member and rewards built using swagger, connect

## How do I get set up? ##

Follow the steps below to setup MySQL database and then start the application
1. Download MySQL and install on the server
2. Start the MySQL server and conenct to the database using root username and corresponding password
3. Run the database script - `db-scripts/setup.sql` to create a new schema and tables required for the application
4. Download the application from github and open command prompt/terminal and `cd` to root directory where application is downloaded.
5. Run command - `npm install` to install all libraries required for the application.
6. Start the application using command - `npm start`
7. Please check the url `http://<hostname>:8000/api-docs` for Swagger specification and url `http://<hostname>:8000/docs` for Swagger UI.

Note: This application uses `root` as username and password to connect to MySQL. If you want to connect to MySQL database using different user or password, please change the value in file `config/db-config.js`

Application uses default loglevel as debug, to change the level, please set the corresponding loglevel in environment variable `LOGLEVEL`

Application expects environments as - `ci, local, dev, test, preprod, prod`. Default is - `local`. To change environment set environment variable `APP_ENV `

## testing ##

Run command - `npm test` to run unit tests and super tests (integration/behavior test)
Run command - `npm run coverage` to run super tests (integration/behavior test)

Note: No unit tests has been written for MySQL utilities as its expected to be tested as part of super tests (integration/behavior test)
