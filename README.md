### Assignment Category: Sunflower

# Visa Navigator Server

This repository contains the server-side code for the Visa Navigator application. The server handles all backend functionalities, including data storage, authentication, and API endpoints for managing visa-related information.

## Features

-   Visa Information: Users can easily browse and check visa requirements for various countries, including processing time, fee, required documents, and more.
-   User Authentication: Secure login and registration using Firebase Authentication (including Google sign-in).
-   Add & Manage Visas: Users can add visa details and manage their own added visas.
-   Apply for Visas: Users can apply for visas by submitting their details and tracking their visa applications.
-   Responsive Design: Fully responsive, ensuring a smooth experience on mobile, tablet, and desktop devices.
-   CRUD Operations: Create, Read, Update, and Delete visa data with intuitive interactions.

## Table of Contents:

    -   Features
    -   Technologies
    -   Getting Started
    -   Setup
    -   Environment Variables
    -   API Endpoints
    -   Authentication
    -   License
    -   Contributing

## Features:

    -   User authentication and authorization
    -   CRUD operations for visa information
    -   Filtering and searching visas
    -   Dark/Light theme toggle
    -   Responsive design for all device sizes

## Technologies:

    -   Node.js
    -   Express.js
    -   MongoDB (for storing visa data and applications)
    -   Firebase for user authentication
    -   Tailwind CSS for styling

## Getting Started

-   Node.js(version 14 or higher)
-   Express.js
-   npm (version 6 or higher)
-   MongoDB (local or Atlas)

## Environment Variables

The following environment variables need to be set:
-   PORT: The port number on which the server will run.
-   MONGO_URI: The MongoDB connection string.

## API Endpoints

## User Authentication

-   POST /api/auth/register: Register a new user
-   POST /api/auth/login: Login a user and return a JWT token

## Visa Management

-   GET /api/visas: Get all visas
-   POST /api/visas/add: Add a new visa
-   PUT /api/visas/:id: Update a visa by ID
-   DELETE /api/visas/:id: Delete a visa by ID

## Challenges Implemented

1. Visa Type Filter: Dropdown filter on the "All Visas" page to filter visas by type.

2. Search Functionality: Search by country name on the "My Visa Applications" page.

3. Theme Toggle: Dark/Light theme toggle on the home page.

4. Animations: Lottie and React Awesome Reveal for engaging animations.

## Getting Started

### Prerequisites

-   Node.js and npm installed on your machine.
-   Modern web browser (Chrome/Edge) with support for the Web Speech API.

### Installation

1. Clone the repository: https://github.com/programming-hero-web-course2/b10-a10-server-side-DeveloperMonirBD.git

2. Install the dependencies: `bash npm install `

3. Start the development server:

`bash npm start `

4. Open your browser and navigate to https://visa-navigator-bb0c9.web.app to view the application.

## What to Submit

-   Assignment Category: `Sunflower`

-   Your client-side code GitHub repository link : https://github.com/programming-hero-web-course2/b10-a10-client-side-DeveloperMonirBD

-   Your server-side code GitHub repository link: https://github.com/programming-hero-web-course2/b10-a10-server-side-DeveloperMonirBD

-   Live link to the deployed project : https://visa-navigator-bb0c9.web.app
