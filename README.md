# New Health Society Website

This is a basic React application for the New Health Society website. The site features a modern design with a blue blob background pattern.

## Project Structure

```
src/
├── assets/         # For images, icons, and other static files
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Page components
└── styles/         # CSS styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables

Add a `.env.local` file with the following keys to enable live Google reviews:

```
REACT_APP_GOOGLE_PLACES_API_KEY=your-google-places-api-key
REACT_APP_GOOGLE_PLACE_ID=ChIJ39twPwB1nkcRlt7w_DSf9Bg
```

Restrict the key to your domains inside the Google Cloud console.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Runs the test suite
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects the app from Create React App

## Technologies Used

- React
- TypeScript
- CSS
