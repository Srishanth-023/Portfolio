# 🛠️ Setup & Installation Guide

Welcome! This guide will walk you through setting up and running the 3D portfolio locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (Version 16+ recommended)
* [npm](https://www.npmjs.com/) (usually comes with Node.js)
* [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Srishanth-023/Portfolio.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Portfolio
   ```

3. **Install the required dependencies**
   ```bash
   npm install
   ```

## Configuration

This project uses EmailJS for the contact form functionality. You will need to create an account on [EmailJS](https://www.emailjs.com/) and configure your environment variables.

1. Create a `.env.local` file in the root directory.
2. Add your EmailJS credentials:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Running the Application

### Development Server
To start the local development server with hot-reloading:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` (or the port specified in your terminal).

### Production Build
To create a production-ready optimized build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Project Structure
- `src/constants/index.js`: The central location to update all your personal information, skills, experiences, and projects.
- `src/models/`: Contains the React components that render the 3D `.glb` assets.
- `src/assets/3d/`: The raw 3D models used in the application.
