# Opel Tools B2C — Phase 1

B2C eCommerce website for [opeltools.com](https://opeltools.com) built on the Mazing Business platform.

## Stack
- **Backend:** Laravel 11 (PHP 8.4) — `/backend`
- **Frontend:** React 18 + Vite + Tailwind CSS — `/frontend`
- **Database:** SQLite (dev) / MySQL (production)

---

## Quick Start

### Backend (Laravel API)
```bash
cd backend
cp .env.example .env        # configure DB credentials
php artisan key:generate
php artisan migrate
php artisan db:seed          # loads sample products
php artisan serve --port=8000
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev                  # runs on http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/b2c/products` | Paginated product listing |
| GET | `/api/b2c/products/{slug}` | Single product detail |
| GET | `/api/b2c/categories` | Categories with product counts |

### Query parameters for `/api/b2c/products`
| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Search name or part number |
| `category` | string | Filter by category slug |
| `brand` | string | Filter by brand slug |
| `page` | int | Page number (default: 1) |
| `per_page` | int | Results per page (default: 20, max: 100) |

**B2C Visibility Rule:** Only products where `current_stock >= 1` AND `seller_stock = 0` are shown.

---

## Folder Structure
```
Mazing-B2C/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/Api/B2C/    ← ProductController, CategoryController
│   │   ├── Http/Resources/B2C/          ← ProductResource
│   │   └── Models/                      ← Product, Category, Brand, ProductEnrichment
│   ├── database/
│   │   ├── migrations/                  ← brands, categories, products, enrichments
│   │   └── seeders/OpelToolsSeeder.php  ← sample data
│   └── routes/api.php                   ← /api/b2c/* routes
└── frontend/
    ├── src/
    │   ├── components/                  ← Header, Footer, ProductCard, CategorySection, Loader
    │   ├── pages/                       ← Home, Products, ProductDetail
    │   └── services/api.js              ← Axios API layer
    └── vite.config.js                   ← Proxy /api → localhost:8000
```

---

## Phase 2 (Planned)
- Cart & checkout
- User auth (registration, login)
- Wishlist
- Order management
- Product enrichment admin panel (AI/web/manual)
- Payment gateway integration
