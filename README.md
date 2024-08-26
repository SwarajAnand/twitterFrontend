# Twitter Frontend Clone

A frontend application for a Twitter-like social media platform, built with React, Tailwind CSS, and integrates with the Twitter backend API.

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Setup and Installation](#setup-and-installation)
4. [Video Demonstrations](#video-demonstrations)
5. [Usage](#usage)
6. [Contributing](#contributing)

## Project Description

This project is a React-based frontend for a Twitter-like social media application. It communicates with a backend API to handle user authentication, post management, and other core functionalities.

## Backend

The backend API for this application can be found [here](https://github.com/SwarajAnand/BackendWithNodePrep/tree/main/Twitter).

## Features

- User authentication (signup, login, logout)
- User profile management
- Post creation, deletion, liking, and commenting
- Follow and unfollow users
- Responsive design using Tailwind CSS

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/SwarajAnand/twitterFrontend.git
    cd twitter-frontend-clone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```
    REACT_APP_BACKEND_API_URL=https://backendwithnodeprep-1.onrender.com/api/v1
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Video Demonstrations

Here are some video demonstrations of the application:

- [Video Go through -> Part 1](https://www.loom.com/share/c61b9c8b78364e0290c736bf288b79da?sid=321607ff-8cab-44ae-bc07-f30bd793a473)
- [Video Go through -> Part 2](https://www.loom.com/share/f68bf845366f4749a5087575ca16e6cd?sid=812caf2c-0589-4973-a4d5-d026c44aa269)

## Usage

1. Navigate to `http://localhost:{Acc. to what bundler you use}` in your browser to view the application.
2. Use the provided signup and login forms to authenticate users.
3. Create, like, and comment on posts using the respective UI components.
4. Follow and unfollow users as desired to see updates in the user profile.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues. Please follow the coding standards and guidelines provided in the repository.
