# Simple Menu Server

A lightweight backend server for managing a single restaurant menu, with CRUD operations for menu items and categories, and PDF menu generation.

## Features

- **Menu Management**: Create, read, update, and delete menu categories and items.
- **PDF Generation**: Automatically generate a PDF version of the menu.

## Architecture

- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite
- **PDF Generation**: pdfkit

## Prerequisites

- Node.js 18+

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd menu-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:init
   ```

## Getting Started

### Development

```bash
# Start the development server
npm run dev
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## API Endpoints

### Menu

- `GET /menu`: Get the complete menu.
- `POST /menu/items`: Create a new menu item.
- `PUT /menu/items/:itemId`: Update an existing menu item.
- `DELETE /menu/items/:itemId`: Delete a menu item.
- `POST /menu/categories`: Create a new menu category.
- `GET /menu/pdf`: Generate and download a PDF of the menu.
