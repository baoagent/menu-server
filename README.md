# Menu Management Service

A comprehensive restaurant menu management system with multilingual support, automated translation, and PDF menu generation.

## 🚀 Features

- **Multilingual Menus**: Support for English, Chinese, and Spanish with auto-translation
- **Dynamic Pricing**: Quarterly/semi-annual price updates with historical tracking
- **Menu Generation**: Automated PDF generation with customizable templates
- **Analytics Integration**: Track popular dishes by party size and customer preferences
- **Restaurant Management**: Multi-restaurant support with role-based access control
- **AWS Integration**: Scalable cloud storage and content delivery

## 🏗️ Architecture

- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Translation**: Local Ollama integration (qwen2.5:7b model)
- **File Storage**: AWS S3 + CloudFront CDN
- **Caching**: Redis for performance optimization
- **PDF Generation**: Puppeteer for high-quality menu rendering

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Redis 6+
- AWS Account (S3, CloudFront access)
- Ollama installed locally with qwen2.5:7b model

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd menu-management-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Install and configure Ollama**
   ```bash
   curl -fsSL https://ollama.ai/install.sh | sh
   ollama pull qwen2.5:7b
   ```

## ⚙️ Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/menu_management
REDIS_URL=redis://localhost:6379

# AWS
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-west-2
S3_BUCKET_NAME=restaurant-menu-system
CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id

# Translation
OLLAMA_API_URL=http://localhost:11434
TRANSLATION_MODEL=qwen2.5:7b

# Application
NODE_ENV=development
PORT=3000
JWT_SECRET=your-jwt-secret
```

## 🚀 Getting Started

### Development

```bash
# Start the development server
npm run dev

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Database Schema

### Core Tables

- **restaurants**: Restaurant profiles and branding
- **users**: Authentication and role management
- **menu_categories**: Menu organization structure
- **menu_items**: Menu items with trilingual support
- **price_history**: Historical price tracking
- **orders**: Order tracking for analytics
- **menu_templates**: Design templates and layouts
- **generated_menus**: PDF menu versions and metadata

### Key Relationships

- Restaurants have many menu categories and items
- Users belong to restaurants with role-based permissions
- Menu items track price history and order analytics
- Generated menus link to templates and restaurants

## 🔄 API Endpoints

### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /auth/profile` - User profile information

### Restaurants
- `GET /restaurants` - List restaurants
- `POST /restaurants` - Create restaurant
- `PUT /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant

### Menu Management
- `GET /restaurants/:id/menu` - Get complete menu
- `POST /restaurants/:id/menu/items` - Create menu item
- `PUT /restaurants/:id/menu/items/:itemId` - Update menu item
- `DELETE /restaurants/:id/menu/items/:itemId` - Delete menu item
- `POST /restaurants/:id/menu/categories` - Create category

### Menu Generation
- `POST /restaurants/:id/menu/generate` - Generate PDF menu
- `GET /restaurants/:id/menu/templates` - List available templates
- `POST /restaurants/:id/menu/templates` - Create custom template

### Analytics
- `GET /restaurants/:id/analytics/popular-items` - Popular items by party size
- `GET /restaurants/:id/analytics/revenue` - Revenue trends
- `GET /restaurants/:id/analytics/price-impact` - Price change impact

## 🌐 Translation System

### Auto-Translation Workflow

1. User creates/updates menu item in one language
2. System detects missing translations
3. Ollama API called with restaurant context
4. Translations stored in database
5. Manual override available for refinement

### Supported Languages

- **English** (`en`) - Primary language
- **Chinese** (`zh`) - Simplified Chinese
- **Spanish** (`es`) - Latin American Spanish

## 📄 Menu Generation

### Template System

- **Preset Templates**: Pre-designed layouts (Modern, Classic, Rustic, Fine Dining)
- **Custom Templates**: Restaurant-specific branding and layouts
- **Dynamic Generation**: Real-time PDF creation with current menu data

### File Organization

```
S3 Bucket Structure:
├── restaurants/{restaurant_id}/
│   ├── branding/
│   ├── menus/
│   ├── item_images/
│   └── temp/
├── templates/
└── system/
```

## 📈 Analytics Features

- **Popular Items**: Track by party size and time period
- **Price Impact**: Analyze revenue changes after price updates
- **Seasonal Trends**: Historical performance analysis
- **Cost Analysis**: Profit margin tracking per item

## 🔒 Security

- JWT-based authentication
- Role-based access control (Owner, Manager, Staff)
- Input validation with Zod
- Rate limiting on API endpoints
- Secure file upload handling

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📦 Deployment

### AWS EC2 Deployment

1. Launch EC2 t3.medium instance
2. Install Node.js, PostgreSQL, Redis, Ollama
3. Configure environment variables
4. Set up PM2 for process management
5. Configure nginx as reverse proxy

### Docker Deployment

```bash
# Build image
docker build -t menu-management-service .

# Run with docker-compose
docker-compose up -d
```

## 🔧 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commit messages
- Jest for testing

### Database Migrations
- Use Prisma migrate for schema changes
- Always backup before migrations in production
- Test migrations on staging environment

### API Design
- RESTful principles
- Consistent error handling
- Request/response validation
- Proper HTTP status codes

## 📚 Dependencies

### Core Dependencies
- `express` - Web framework
- `prisma` - Database ORM
- `@prisma/client` - Database client
- `puppeteer` - PDF generation
- `aws-sdk` - AWS services integration
- `redis` - Caching layer
- `zod` - Schema validation
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication

### Development Dependencies
- `typescript` - Type system
- `@types/node` - Node.js types
- `jest` - Testing framework
- `supertest` - HTTP testing
- `eslint` - Code linting
- `prettier` - Code formatting

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [documentation](docs/) folder
- Review the [API documentation](docs/api.md)

## 🗺️ Roadmap

- [ ] Mobile app integration
- [ ] Advanced analytics and ML recommendations
- [ ] Multi-location chain management
- [ ] Integration with POS systems
- [ ] Customer feedback integration
- [ ] Inventory management integration
