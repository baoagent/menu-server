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
  ```bash
  curl http://localhost:3001/api/menu
  ```
- `POST /menu/items`: Create a new menu item.
  ```bash
  curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "Spring Rolls", "description": "Crispy fried spring rolls.", "price": 5.99, "menuCategoryId": "YOUR_CATEGORY_ID"}' \
  http://localhost:3001/api/menu/items
  ```
- `PUT /menu/items/:itemId`: Update an existing menu item.
  ```bash
  curl -X PUT -H "Content-Type: application/json" \
  -d '{"price": 6.49}' \
  http://localhost:3001/api/menu/items/YOUR_ITEM_ID
  ```
- `DELETE /menu/items/:itemId`: Delete a menu item.
  ```bash
  curl -X DELETE http://localhost:3001/api/menu/items/YOUR_ITEM_ID
  ```
- `POST /menu/categories`: Create a new menu category.
  ```bash
  curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "Appetizers"}' \
  http://localhost:3001/api/menu/categories
  ```
- `GET /menu/pdf`: Generate and download a PDF of the menu.
  ```bash
  curl -o menu.pdf http://localhost:3001/api/menu/pdf
  ```

## Schema:
See src/db/init.ts