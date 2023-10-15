#!/bin/bash

echo -e "
Welcome!
-----"

# Check if .env file already exists
if [ -f .env ]; then
    read -p "
    An .env file already exists. 
    Do you want to overwrite it? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo ".env file was not overwritten."
    else
        # Remove the existing .env file
        rm .env

        # Prompt the user for DB_HOST input
        read -p "Enter IP Address for DB_HOST: " db_host

        # Define the rest of the environment variables
        cat <<EOF > .env
DB_USER=collectivty
DB_HOST=$db_host
DATABASE=collectivty
DB_PASSWORD=root
DB_PORT=5432
NODE_ENV=development
EOF

        echo ".env file with specified variables created successfully."
    fi
else
    # Prompt the user for DB_HOST input when .env doesn't exist
    read -p "Enter IP Address for DB_HOST: " db_host

    # Define the rest of the environment variables
    cat <<EOF > .env
DB_USER=collectivty
DB_HOST=$db_host
DATABASE=collectivty
DB_PASSWORD=root
DB_PORT=5432
NODE_ENV=development
EOF

    echo ".env file with specified variables created successfully."
fi

# Run db container
docker compose up -d

# Ask the user if they want to install npm packages
read -p "Do you want to install npm packages? (y/n): " install_npm_packages
if [ "$install_npm_packages" = "y" ]; then
    # Install npm packages
    npm i
fi

# Migrate the database
npm run migrate:all

    echo "Database is setup."

# Keep the script running
wait