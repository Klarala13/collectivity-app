# Collectively Backend

## Setup 
- Make sure to set up an .env file in the root dir

- Start db in docker
```
docker compose up -d
````
- Create db tables and seed data

```
npm run migrate:all
```
- Start API

```
npm run start
```
- Open
    [API localhost](http://localhost:4000/)

- Open
    [Admin](http://localhost:8080/)

----------
> Feeling lazy with the setup try a script 😊
>
>```
> ./setup.sh
>```
>
-----