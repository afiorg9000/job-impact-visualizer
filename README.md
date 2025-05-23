# Vite React Shadcn TS

## Project Overview
This project is a React application bootstrapped with Vite. It uses TypeScript and integrates various Radix UI components, Tailwind CSS for styling, and several other libraries for enhanced functionality.

## Installation
To get started with this project, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone <repository-url>

# Navigate into the project directory
cd ai-job-pulse-check-main

# Install dependencies
npm install
```

## Usage
To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server on `http://localhost:8080`.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run build:dev`: Builds the application in development mode.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build locally.

## Configuration
The project uses Vite for bundling and development. The configuration can be found in `vite.config.ts`. It includes settings for the development server, plugins, and module resolution.

## Dependencies
The project includes a variety of dependencies, including:
- `react` and `react-dom` for building the user interface.
- `@radix-ui` components for accessible UI components.
- `tailwindcss` for utility-first CSS styling.
- `@tanstack/react-query` for data fetching and caching.
- `zod` for schema validation.

For a complete list of dependencies, see the `package.json` file.

## License
This project is licensed under the MIT License.
