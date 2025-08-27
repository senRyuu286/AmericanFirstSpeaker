# America First Speakers

A professional website for connecting event organizers with influential conservative speakers in America.

## Features

- **Dynamic Speaker Profiles**: Browse through our curated list of distinguished speakers
- **Interactive Contact Forms**: Easy booking and inquiry system
- **Responsive Design**: Beautiful layout that works on all devices
- **Multiple Pages**: Home, Speakers, Pricing, About, Contact, and Video Introduction
- **Modern UI**: Clean, patriotic design with American flag imagery

## Tech Stack

- **Backend**: Node.js with Express.js
- **Template Engine**: EJS
- **Styling**: Custom CSS with responsive design
- **Frontend**: Vanilla JavaScript for interactivity

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your configuration (optional):
   ```
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── public/           # Static assets
│   ├── css/         # Stylesheets
│   ├── images/      # Image files
│   └── js/          # Client-side JavaScript
├── views/           # EJS templates
│   ├── partials/    # Reusable components
│   └── *.ejs        # Page templates
├── server.js        # Express server
├── package.json     # Dependencies
└── .env            # Environment variables
```

## Pages

- **Home**: Featured speakers and introduction
- **Speakers**: Complete list of all available speakers
- **Speaker Detail**: Individual speaker profiles with booking options
- **Pricing**: Service packages and pricing information
- **About**: Company mission and values
- **Contact**: Contact form and information
- **Video Intro**: Video content and highlights

## License

All rights reserved.