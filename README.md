# HospitalBack
> This is a site that helps the patient register for an appointment.

### Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Getting started](#getting-started)


## 📋General Information
- The application was created to facilitate hospital workflows and allow patients to book appointments online with multiple specialists. 



## 🗃Technologies Used
* Node.js
* TypeScript
* Express.js
* MySQL




## ⚙Features
* As a doctor you can:
  -  set up free appointments on which you will see patients
* As a patient:
    - register for an appointment

## 🏁Getting started
### Prerequisite
- [Node LTS](https://nodejs.org/en/download/)
- [Npm](https://docs.npmjs.com/getting-started)  or [Yarn](https://yarnpkg.com/lang/en/docs/install/)
 #### This app is running with database so if you want to clone it and try how it works you also need:
- [XAMPP](https://www.apachefriends.org/)
- [HeidiSQL](https://www.heidisql.com/)

### Commands

Open project in new folder and clone
```bash
git clone https://github.com/PioR94/HospitalBack.git
```
enter the project folder
```bash
cd HospitalBack
````

install dependencies
```bash
npm i
````
change db.ts file to your liking
```sh
├── 📁  utils
│   ├── 📄   db.ts
```
to avoid conflicts comment pipes and also might want to change the port (default is 3001) in the `index.ts` file
```ts
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
```
start the app
```bash
tsnd index.ts
````

