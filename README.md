# Task Manager
A web-based task management system where users can sign up, log in, browse projects, add new projects and create new tasks for each project

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
# Client
git clone https://github.com/Midhun-u/Task-Management.git
cd Task-Management
cd client
bun install
bun run dev
```
```bash
# Server
git clone https://github.com/Midhun-u/Task-Management.git
cd Task-Management
cd server
npm install
npm run build
npm start
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