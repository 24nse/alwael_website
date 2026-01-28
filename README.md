# Al-Wael Website

## Project Overview

This is the official website for Al-Wael, built with modern web technologies.

**Live Site**: https://24nse.github.io/alwael_website/

## Technology Stack

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations

## Local Development

### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Getting Started

```sh
# Step 1: Clone the repository
git clone https://github.com/24nse/alwael_website.git

# Step 2: Navigate to the project directory
cd alwael_website

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The development server will start at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Deployment

### GitHub Pages (Automated)

This project is configured for automatic deployment to GitHub Pages. Every push to the `main` branch will trigger a deployment.

The deployment workflow:
1. Builds the project with Vite
2. Deploys to GitHub Pages
3. Makes the site available at: https://24nse.github.io/alwael_website/

### Manual Deployment

To manually deploy:

```sh
# Build the project
npm run build

# The dist/ folder contains the production build
# You can deploy this folder to any static hosting service
```

## Project Structure

```
alwael_website/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions
│   ├── assets/      # Images, fonts, etc.
│   └── App.tsx      # Main app component
├── index.html       # HTML entry point
└── vite.config.ts   # Vite configuration
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

All rights reserved.
