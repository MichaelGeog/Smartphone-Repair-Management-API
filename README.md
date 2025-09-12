# Smartphone Repair Management API (SBA318)

A small Express.js project for managing brands, Apple devices, issues (with prices), and customer tickets. Includes RESTful CRUD routes, query-parameter filtering, custom middleware, and an EJS view to create and list tickets.

## Features
- RESTful CRUD for **brands**, **apple devices**, **issues**, **tickets**
- Query parameter **filtering** on list endpoints
- Two custom middlewares (`logger`, `requireJson`) + error handler
- EJS **Tickets** page with form (brand/device/issue dropdowns) and table
- **Price** is auto-derived from `issues` by selected issue
- Basic dark **CSS** styling served via `express.static`

## Tech Stack
- Node.js, Express.js (ES Modules)
- EJS (server-side templates)
- In-memory data (no database) under `data/`
- Vanilla CSS served from `public/`


---

### Part 6 — API Endpoints
```markdown
## API Endpoints

### Brands
- `GET /api/brands`  
  Filters: `?name=APPLE`, `?id=AE`
- `POST /api/brands`
- `GET /api/brands/:id`
- `PATCH /api/brands/:id`
- `DELETE /api/brands/:id`

### Apple Devices
- `GET /api/brands/apple`  
  Filters: `?model=PRO`
- `POST /api/brands/apple`
- `GET /api/brands/apple/:id`
- `PATCH /api/brands/apple/:id`
- `DELETE /api/brands/apple/:id`

### Issues
- `GET /api/issues`  
  Filters: `?issue=BATTERY&models=ALL&minPrice=50&maxPrice=150`
- `POST /api/issues`
- `GET /api/issues/:id`
- `PATCH /api/issues/:id`
- `DELETE /api/issues/:id`

### Tickets
- `GET /api/tickets`  
  Filters: `?email=john@example.com&brand=APPLE&device=IPHONE%2012&issue=BATTERY&phone=555`
- `POST /api/tickets`
- `GET /api/tickets/:id`
- `PATCH /api/tickets/:id`
- `DELETE /api/tickets/:id`


## Middleware

- `logger` – logs `[ISO time] METHOD URL`
- `requireJson` – enforces `Content-Type: application/json` on `POST/PUT/PATCH`
- `notFound` – forwards unknown routes as `{ status:404 }`
- `errorHandler` – unified JSON errors `{ error: "message" }`

Mounted in `server.js`:
```js
app.use(logger);
app.use(requireJson);
app.use("/api/brands/apple", appleRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/tickets", ticketsRoute);
app.use(notFound);
app.use(errorHandler);



---

### Part 8 — Tickets View
```markdown
## Tickets View (EJS)

- Route: `GET /tickets`
- Template: `views/tickets.ejs`
- CSS: `public/styles.css` (served via `express.static`)
- Form fields: full name, phone, email, **brand (select)**, **device (select)**, **issue (select)**, **price (readonly)**
- Behavior: price auto-fills from selected issue; submit POSTs JSON to `/api/tickets`; the new ticket row is **appended** to the table.
