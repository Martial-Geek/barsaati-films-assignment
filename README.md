# Barsaati Films Assignment

This assignment demonstrates web scraping with Selenium and ProxyMesh, and data storage using MongoDB, all implemented in Node.js. The goal is to fetch the top 5 trending topics from the Twitter home page and store the results in a MongoDB database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Introduction

This project is part of an assignment for Barsaati Films. The task involves using Selenium for web scraping, ProxyMesh for managing IP addresses, and MongoDB for data storage. The project includes a simple web interface to trigger the scraping process and display the results.

## Features

- **Web Scraping**: Uses Selenium to scrape the top 5 trending topics from Twitter.
- **Proxy Management**: Utilizes ProxyMesh to rotate IP addresses for each request.
- **Data Storage**: Stores the scraped data in a MongoDB database.
- **Web Interface**: Provides a simple HTML interface to run the scraping script and display results.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **MongoDB**: Set up a MongoDB instance (local or using a service like MongoDB Atlas).
- **ProxyMesh Account**: Obtain a ProxyMesh account for managing proxies.
- **Twitter Account**: A Twitter account to access the Twitter home page.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/barsaati-films-assignment.git
    cd barsaati-films-assignment
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Configuration

1. **Twitter Credentials**: Update the `seleniumScript.js` file with your Twitter username and password.
2. **ProxyMesh**: Update the proxy settings in `seleniumScript.js` with your ProxyMesh IP and port.
3. **MongoDB**: Update the MongoDB URI in `seleniumScript.js` with your MongoDB connection string.

## Usage

1. Start the server:

    ```sh
    node server.js
    ```

2. Open `index.html` in your browser.
3. Click the "Get Trending Topics" button to run the Selenium script and display the results.

## Project Structure

- **index.html**: The HTML file providing the web interface.
- **server.js**: The Express.js server file handling HTTP requests.
- **seleniumScript.js**: The Selenium script for web scraping and data storage.
- **package.json**: The Node.js project configuration file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Example Configuration

Update the `seleniumScript.js` with your credentials:

```javascript
const twitterUrl = 'https://twitter.com/login';
const username = 'YOUR_TWITTER_USERNAME';
const password = 'YOUR_TWITTER_PASSWORD';
const mongoUri = 'YOUR_MONGODB_URI';
