
# User Management Project
This project is a full-stack user management application built with Angular.js for the frontend, Nest.js for the backend API, and MongoDB for data persistence.

## Features
- Display a list of users with editable and deletable actions.
- Add new users to the table from the form.
- Update existing user details.
- Delete users from the table.
- Generate a PDF document from the table data.
- Allow users to download the generated PDF.
- View the generated PDF within the application.

## Technologies Used
- Frontend: Angular.js
- Backend: Nest.js
- Database: MongoDB (with Mongoose)

## Installation
- Clone this repository
```bash
git clone https://github.com/vikash-agrahari-w/User-Management-Assignment
```
### Frontend Setup
- Node version:  v16.20.2
- Angular CLI: 9.1.0
- Npm version: 8.19.4
- Open integrated terminal for frontend directory.
``` bash
cd frontend
```
- Install dependencies:

```bash
npm install
```
- Start Frontend Project:

```bash
ng serve
```
### Backend Setup
- Node version:  v18.20.0
- Nest version: 10.3.2
- Npm version: 10.5.0
- Open integrated terminal for backend directory.
``` bash
cd backend
```
- Install dependencies:

```bash
npm install
```

- Environment Setup

- Create bin folder in backend root directory

```bash
mkdir bin
```
- Create a file named: **_.env.dev_**

```bash

#Base configuration
PORT=8001

#MONGO DB
URI=mongodb+srv://username:password@cluster0.w5jfqek.mongodb.net/DB_NAME

#Replace above URI with your Mongodb Database url 

#Basic Key:

Basic WFlaOlh5ekAxMjM0

```
- Create a directory to store generated PDFs
```bash
mkdir generatedPdfs
```
- Start Backend Server:
```bash
npm run dev
``````

### Note: 
- Pass the basic key in Swagger from env to run Swagger Apis.

## Package/library Used:

### Pdfkit
- Pdfkit is a popular npm package used for generating PDF documents in Node.js applications. 
- I used it to generate user dynamic data pdf.
