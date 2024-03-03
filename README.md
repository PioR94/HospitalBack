# Hospital-Back

Hospital-Back is a backend application designed to interface with a frontend, managing appointments, user registrations, and payments in the healthcare domain. It utilizes a range of technologies and APIs, including Google Places, Google Geocoding, and Stripe for a comprehensive service offering.

## Features

- **Database Management**: Handles records for available slots, booked appointments, and new user registrations.
- **Token Generation**: Utilizes JWT for secure token generation.
- **Integration with Google APIs**: Connects with Google Places API and Google Geocoding for enhanced location services.
- **Payment Processing**: Incorporates Stripe for handling payments.

## Technologies

This project is built using the following technologies:

- Node.js  
- Express 
- TypeScript 
- MySQL 
- JWT 
- Axios 
- Stripe
- Google Places API
- Google Geocoding 

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system. Additionally, you will need to set up a MySQL database.

### Installation


```bash
git clone https://example.com/hospital-back.git
cd hospital-back
npm install
```
### Environment Configuration

Create a .env file in the root directory and configure the following variables:
- SALT=your_salt
- SECRET_KEY=your_secret_key
- GOOGLE_API_KEY=your_google_api_key
- STRIPE_SECRET_KEY=your_stripe_api_key
- BASE_URL=your-data_base_url
- DB_PASSWORD=your_password_to_data_base
- DB_USER=user_name
- DB_NAME=data_base_name

## Instructions for Setting Up the MariaDB Database

### Prerequisites
Ensure you have MariaDB or another database management system installed on your computer that can handle SQL files.

### Step 1: Downloading the SQL File
Download the `data-base.sql` file from the main directory of this repository.

### Step 2: Importing the Database
To import the database, follow these steps:


1. Open your database client and connect to your local MariaDB server.
2. Use the import function to load the `database.sql` file. The import process may vary depending on the software you are using, but you can typically find an `Import` option in the file or tools menu.

## Running the Application
- To start the application in development mode, use:
```bash
npm run start:dev
```
- For production, first build the application:
```bash
npm run biuld
```
- Then start the application:
```bash
npm start
```

## Testing 
Run the tests using:
```bash
npm test
```
## License

This project is licensed under the MIT License.

