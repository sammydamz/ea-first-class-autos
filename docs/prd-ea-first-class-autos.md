## Problem Statement

The user (EA First Class Autos, a car dealership) needs a lightweight car listing website to showcase vehicles with images, specifications, and pricing. The site should prioritize speed, simplicity, and direct conversion via WhatsApp inquiry. There is NO user authentication - all interactions are inquiry-based. The user is building on top of an existing next-prisma-tailwind-ecommerce monorepo (Persepolis) but will strip out all ecommerce features.

## Solution

Build a Next.js 16 + Neon Postgres + UploadThing car listing platform with:

- **Storefront**: Homepage (banner + car grid), car detail pages with WhatsApp inquiry, About, Contact pages
- **Admin**: Dashboard, car/brand/category/banner CRUD, site settings
- **WhatsApp integration**: Default number configurable, per-car override, floating CTA button on all pages
- **Image storage**: UploadThing (replacing existing Cloudinary)
- **Branding**: White (#fafafa), Rose (#e11d48), Charcoal (#1c1917)

## User Stories

### Public Storefront

1. As a visitor, I want to see all available cars on the homepage, so that I can browse the inventory
2. As a visitor, I want to click a car card to see full details, so that I can make an informed decision
3. As a visitor, I want to filter cars by brand, category, and price range, so that I can find vehicles matching my criteria
4. As a visitor, I want to sort cars by price or date, so that I can organize the results
5. As a visitor, I want to click "Enquire on WhatsApp" on any car, so that I can start a conversation with pre-filled car details
6. As a visitor, I want the floating WhatsApp button visible on all pages on mobile, so that I can inquire with one tap
7. As a visitor, I want to read the About and Contact pages, so that I can learn about the business

### Admin Panel

8. As an admin, I want to log in with email and password, so that I can access the admin panel
9. As an admin, I want to add a new car with title, model, year, price, condition, description, specs, and images, so that I can list inventory
10. As an admin, I want to set a default WhatsApp number in settings, so that inquiries go to the business by default
11. As an admin, I want to optionally set a per-car WhatsApp number, so that different cars can go to different contacts
12. As an admin, I want to mark a car as sold/unavailable, so that it's hidden from the catalog but preserved in data
13. As an admin, I want to see a dashboard with total/available/sold car counts, so that I can see inventory at a glance
14. As an admin, I want to manage brands, so that I can organize car inventory
15. As an admin, I want to manage vehicle type categories, so that I can organize car inventory
16. As an admin, I want to manage homepage banners, so that I can showcase featured content

### Data & SEO

17. As an admin, I want slug-based URLs (e.g., /cars/toyota-corolla-2020), so that links are readable and SEO-friendly
18. As an admin, I want dynamic specifications (key-value pairs), so that any car can have any specs without schema changes
19. As an admin, I want unique slugs auto-generated from titles, so that duplicates are handled automatically
20. As an SEO crawler, I want unique metadata per car page, so that indexing works properly

### Technical

21. As the developer, I want to seed the first admin account, so that initial login works
22. As the developer, I want to deploy to Vercel + Neon, so that the site is publicly accessible

## Implementation Decisions

### Data Model (5 models)

- **Admin**: `id`, `email`, `passwordHash`, `name`, `createdAt`, `updatedAt` - single account, JWT cookie auth
- **Car**: `id`, `title`, `slug`, `model`, `year`, `price`, `isNegotiable`, `condition` ("New"|"Used"), `description`, `specifications` (JSON), `images` (String[]), `whatsappNumber`, `isAvailable`, `isDeleted`, `brandId`, `categories(Category[])`, `createdAt`, `updatedAt`
- **Brand**: `id`, `title`, `description`, `logo`, `createdAt`, `updatedAt`
- **Category**: `id`, `title`, `description`, `logo`, `createdAt`, `updatedAt` - vehicle types only (Sedan, SUV, etc.)
- **Banner**: `id`, `title`, `image`, `description`, `link`, `categoryId`, `createdAt`, `updatedAt`
- **SiteConfig**: `id`, `defaultWhatsApp`, `businessName`, `businessAddress`, `businessPhone`, `businessEmail`

### Pages

- Storefront (4 pages): `/`, `/cars/[slug]`, `/about`, `/contact` - paginated 12/page, filtered by brand/category/price/sort
- Admin: Dashboard, Cars CRUD, Brands CRUD, Categories CRUD, Banners CRUD, Settings page

### Key Behaviors

- Slug auto-generated from title, collision-safe with `-2`, `-3` suffix
- Image upload order = display order, first image is featured
- Sold cars hidden from catalog via `isAvailable` filter
- Soft delete via `isDeleted` flag
- WhatsApp message includes: car title, price, all specs (as formatted text), page link
- Floating WhatsApp button on ALL storefront pages - uses car-specific message on detail page, generic on other pages
- Admin filters: brand (dropdown), category (dropdown), price range (min/max), sort (price low/high, newest)

### Packages to Remove

- All `@persepolis/*` packages (zarinpal, sms, oauth, regex, rng, slugify deprecated, mail)
- `swr` (Server Components replace it)
- `recharts` (not needed)

### Packages to Add

- `@uploadthing/react` for image uploads

### Tech Stack

- Next.js 16.2.4 with Turbopack (default)
- React 19.2.5
- Neon Postgres (serverless, separate compute/storage)
- UploadThing for images
- Prisma ORM
- Tailwind CSS + shadcn/ui
- JWT cookie auth (adapted from existing)
- Vercel deployment target

### Color Scheme

- Background: `#fafafa` (white)
- Primary accent: `#e11d48` (rose) - WhatsApp buttons, CTAs
- Text/UI: `#1c1917` (charcoal)

## Testing Decisions

Key areas for testing:

- **WhatsApp URL generation**: Verify message encoding is correct, includes all specs, page link works
- **Slug uniqueness**: Test duplicate title handling
- **Image display order**: First image as featured on cards and gallery
- **Filtering**: Brand, category, price range filters work correctly
- **Admin auth**: Login flow works, protected routes redirect properly
- **Car CRUD**: Create, read, update, soft-delete, list pagination all work

Test approach: Playwright or manual testing for full flows since this is a Next.js App Router app. Unit test any isolated utilities (slug generation, WhatsApp message formatting).

## Out of Scope

- User authentication on storefront (inquiry-only)
- Cart, checkout, payment processing (WhatsApp replaces all commerce)
- Blog system (existing Blog model being removed)
- Wishlist functionality
- Discount codes / promotions
- Order management
- Multi-admin accounts (single admin)
- Email sending / SMS notifications
- Featured / promoted car logic beyond banner
- Advanced analytics / charts on admin dashboard

## Further Notes

- Building on existing Persepolis monorepo, stripping ecommerce features
- Brand model serves as "make" (e.g., Toyota)
- Condition is a dedicated Car field ("New"|"Used"), not Category
- Sold cars stay in database, hidden via `isAvailable` filter - maintains SEO history
- Admin credentials seeded via Prisma seed script from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars
- Category represents vehicle type (Sedan, SUV, Truck) - not condition
- No image reordering UI - upload order = display order
- Minimum viable: homepage with cars, detail page, WhatsApp integration. Filters, About/Contact, Admin are also MVP scope