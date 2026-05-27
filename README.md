# Task Manager
A web-based order management system where users can sign up, log in, browse food items, add them to a cart, and place orders seamlessly.

# Technologies
* React js
* Node js
* Bun js
* Express 
* Postgresql
* Sequelize
* Zod 
* Lucide React
* React Router
* Git 
* Github
* Docker

# Installation
```bash

```

# Docker

* Frontend
```bash
cd ./client/
sudo docker build -t app ./
sudo docker run -p5173:80 app
```
* Backend
```bash
cd ./server/
sudo docker build -t server ./
sudo docker run --network=host server
```