# CLAUDE.md — Opel Tools B2C

> This file is the single source of truth for Claude Code sessions working on this project.
> Update it whenever architecture, rules, or requirements change.

---

## Project Overview

**Product:** B2C eCommerce website for Opel Tools — `opeltools.com`
**Owner:** Burhanuddin (burhanuddin@mazingbusiness.com)
**Reference site:** mazingbusiness.com (B2B sister project — same design language)
**Repo:** https://github.com/Burhanuddin24/Mazing-B2C
**Dev branch:** `claude/opel-tools-b2c-phase1-9yq0va`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | Laravel 11 (PHP 8.4) |
| Database | SQLite (dev) / MySQL (production) |
| HTTP client | Axios |
| Router | React Router v6 |
| Styling | Inline styles + Tailwind utility classes |

---

## Folder Structure

```
Mazing-B2C/
├── CLAUDE.md                          ← You are here
├── README.md
├── .gitignore
│
├── backend/                           ← Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/B2C/
│   │   │   │   ├── ProductController.php   ← GET /api/b2c/products, /products/{slug}
│   │   │   │   └── CategoryController.php  ← GET /api/b2c/categories
│   │   │   └── Resources/B2C/
│   │   │       └── ProductResource.php     ← API JSON shape
│   │   └── Models/
│   │       ├── Product.php                 ← b2cVisible scope, search/category/brand scopes
│   │       ├── Category.php
│   │       ├── Brand.php
│   │       └── ProductEnrichment.php       ← Future: AI/admin content enrichment
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 2024_01_01_000001_create_brands_table.php
│   │   │   ├── 2024_01_01_000002_create_categories_table.php
│   │   │   ├── 2024_01_01_000003_create_products_table.php
│   │   │   └── 2024_01_01_000004_create_product_enrichments_table.php
│   │   └── seeders/
│   │       └── OpelToolsSeeder.php         ← 10 sample products across 6 categories
│   ├── routes/
│   │   └── api.php                         ← All B2C routes under /api/b2c prefix
│   ├── config/cors.php                     ← CORS open to all origins (dev)
│   ├── .env                                ← Local config (not in git)
│   └── .env.example                        ← Template for production MySQL setup
│
└── frontend/                          ← React + Vite app
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx              ← Sticky nav, logo, mobile hamburger
    │   │   ├── Footer.jsx              ← Links, contact, copyright
    │   │   ├── ProductCard.jsx         ← Card with image, price, discount badge, brand tag
    │   │   ├── CategorySection.jsx     ← Color-coded category grid with product counts
    │   │   └── Loader.jsx              ← Spinning orange loader
    │   ├── pages/
    │   │   ├── Home.jsx                ← Hero + USP strip + categories + featured products + CTA
    │   │   ├── Products.jsx            ← Sidebar filters + paginated product grid
    │   │   └── ProductDetail.jsx       ← Image + price + tabbed specs/features/warranty
    │   ├── services/
    │   │   └── api.js                  ← Axios instance + getProducts, getProduct, getCategories
    │   ├── App.jsx                     ← BrowserRouter + routes
    │   ├── index.css                   ← Tailwind import + global resets
    │   └── main.jsx
    └── vite.config.js                  ← Tailwind plugin + proxy /api → localhost:8000
```

---

## API Endpoints

Base: `http://localhost:8000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/b2c/products` | Paginated list — B2C visible only |
| GET | `/b2c/products/{slug}` | Single product detail + enrichment |
| GET | `/b2c/categories` | Active categories with B2C product counts |

### Query params for `/b2c/products`
| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `search` | string | — | Searches `name` and `part_no` |
| `category` | string | — | Category slug or id |
| `brand` | string | — | Brand slug or id |
| `page` | int | 1 | |
| `per_page` | int | 20 | Max 100 |

### Response shape (products list)
```json
{
  "success": true,
  "data": {
    "data": [ ...products ],
    "links": { ... },
    "meta": { "current_page": 1, "last_page": 3, "total": 50, "per_page": 20 }
  }
}
```

### Response shape (single product)
```json
{
  "success": true,
  "data": {
    "id": 1, "name": "...", "slug": "...", "part_no": "...",
    "brand": "Opel Tools", "brand_slug": "opel-tools",
    "category": "Hand Tools", "category_slug": "hand-tools",
    "mrp": 1850, "selling_price": 1399, "discount_percent": 24,
    "current_stock": 45, "image": null,
    "description": "...", "specifications": { ... }, "features": [ ... ],
    "warranty": "...", "usage_application": "...", "technical_details": null,
    "enrichment": null
  }
}
```

---

## Core Business Rules

### B2C Product Visibility Rule
A product is shown on the website **only when both conditions are true:**
```
current_stock >= 1   (has physical stock)
seller_stock = 0     (not reserved for B2B seller)
```
This is enforced as a named Eloquent scope in `Product.php`:
```php
public function scopeB2cVisible(Builder $query): Builder
{
    return $query
        ->where('current_stock', '>=', 1)
        ->where('seller_stock', 0)
        ->where('is_active', true);
}
```
**Never remove or bypass this scope on any B2C-facing query.**

### Product Data Source
- Primary data comes from the existing mazingbusiness.com MySQL database tables
- The same `products`, `brands`, `categories` table structure is reused
- `product_enrichments` is a new table for Phase 2 AI/admin content enrichment

### Product Enrichment (Phase 2 — not built yet)
When a product has missing description/specs/features, an enrichment record can be added via:
- Admin panel input
- AI generation (using Claude API)
- Web data import

Enrichment with `status = 'approved'` is overlaid on top of raw product data in `ProductResource.php`.

---

## Database Schema Summary

### `products`
| Column | Type | Notes |
|--------|------|-------|
| id | bigint | PK |
| name | varchar(255) | |
| slug | varchar(255) | unique, used in URLs |
| part_no | varchar(100) | indexed |
| brand_id | FK → brands | nullable |
| category_id | FK → categories | nullable |
| mrp | decimal(10,2) | nullable, original price |
| selling_price | decimal(10,2) | |
| current_stock | int | B2C rule: must be >= 1 |
| seller_stock | int | B2C rule: must be 0 |
| image | varchar(500) | nullable, URL or path |
| description | text | nullable |
| specifications | json | nullable, key-value object |
| features | json | nullable, array of strings |
| warranty | text | nullable |
| usage_application | text | nullable |
| technical_details | json | nullable |
| is_active | tinyint | soft visibility toggle |

### `product_enrichments`
| Column | Type | Notes |
|--------|------|-------|
| product_id | FK → products | cascade delete |
| description/specifications/features/warranty/usage_application/technical_details | text/json | enriched content |
| source | enum | admin, ai, web |
| status | enum | pending, approved, rejected |
| enriched_by | varchar | who/what did the enrichment |
| enriched_at | timestamp | |

### `categories`
`id, name, slug (unique), parent_id (self-ref nullable), image, is_active`

### `brands`
`id, name, slug (unique), logo, is_active`

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1B3A6B` | Header, buttons, active states, prices |
| Primary dark | `#122952` | Top bar, footer |
| Accent | `#F97316` | CTA buttons, discount badges, loader, hover highlights |
| Surface | `#F8F9FA` | Page background |
| Card BG | `#FFFFFF` | Product cards, panels |
| Text | `#1A1A1A` | Headings |
| Muted | `#6B7280` | Subtext, labels |
| Border | `#E5E7EB` | Card borders, dividers |
| Font | Inter (Google Fonts) | All text |

**Layout:** Max-width `1280px`, padding `24px` sides.
**Cards:** `border-radius: 12px`, hover lifts `translateY(-4px)` with shadow.
**Responsive breakpoint:** `768px` — switches to single-column, hamburger nav, stacked product grid.

---

## Local Development Setup

```bash
# Backend (Terminal 1)
cd backend
cp .env.example .env          # then set DB_CONNECTION=sqlite for local
php artisan key:generate
php artisan migrate
php artisan db:seed            # seeds 10 sample products
php artisan serve --port=8000

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev                    # http://localhost:5173
```

**Vite proxy:** All `/api/*` requests from React are proxied to `http://localhost:8000` via `vite.config.js` — no CORS issue in dev.

**To re-seed from scratch:**
```bash
php artisan migrate:fresh --seed
```

---

## Phase Status

### Phase 1 — COMPLETE ✅
- [x] Laravel API (`/api/b2c/*`) with B2C product visibility rule
- [x] React home page (hero, categories, featured products)
- [x] React products listing page (filters, search, pagination)
- [x] React product detail page (tabs: description, specs, features, warranty)
- [x] Responsive design (desktop + mobile)
- [x] Product enrichment DB schema (ready for Phase 2)
- [x] Sample seeder with 10 real products

### Phase 2 — NOT STARTED
- [ ] Cart system
- [ ] Wishlist
- [ ] User registration + login (Laravel Sanctum)
- [ ] Order system
- [ ] Checkout flow
- [ ] Payment gateway (Razorpay / PayU)
- [ ] Product enrichment admin panel
- [ ] AI enrichment pipeline (Claude API)

### Phase 3 — PLANNED
- [ ] Admin dashboard
- [ ] Inventory sync with mazingbusiness.com source DB
- [ ] SEO optimization (meta tags, sitemap, schema markup)
- [ ] Email notifications (order confirm, dispatch)
- [ ] Analytics integration

---

## Key Conventions

### Backend
- All B2C controllers go in `app/Http/Controllers/Api/B2C/`
- All B2C API resources go in `app/Http/Resources/B2C/`
- Routes are grouped under `Route::prefix('b2c')` in `routes/api.php`
- Always apply `->b2cVisible()` scope on product queries — never skip it
- JSON columns (`specifications`, `features`, `technical_details`) store PHP arrays — model casts handle encoding. **Never pass pre-encoded JSON strings to these fields.**
- API responses always return `{ "success": true/false, "data": ... }`

### Frontend
- Inline styles are used for component-level styling (avoids class conflicts)
- `@media` responsive rules are injected via `<style>` tags inside components
- API calls go through `src/services/api.js` — never call axios directly in pages
- React Router slugs match Laravel slugs exactly (generated via `Str::slug()`)
- Placeholder image: `https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image`

### Git
- Feature branch: `claude/opel-tools-b2c-phase1-9yq0va`
- Never push directly to `main` without review
- Commit message format: `feat:`, `fix:`, `refactor:`, `docs:`

---

## Production Deployment Notes

- Set `DB_CONNECTION=mysql` and configure MySQL credentials in `.env`
- Run `php artisan config:cache && php artisan route:cache` after deploy
- Frontend: `npm run build` → serve `dist/` from Nginx/Apache or CDN
- Set `VITE_API_URL` in frontend `.env` to the production API domain
- Update `config/cors.php` `allowed_origins` to `['https://opeltools.com']` in production

---

*Last updated: Phase 1 complete — June 2026*
