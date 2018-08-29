# Consume More Stuff
> A custom CMS for personal product sale

___

## Installation

```

npm install

```

___

## Database Setup
1. Install [PostgreSQL](https://www.postgresql.org/download/)

2. Replace ```your_db_user``` and ```your_password``` with custom values in the code block below, and run the following commands to create your database:

```

# From the terminal:

psql


# From the PostgreSQL CLI:

DROP DATABASE IF EXISTS cms_db;
DROP USER IF EXISTS your_db_user;
CREATE USER your_db_user WITH PASSWORD 'your_password';
CREATE DATABASE cms_db WITH OWNER your_db_user;

```

3. Create and populate your database tables by running the following commands in the terminal from the project root directory:

```

# Create database tables:

./node_modules/.bin/knex migrate:latest


# Seed database tables:

./node_modules/.bin/knex seed:run

```

___

## Environment Configuration

1. Copy the contents of ```.env.example``` into a file named ```.env``` by running the following command from the project root directory:

```

cp .env.example .env

```

2. Replace ```username``` and ```password``` in the newly created ```.env``` file with the values  previously assigned in Step 2 of "Database Setup" to ```your_db_user``` and ```your_password```, respectively.

___

## Deployment

### Development Branch

1. Start the server by running the following command from the project root directory:

```

node server/server.js

```

2. Start the application by running the following command from the project root directory:

```

npm start

```

3. Access the application by entering the following URL into your web browser:

```

http://localhost:3000/

```

___

## Contributors

* George Chu
* Isaiah Harris
* Bronson Avila