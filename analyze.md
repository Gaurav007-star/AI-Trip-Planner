# AI Trip Planner — Complete Project Analysis

## 1. Project Overview

**AI Trip Planner** is a full-stack MERN (MongoDB, Express, React, Node.js) web application that generates personalized travel itineraries using AI. Users authenticate via Google OAuth, input travel preferences (destination, budget, duration, group size), and receive AI-generated trip plans with hotel recommendations and day-by-day itineraries. Plans are persisted in MongoDB and can be shared via WhatsApp/Facebook. AI generation runs server-side via OpenRouter (Gemma model).

**Purpose:** Eliminate the stress of trip planning by auto-generating practical, fun, and tailored travel plans.

---

## 2. Tech Stack

### Frontend (`client/`)

| Category | Technology | Version |
|---|---|---|
| Framework | React | ^18.3.1 |
| Build Tool | Vite | ^6.0.5 |
| Styling | Tailwind CSS v4 + Styled-Components | ^4.0.0 / ^6.1.13 |
| State Management | Redux Toolkit | ^2.5.0 |
| Routing | React Router DOM | ^7.1.1 |
| UI Components | Radix UI (dialog, dropdown-menu, slot, accordion) + shadcn/ui | — |
| Icons | lucide-react + react-icons | ^0.469.0 / ^5.4.0 |
| Google Auth | @react-oauth/google | ^0.12.1 |
| HTTP Client | axios | ^1.7.9 |
| Notifications | react-hot-toast | ^0.5.0 |
| Social Share | react-share | ^5.1.2 |
| CSS Utilities | clsx, tailwind-merge, class-variance-authority | — |
| Linting | ESLint (flat config) | ^9.17.0 |
| Place Search | TomTom API (custom component) | — |
| Toasts | react-hot-toast (replaced react-toastify) | ^0.5.0 |

### Backend (`server/`)

| Category | Technology | Version |
|---|---|---|
| Runtime | Node.js | — |
| Framework | Express | ^4.21.2 |
| Database | MongoDB with Mongoose | ^8.9.3 |
| AI Provider | OpenRouter SDK | ^0.13.7 |
| AI Provider | @google/genai (unused) | ^2.10.0 |
| HTTP Client | axios | ^1.18.1 |
| Environment | dotenv | ^16.4.7 |
| Logging | morgan | ^1.10.0 |
| CORS | cors | ^2.8.5 |
| Dev | nodemon | ^3.1.9 |

---

## 3. Directory Structure

```
D:\projects\AI-Trip-Planner\
├── .git/
├── .idea/                          # JetBrains IDE config
├── README.md                       # Project readme
├── analyze.md                      # This analysis file
│
├── client/                         # React frontend
│   ├── .env                        # ⚠️ Contains real API keys
│   ├── .env.sample
│   ├── .gitignore
│   ├── README.md
│   ├── components.json             # shadcn/ui config
│   ├── eslint.config.js            # ESLint flat config
│   ├── index.html                  # HTML entry point
│   ├── jsconfig.json               # JS path aliases (@/ -> src/)
│   ├── package.json
│   ├── vite.config.js              # Vite config with @ alias
│   ├── dist/                       # Production build output
│   ├── public/                     # Static assets (images, icons)
│   └── src/
│       ├── pages/
│       │   └── Home.jsx            # Home page composing Hero + Process + Faq
│       ├── App.jsx                 # Root component + routing
│       ├── index.css               # Tailwind v4 + CSS variables + animations
│       ├── main.jsx                # App entry point (Toaster instead of ToastContainer)
│       ├── assets/
│       │   └── assets.js           # Constants (travel/budget options, AI prompt)
│       ├── components/
│       │   ├── custom/
│       │   │   ├── Auth.jsx        # ⚠️ Unused standalone auth component
│       │   │   ├── Faq.jsx         # Accordion FAQ section
│       │   │   ├── Footer.jsx      # Site footer (brand, nav, wordmark)
│       │   │   ├── Header.jsx      # Navigation header + login dialog (responsive hamburger)
│       │   │   ├── Hero.jsx        # Landing page hero (responsive image)
│       │   │   ├── Process.jsx     # "How It Works" 4-step section
│       │   │   ├── Hotel.jsx       # Hotel recommendations grid
│       │   │   ├── HotelCard.jsx   # Individual hotel card
│       │   │   ├── Itinerary.jsx   # Daily itinerary wrapper
│       │   │   ├── PlanCard.jsx    # Individual place card
│       │   │   ├── Share.jsx       # Share trip via WhatsApp/Facebook
│       │   │   ├── ScrollToTop.jsx # Floating scroll-to-top button + auto-scroll on route change
│       │   │   ├── TomTomAutocomplete.jsx  # Destination search via TomTom API
│       │   │   ├── UserTrip.jsx    # Trip thumbnail card (with Modal delete confirmation)
│       │   └── ui/                 # shadcn/ui components
│       │       ├── button.jsx
│       │       ├── card.jsx
│       │       ├── accordion.jsx
│       │       ├── dialog.jsx
│       │       ├── dropdown-menu.jsx
│       │       ├── input.jsx
│       │       └── modal.jsx        # Custom Modal wrapper (Dialog + Header + Title + Description)
│       ├── create-trip/
│       │   └── index.jsx           # Trip creation form (step-based)
│       ├── css-sheets/
│       │   └── css-styles.js       # Styled-components CSS
│       ├── error/
│       │   └── index.jsx           # 404 error page
│       ├── lib/
│       │   └── utils.js            # cn() utility (clsx + tailwind-merge)
│       ├── store/
│       │   ├── store.js            # Redux store config
│       │   └── slices/
│       │       ├── TripSlice.js    # Trip async thunks + slice
│       │       └── UserSlice.js    # User async thunks + slice
│       ├── trip/
│       │   └── index.jsx           # Single trip view page
│       └── user/
│           └── index.jsx           # User dashboard page
│
└── server/                         # Express backend
    ├── .env                        # ⚠️ Contains real DB + API keys
    ├── .env.sample
    ├── .gitignore
    ├── package.json
    ├── server.js                   # Express app entry
    ├── test-openrouter.js          # Standalone OpenRouter test script
    ├── config/
    │   └── db.js                   # MongoDB connection
    ├── controllers/
    │   └── trip.controllers.js     # Trip CRUD + AI generation controllers
    ├── models/
    │   └── trip.model.js           # Mongoose trip schema
    └── routes/
        └── trip.route.js           # Trip API routes
```

---

## 4. Configuration Details

### `client/.env` (⚠️ Contains real, working API keys)

| Key | Purpose |
|---|---|
| `VITE_GOOGLE_AUTH_CLIENT_ID` | Google OAuth client ID |
| `VITE_TOMTOM_PLACE_API` | TomTom Place Search API key |
| `VITE_PEXELS_API_KEY` | Pexels image search API key |

### `server/.env` (⚠️ Contains real credentials)

| Key | Purpose |
|---|---|
| `MONGO` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | ⚠️ Unused — no code references this |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI generation |

### `client/vite.config.js`
- Plugin: `@vitejs/plugin-react`, `@tailwindcss/vite`
- Path alias: `@` → `./src`

### `client/jsconfig.json`
- Path alias: `@/*` → `./src/*`

### `client/components.json` (shadcn/ui)
- Style: `"default"`, RSC: false, TSX: false
- Base color: `"neutral"`, CSS variables: true
- Aliases: `@/components`, `@/lib/utils`

### `client/index.html`
- Root div `#root`, modal portal `#modal-root`
- Google Fonts: Inter Tight + Poppins
- Script: `/src/main.jsx`

### Key Package Differences (vs. existing analyze.md)
- **No more:** `daisyui`, `@google/generative-ai`, `react-google-places-autocomplete`, `google-genai`, `PostCSS`, `tailwind.config.js`
- **New:** `@tailwindcss/vite` (Tailwind v4), `TomTomAutocomplete` (custom), server-side `@openrouter/sdk`
- **Tailwind v4** — no `tailwind.config.js` or `postcss.config.js` needed; uses `@import "tailwindcss"` and `@theme` directives in CSS

---

## 5. Server-Side Source Code

### `server/server.js` — Express Entry Point
- Loads `dotenv`, `express`, `morgan`, DB connection, `TripRoute`, `cors`
- Middleware: `morgan('dev')`, `cors()` (wide open), `express.json()`, `express.urlencoded({extended:true})`
- Routes: `/trip` → `TripRoute`
- Listens on **port 8000**, then connects to MongoDB

### `server/config/db.js` — MongoDB Connection
- Exports `DataBase` async function
- Connects to `process.env.MONGO` + `/tripinfo` database
- Logs success or error

### `server/models/trip.model.js` — Mongoose Schema
```js
{
  trip: Object,     // required — AI-generated trip data (nested object)
  choice: Object,   // required — user's form preferences
  email: String,    // required — user's email
  timestamps: true  // createdAt, updatedAt
}
```
- **Note:** `required` field uses `require: true` (typo — Mongoose accepts `require` but standard is `required`)

### `server/routes/trip.route.js` — API Routes

| Method | Route | Controller | Description |
|---|---|---|---|
| POST | `/trip/create` | `createTrip` | Save a pre-generated trip manually |
| POST | `/trip/generate` | `generateTrip` | Generate trip via AI + save to DB |
| GET | `/trip/fetch-trip/:email` | `fetchAllTrip` | Get all trips for a user |
| GET | `/trip/fetch-one-trip/:id` | `singleTrip` | Get a single trip by ID |
| DELETE | `/trip/delete/:id` | `deleteTrip` | Delete a trip by ID |

### `server/controllers/trip.controllers.js` — Business Logic

**`createTrip(req, res)`**
- Validates `{ trip, choice, email }` exist
- Creates Mongoose document
- Returns 201 with trip data

**`fetchAllTrip(req, res)`**
- Finds all trips by email param
- Returns 200 with `{ success: true, tripDetails: [] }` if none found (no longer returns 400 error)

**`generateTrip(req, res)`** — **Key AI endpoint**
- Takes `{ prompt, email, choice }` from body
- Calls OpenRouter API (`google/gemma-4-31b-it:free` model)
- System instruction enforces exact JSON schema matching frontend's expected keys
- Strips markdown code fences from response
- Parses JSON and saves to MongoDB
- **Error handling:** Maps HTTP status codes to user-friendly messages (429 rate-limit, 401/403 auth, 5xx unavailable)
- Returns 201 with created trip

**`deleteTrip(req, res)`**
- Validates MongoDB ObjectId
- Deletes by ID
- Returns 404 if not found

**`singleTrip(req, res)`**
- Finds by `_id`
- Returns 400 on error (should be 404 for not found)

---

## 6. Client-Side Entry & App Shell

### `src/main.jsx` — Entry Point
- Wraps `<App>` in `GoogleOAuthProvider` + Redux `Provider`
- Renders `<Toaster>` themed with CSS variables (`--card`, `--foreground`, `--border`, `--primary`, `--destructive`)
- Uses react-hot-toast (replaced react-toastify)

### `src/App.jsx` — Root Component
- **Redux:** reads `state.user.user` for protected routes
- **Routes:**

| Path | Component | Auth Required |
|---|---|---|
| `/` | `<Home />` (Hero + Process + Faq) | No |
| `/create-trip` | `<CreateTrip />` | No (login prompt on generate) |
| `/user` | `<Userpage />` | ✅ Yes (conditional render) |
| `/trip/:id` | `<Trip />` | ✅ Yes (conditional render) |
| `*` | `<Error />` | No |

- **Layout:** `<BrowserRouter>` > `<Header />` + `<Routes>` + `<Footer />` + `<ScrollToTop />`
- **ScrollToTop:** Auto-scrolls to top on route change; scrolls to hash element (e.g. `/#how-it-works`, `/#faq`) if present
- **Toaster:** Global `<Toaster />` in main.jsx, replaces old `<ToastContainer>`

### `src/index.css` — Global Styles (Tailwind v4)
- `@import "tailwindcss"` — v4 syntax (no directives)
- CSS custom properties for light and `.dark` themes: background, foreground, card, primary, secondary, accent, destructive, muted, etc.
- `@theme inline` block maps CSS vars to Tailwind theme
- `--font-sans` set to `'Inter Tight'` only (no fallback stack); body applies `font-sans` via `@apply`
- Float animation keyframes for Hero icons (7 variants)
- Enter/exit animation keyframes + utilities for page transitions

---

## 7. State Management (Redux Toolkit)

### `src/store/store.js`
```js
configureStore({ reducer: { user: UserSlice, trip: TripSlice } })
```

### `src/store/slices/UserSlice.js`

**Async Thunk — `UserRegister`:**
- Fetches `https://www.googleapis.com/oauth2/v1/userinfo?access_token${token}`
- ⚠️ **BUG:** Missing `=` in query param — should be `?access_token=${userInfo?.access_token}`
- ⚠️ **BUG:** Error handler: `error.response.message` should be `error.response?.data?.error?.message` or `error.message`

**Reducers:**
| Action | Behavior |
|---|---|
| `setUser` | Sets `state.user = null` (logout) |
| `getUser` | Re-reads user from localStorage |

**Extra Reducers:**
- `UserRegister.fulfilled`: saves user to localStorage + state (if status 200); preserves `memberSince` from existing localStorage data or sets to current date on first login

### `src/store/slices/TripSlice.js`

**Async Thunks:**

| Thunk | Method | Endpoint | Purpose |
|---|---|---|---|
| `TripCreateThunk` | POST | `/trip/generate` | Generate trip via AI + save |
| `FetchTripThunk` | GET | `/trip/fetch-trip/${email}` | Fetch all user trips |
| `GetTripById` | GET | `/trip/fetch-one-trip/${id}` | Fetch single trip |
| `DeleteTripThunk` | DELETE | `/trip/delete/${id}` | Delete a trip |

- ⚠️ **BUG:** `goToTrip` is exported from slice (line 108) but never defined as a reducer — causes runtime error if accessed
- ⚠️ **BUG:** `TripCreateThunk` now calls `/trip/generate` (server-side AI), not `/trip/create` — the name is misleading
- API base URL `http://localhost:8000` is hardcoded in every thunk

---

## 8. Pages / Route Components

### `src/create-trip/index.jsx` — Trip Creation Form
- **Step-based form** with visual progress bar (`StepBar` component)
- **Steps:** Destination → Duration → Budget → Travelers
- **Each step** is progressive (locked until previous is completed)
- **Destination:** `TomTomAutocomplete` component
- **Duration:** 1–7 day selectors
- **Budget:** `PillOption` cards (Cheap/Moderate/Luxury) with lucide icons
- **Travelers:** `PillOption` cards (Just Me/Couple/Family/Friends) with lucide icons
- **Generate:** Builds AI prompt → dispatches `TripCreateThunk` (server-side generation)
- **Auth:** Opens Modal (custom wrapper) Google login dialog if user not logged in
- **On success:** Redirects to `/trip/${trip._id}` via Redux state change
- **Form disabled during generation:** `pointer-events-none opacity-50` when `loading` is true
- **Clean, modern UI:** Uses CSS variables throughout, no hardcoded Tailwind colors
- **Generate button:** Right-aligned via `flex flex-col items-end`

### `src/trip/index.jsx` — Single Trip View
- Fetches trip by ID on mount via `GetTripById`
- **Hero image:** Fetches from Pexels API based on trip location
- **Sections:** Share info bar → Hotel Recommendations → Itinerary
- **Styled-components** for layout + inline Tailwind for the empty state
- **Shimmer loading** for hero image
- Handles empty itinerary/hotels state gracefully
- **Back button:** Navigates to `/user` (works from shared links); uses lucide `ArrowLeft`; aligned with hero/content width via max-width wrapper

### `src/user/index.jsx` — User Dashboard
- **Layout:** Left sidebar (profile card + stats) + Right grid (trip cards)
- Profile sidebar: Avatar (with initials fallback), name, email, trip count, "Member since" (dynamic year from localStorage `memberSince`), "Plan a new trip" CTA
- Trips grid: Responsive 1/2/3 column layout with `UserTrip` cards
- Empty state with CTA to create first trip (`mt-6` spacing)
- Fetches trips on mount via `FetchTripThunk(user.email)`
- **Delete confirmation:** Uses Modal component (not browser `confirm()`) with trash icon, "Yes, delete it" / "Cancel" buttons

### `src/error/index.jsx` — 404 Error Page
- SVG illustration + "Uh-oh!" heading
- Uses inline SVG (large, ~2000+ chars of path data)

---

## 9. Custom Components

| Component | File | Props | Description |
|---|---|---|---|
| **Header** | `components/custom/Header.jsx` | — | Sticky nav with logo, login/logout, user avatar, **responsive hamburger menu** (`<sm`) |
| **Hero** | `components/custom/Hero.jsx` | — | Landing page with floating SVG icons (hidden on mobile) + CTA + responsive image |
| **Process** | `components/custom/Process.jsx` | — | "How It Works" 4-step section with connector line, CTA strip |
| **Faq** | `components/custom/Faq.jsx` | — | Accordion FAQ with lucide icons per item |
| **Footer** | `components/custom/Footer.jsx` | — | Full footer: brand logo, tagline, contact, Product/Support/Legal nav columns, vertical gradient wordmark "TRUVELER" |
| **ScrollToTop** | `components/custom/ScrollToTop.jsx` | — | Floating scroll-to-top button (appears after 400px) + auto-scroll on route change + hash-element scroll |
| **PlanCard** | `components/custom/PlanCard.jsx` | `place` | Place card with image + details + Google Maps link |
| **Hotel** | `components/custom/Hotel.jsx` | `trip` | 3-column grid of HotelCards or empty state |
| **HotelCard** | `components/custom/HotelCard.jsx` | `hotel` | Hotel image + name + address + price + rating |
| **Itinerary** | `components/custom/Itinerary.jsx` | `plan`, `day` | Day section with 2-col grid of PlanCards |
| **Share** | `components/custom/Share.jsx` | `choice` | Trip metadata + DropdownMenu with WhatsApp/Facebook share |
| **UserTrip** | `components/custom/UserTrip.jsx` | `trip` | Trip thumbnail with image, delete button (opens Modal confirmation), hover effects |
| **TomTomAutocomplete** | `components/custom/TomTomAutocomplete.jsx` | `onChange`, `placeholder` | Destination search via TomTom API |

### Component Highlights

**Header — Auth Flow:**
- Unauthenticated: "Login" button → opens Dialog → Google OAuth
- Authenticated: "Create Trip" + "Logout" + user avatar (links to `/user`)
- Logout: clears localStorage, dispatches `setEmptyTrip` + `setUser`

**PlanCard & HotelCard — Pexels Images:**
- Both fetch images from Pexels API on mount based on place/hotel name
- Shimmer loading while image loads
- Link to Google Maps search for the location

**Share — Social Sharing:**
- Uses `react-share` (`WhatsappShareButton`, `FacebookShareButton`)
- Share URL is `window.location.href`
- Wrapped in shadcn `DropdownMenu` for clean UI

**TomTomAutocomplete:**
- Debounced search (300ms) with min 2 characters
- Displays suggestions dropdown with address info
- Handles click-away to close
- Clear button for selected values

---

## 10. UI Components (shadcn/ui)

| Component | File | Radix Primitive | Variants |
|---|---|---|---|
| **Button** | `components/ui/button.jsx` | `@radix-ui/react-slot` | default, destructive, outline, secondary, ghost, link; sizes: sm, default, lg, icon; `cursor-pointer` on base variant |
| **Card** | `components/ui/card.jsx` | — | Compound: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Dialog** | `components/ui/dialog.jsx` | `@radix-ui/react-dialog` | Full set (Trigger, Portal, Overlay, Content, etc.) |
| **DropdownMenu** | `components/ui/dropdown-menu.jsx` | `@radix-ui/react-dropdown-menu` | Full set with sub-menus, items, separators |
| **Input** | `components/ui/input.jsx` | — | Standard input via forwardRef |
| **Accordion** | `components/ui/accordion.jsx` | `@radix-ui/react-accordion` | Used in Faq section |
| **Modal** | `components/ui/modal.jsx` | Wraps Dialog compound | Custom wrapper: accepts `open`, `onOpenChange`, `title`, `description`, `icon`, `children`, `className` — no need to import Dialog/Content/Header/etc. separately |

All use `cn()` utility (clsx + tailwind-merge) for class merging.
- **Modal** wraps shadcn Dialog + DialogContent + DialogHeader + DialogTitle + DialogDescription into a single import

---

## 11. AI Integration

### Current Architecture (Server-Side)
AI generation was **moved from client to server**. The old `aiHandler/Aimodal.jsx` is deprecated (contains only a comment).

**Flow:**
1. Client builds prompt from `AIPrompt` template in `assets.js`
2. Dispatches `TripCreateThunk` → `POST /trip/generate`
3. Server calls **OpenRouter API** with model `google/gemma-4-31b-it:free`
4. Server strips markdown code fences, parses JSON
5. Saves to MongoDB, returns created trip

**AI Prompt Template** (`client/src/assets/assets.js`):
```
Generate Travel plan for Location: {location}, for {days} days for {people}
with a {budget} budget, Give me a Hotels options list with Hotel name,
Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions
and suggest itinerary with placeName, Place Details, place details must be
small in 10 to 20 words, Place Image Url, Geo Coordinates, ticket Pricing,
Time to travel each of the location in time format (ex. 20-30 minutes)
for {days} days with each day plan with best time in 12 hours format to
visit in JSON format
```

### Server-Side AI Endpoint (`generateTrip`)
- Model: `google/gemma-4-31b-it:free` via OpenRouter
- System instruction enforces exact JSON schema matching frontend's expected keys (hotels, itinerary, etc.)
- Client-side prompt in `assets.js` also includes the exact JSON schema template
- Cleans response: removes ```json and ``` fences
- Friendly error messages for 429, 401/403, 5xx responses

### `server/test-openrouter.js` — Standalone Test
- Tests OpenRouter SDK with streaming
- Uses `@openrouter/sdk` package (v0.13.7)
- Model: `google/gemma-4-31b-it:free`

---

## 12. Constants & Options

### `travelOptions` (4 items)

| ID | Title | Description | People |
|---|---|---|---|
| 1 | Just Me | A sole travels in exploration | 1 person |
| 2 | A Couple | Two travels in tandem | 2 people |
| 3 | Family | A group of fun loving adventure | 3 to 5 people |
| 4 | Friends | A bunch of thrill-seekers | more than 5 people |

### `budgetOptions` (3 items)

| ID | Title | Description |
|---|---|---|
| 1 | Cheap | Stay conscious of costs |
| 2 | Moderate | Keep cost on the average side |
| 3 | Luxury | Don't worry about cost |

---

## 13. Data Flow

```
User fills CreateTrip form (step-based)
        │
        ▼
TomTomAutocomplete (destination search)
+ Duration (1-7 days)
+ Budget selection (PillOption)
+ Traveler selection (PillOption)
        │
        ▼
Build prompt from AIPrompt template
        │
        ▼
Dispatch TripCreateThunk → POST /trip/generate
        │
        ▼
Server calls OpenRouter API (google/gemma-4-31b-it:free)
        │
        ▼
Server strips markdown, parses JSON
        │
        ▼
MongoDB saves { trip, choice, email }
        │
        ▼
Redirect to /trip/:id (via Redux state change)
        │
        ▼
Dispatch GetTripById → GET /trip/fetch-one-trip/:id
        │
        ▼
Fetch hero image from Pexels API (Trip page)
        │
        ▼
Render: Hero image → Share info → Hotels (grid) → Itinerary (per day)
```

### Authentication Flow
```
User clicks Login (Header or CreateTrip dialog)
        │
        ▼
Google OAuth popup → onSuccess → get access_token
        │
        ▼
Dispatch UserRegister → GET googleapis.com/oauth2/v1/userinfo?access_token=...
        │                          ⚠️ BUG: missing = in query param
        ▼
Save user data to localStorage + Redux state (with `memberSince` timestamp)
│
▼
Protected routes (/user, /trip/:id) become accessible
```

---

## 14. API Integrations Summary

| API | Purpose | Key Used | Endpoint / SDK |
|---|---|---|---|
| Google OAuth | User authentication | `VITE_GOOGLE_AUTH_CLIENT_ID` | `googleapis.com/oauth2/v1/userinfo` |
| TomTom Search | Destination autocomplete | `VITE_TOMTOM_PLACE_API` | `api.tomtom.com/search/2/search` |
| OpenRouter | AI trip generation | `OPENROUTER_API_KEY` (server) | `openrouter.ai/api/v1/chat/completions` |
| Pexels | Place/hotel/user trip images | `VITE_PEXELS_API_KEY` | `api.pexels.com/v1/search` |
| Backend (Express) | Trip CRUD + AI generation | — | `http://localhost:8000/trip/*` |

---

## 15. Styling Architecture

Three CSS approaches used **simultaneously**:

### 1. Tailwind CSS v4 (primary)
- `@import "tailwindcss"` — no config file needed
- Custom theme via `@theme inline` block in `index.css`
- CSS variables for full theme support (light + dark)
- Dark mode via `.dark` class

### 2. Styled-Components
- File: `src/css-sheets/css-styles.js` (732 lines)
- Components: HeaderWrapper, CreateTripWrapper, TripWrapper, UserWrapper, ShareWrapper, HotelWrapper, VisitWrapper
- Responsive media queries, shimmer animations, hover effects
- Also used in-locally in `trip/index.jsx`, `PlanCard.jsx`, `HotelCard.jsx`, `Itinerary.jsx`, `Share.jsx`

### 3. shadcn/ui
- Pre-built components using Radix UI + Tailwind classes
- Themed via CSS variables in `index.css`

### Layout Convention
- All sections use `max-w-6xl mx-auto px-6` for pixel-identical horizontal alignment
- All `var(--xxx)` in className strings replaced with Tailwind utilities (`bg-muted`, `text-foreground`, `border-border`, etc.)
- CSS variables used only in `index.css` @theme block and styled-components, not inline in JSX

### Observation
- **Mixed styling** — Some pages use styled-components wrappers (`TripWrapper`), others use pure Tailwind (`CreateTrip`, `Userpage`), and some use both (Header uses styled-components definition in css-styles.js but not actually applied anymore — actual Header uses Tailwind classes directly)
- **Dead styled-components** — `css-styles.js` has `HeaderWrapper`, `VisitWrapper`, `TripWrapper`, `HeroWrapper` etc. but many components no longer import them

---

## 16. Build & Dev Tooling

| Command | Location | Description |
|---|---|---|
| `npm run dev` | `client/` | Vite dev server (HMR) |
| `npm run build` | `client/` | Vite production build → `dist/` |
| `npm run preview` | `client/` | Vite preview of built app |
| `npm run lint` | `client/` | ESLint flat config |
| `npm run dev` | `server/` | nodemon auto-restart (server.js) |
| `npm start` | `server/` | node server.js (production) |

---

## 17. ⚠️ Critical Issues & Observations

### Security
1. **API keys are committed** — `client/.env` and `server/.env` contain real, working API keys (Google OAuth, TomTom, Pexels, MongoDB Atlas, OpenRouter). Critical security risk for production.
2. **No auth middleware** on Express server — any client can call all `/trip/*` endpoints without authentication (anyone can read/create/delete any user's trips by guessing email or ID).
3. **CORS wide open** — `app.use(cors())` with no origin restrictions.
4. **MongoDB credentials exposed** — Atlas connection string contains username/password in plaintext.

### Bugs
5. **UserSlice.js:10** — Missing `=` in query parameter: `?access_token${token}` should be `?access_token=${token}`. Google OAuth token is never actually sent properly.
6. **UserSlice.js:20** — `error.response.message` should be `error.response?.data?.error?.message` or `error.message`.
7. _(fixed)_ — `goToTrip` export removed from TripSlice (was never defined as a reducer).
8. **TripSlice.js:8** — `TripCreateThunk` calls `/trip/generate` (server-side AI), but the name implies it's just creating a trip. Misleading.
9. **trip.model.js** — Uses `require: true` instead of Mongoose-standard `required: true` (both work but inconsistent).

### Code Quality
10. **Mixed styling frameworks** — Tailwind v4 + Styled-Components used simultaneously; many styled-components in `css-styles.js` are no longer used by components.
11. **Unused component** — `Auth.jsx` is a standalone auth page not referenced anywhere.
12. **Unused dependency** — `@google/genai` in server `package.json` and `GEMINI_API_KEY` in `.env` are never used.
13. **Hardcoded API URL** — `http://localhost:8000` hardcoded in all `TripSlice.js` thunks. Should be in environment variable.
14. _(removed)_ — `Aimodal.jsx` deprecated file removed from codebase.
15. _(fixed)_ — Empty `useEffect` removed from Header.jsx.
16. _(fixed)_ — `goToTrip` undefined export removed from TripSlice.
17. _(fixed)_ — Server `fetchAllTrip` returns 200 with empty array instead of 400 error.
18. _(fixed)_ — Delete trip uses reducer filter (direct UI removal) instead of refetch.
19. _(fixed)_ — `react-toastify` replaced with `react-hot-toast` (smaller bundle, CSS-variable theming).
20. _(fixed)_ — All buttons unified to shadcn Button variants; `cursor-pointer` added at base level.
21. _(fixed)_ — All `var(--xxx)` in className strings replaced with Tailwind utilities.
22. _(fixed)_ — `--font-sans` simplified to `'Inter Tight'` only (no fallbacks).

### Architecture
16. **No error boundaries** — Components lack fallback UIs for API failures beyond toast notifications.
17. **Pexels image loading** — Every card (PlanCard, HotelCard, UserTrip, Trip) makes a separate Pexels API call on mount. No caching or deduplication. Rate limits will be hit quickly.
18. **No loading states for pages** — Userpage and CreateTrip have no skeleton loading states (only a spinner during generation).
19. **Inline SVG bloat** — `error/index.jsx` contains ~2000+ characters of inline SVG path data. Should be an imported SVG file.
20. **CSS variable duplication** — `index.css` has identical shadow/radius/font definitions repeated in both `:root` and `.dark` blocks.
21. _(fixed)_ — `Process.jsx` and `Faq.jsx` sections created for the home page.
22. _(fixed)_ — `Footer.jsx` rewritten with full structure (brand, nav columns, wordmark).
23. _(fixed)_ — `ScrollToTop.jsx` handles both auto-scroll on route change and hash-element scroll.
24. _(fixed)_ — Responsive navbar: mobile hamburger (<sm) + desktop inline row.
25. _(fixed)_ — Hero section floating icons hidden on mobile.
26. _(new)_ — API base URL `http://localhost:8000` still hardcoded; should use env variable.
27. _(new)_ — No `memberSince` field in MongoDB — stored only in localStorage; lost on logout.

### Maintainability
28. **Prompt is client-side only** — AI prompt template in `assets.js` is sent to server via `POST /trip/generate`, so it can be modified by users. Mitigated by server-side system prompt enforcing the same JSON schema.
29. **No TypeScript** — Entire project is `.jsx`/`.js` with no type safety despite having `@types/react` installed.
30. **No tests** — Zero test files, test scripts, or test framework configured.
31. _(fixed)_ — AI prompt and server system prompt both enforce same JSON schema for consistent AI responses.
32. _(fixed)_ — Process/Faq/Footer sections created, no longer placeholder.
33. _(new)_ — Modal component centralizes shadcn Dialog usage — future modals import one instead of 5+ dialog sub-components.
