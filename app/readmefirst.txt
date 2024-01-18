# GuryoGoob HomeRental Admin Panel

## Overview
This repository contains the source code for the admin panel of the GuryoGoob HomeRental Management System. The admin panel is developed using Next.js for the frontend, connecting to the backend API built with Spring Boot, JPA/Hibernate, and PostgreSQL.

## Key Features

### Property Management
- View, create, update, and delete property listings.
- Display property details including name, address, price, and owner information.
### customer   Management
- Track payments related to properties.
- Manage rent agreements, including start and end dates.

### Owner Management
- View, create, update, and delete property owners.
- Display owner details such as name, email, and associated properties.

### Payment and Rent Management
- Track payments related to properties.
- Manage rent agreements, including start and end dates.

## Getting Started

1. Clone this repository.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Configure the backend API endpoint in the `.env` file.

```env
localhost=http://localhost:8080/api
