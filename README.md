# SmartAgri. – Smart Agriculture Management System

> **A little smarter. A whole lot greener.**  
> A modern, end-to-end digital agriculture management platform designed to empower farmers, agronomists, and agricultural administrators with real-time farm tracking, crop lifecycle monitoring, mandi market intelligence, and enterprise-grade administrative oversight.

---

## Table of Contents

- [1. Product Overview (Non-Technical Documentation)](#1-product-overview-non-technical-documentation)
  - [1.1 Purpose & Problem Statement](#11-purpose--problem-statement)
  - [1.2 Target Personas](#12-target-personas)
  - [1.3 Key Modules & Capabilities](#13-key-modules--capabilities)
  - [1.4 Security & Access Control](#14-security--access-control)
- [2. System Architecture & Technical Specifications](#2-system-architecture--technical-specifications)
  - [2.1 Technology Stack](#21-technology-stack)
  - [2.2 Directory Structure](#22-directory-structure)
  - [2.3 Design System & Theme Specification](#23-design-system--theme-specification)
  - [2.4 State Management & Data Flow](#24-state-management--data-flow)
  - [2.5 Core Data Models & Schema](#25-core-data-models--schema)
- [3. Local Development & Installation](#3-local-development--installation)
  - [3.1 Prerequisites](#31-prerequisites)
  - [3.2 Quick Start Guide](#32-quick-start-guide)
  - [3.3 Available NPM Scripts](#33-available-npm-scripts)
  - [3.4 Environment Variables](#34-environment-variables)
- [4. Deployment Guide](#4-deployment-guide)
  - [4.1 Building for Production](#41-building-for-production)
  - [4.2 Static Hosting (Vercel, Netlify, Cloudflare Pages)](#42-static-hosting-vercel-netlify-cloudflare-pages)
  - [4.3 Containerized / Cloud Run Deployment](#43-containerized--cloud-run-deployment)
- [5. Troubleshooting & FAQ](#5-troubleshooting--faq)
- [6. License & Authorship](#6-license--authorship)

---

## 1. Product Overview (Non-Technical Documentation)

### 1.1 Purpose & Problem Statement
Traditional agricultural operations often rely on fragmented record-keeping, delayed price discoveries, and uncoordinated crop management practices. **SmartAgri.** addresses this challenge by providing an unified, intuitive web platform where agricultural stakeholders can monitor active acreage, schedule harvests, track market prices, and access centralized operational reports from any device.

### 1.2 Target Personas
1. **Independent & Smallholder Farmers**: Require an accessible interface to document crop stages, manage parcel boundaries, check weather conditions, and review daily commodity prices across regional mandis.
2. **Farm Estate Managers & Commercial Growers**: Need multi-farm aggregation, acreage utilization analytics, harvest planning schedules, and CSV report export capabilities for compliance and accounting.
3. **Agricultural Platform Administrators**: Monitor system-wide farmer adoption, crop distribution trends, soil analysis report filings, weather forecasts, and operational activity feeds.

---

### 1.3 Key Modules & Capabilities

#### A. Public Landing Page
- **Hero Showcase**: High-impact agricultural visual banner, clear value propositions, and direct "Get Started" and "Explore Features" paths.
- **Problem & Solution Breakdown**: Comparison between manual, fragmented farming workflows and SmartAgri's unified digital platform.
- **Feature Highlights**: Interactive showcase of farm boundaries, crop milestones, weather forecasting, and market intelligence.
- **Farmer Testimonials**: Real-world operational feedback from practicing growers.
- **Interactive FAQ Accordion**: Common questions addressing data ownership, offline records, and role permissions.
- **Integrated Footer**: Fast navigation links, legal policy links, and newsletter subscription form.

#### B. Farmer Workspace
- **Dashboard**:
  - Summary KPI cards: Total Farms, Active Crops, Expected Yield, and Soil Health.
  - Quick action shortcuts to register new farms and plant new crops.
  - Recent farm activity feed and seasonal weather overview widget.
  - Crop status progress cards with stage indicators (Vegetative, Flowering, Ripening, Harvested).
- **My Farm Management**:
  - Detailed card view of registered parcels with acreage, soil type, primary crop, and status.
  - Interactive "Add Farm" modal with field validation and immediate state reflection.
  - Detailed inspection view showing coordinates, irrigation infrastructure, and active plantings.
- **Crop Management**:
  - Real-time catalog of crops categorized by status (Planted, Growing, Harvested).
  - Planting date, expected harvest date, cultivated acreage, and health status tracking.
  - "Add Crop" workflow with automatic farm parcel linkage.
- **Market Information**:
  - Live mandi commodity pricing (Rice, Wheat, Maize, Cotton, Tomato, Groundnut).
  - Real-time price per quintal, daily percentage change, variety details, and market location.
- **Weather Information**:
  - Micro-climate weather monitoring (East Godavari and regional agricultural hubs).
  - Temperature, humidity percentage, wind speed, precipitation probability, and 5-day outlook.
- **Reports & Downloads**:
  - Downloadable CSV reports for Farm Overview, Crop Summary, Market Price History, Harvest Schedules, and Soil Amendments.
- **Notifications & Alerts**:
  - In-app notification center categorized by Unread and Read items.
  - Harvest window alerts, pest risk warnings, and government subsidy advisories.
- **Profile & Preferences**:
  - Farmer profile management (Full Name, Contact Number, Email, Community affiliation).
  - Granular notification toggles for Market Updates, Harvest Reminders, and Report Digests.

#### C. Enterprise Admin Dashboard
- **Executive Metric Cards**: Total Platform Users, Registered Farmers, Total Monitored Crops, and Submitted Soil Reports with period-over-period percentage changes.
- **User Growth Overview**: Visual SVG trend chart tracking farmer onboarding velocity over 4-week intervals.
- **Crop Distribution Breakdown**: Donut chart visualizer displaying crop portfolio allocation (Rice 35%, Wheat 30%, Maize 20%, Others 15%).
- **Recent Platform Activities**: Live event audit trail recording new user registrations, crop filings, and laboratory soil reports.
- **Regional Weather Snapshot**: Micro-weather telemetries for monitoring agricultural clusters.
- **Dedicated Administrative Subsections**: Dedicated views for Users management, Farmer directory, Crops oversight, Soil Reports, Weather Data, Analytics, and Platform Settings.

---

### 1.4 Security & Access Control

- **Strict Role Separation**: Dedicated workspaces for `Farmer` and `Admin`. Farmers access the operational workspace, while Admins operate the administrative command center.
- **Strong Password Verification (Live 5-Criteria Checklist)**:
  - Minimum 8 characters
  - At least one uppercase letter (`A-Z`)
  - At least one lowercase letter (`a-z`)
  - At least one numeric digit (`0-9`)
  - At least one special symbol (`!@#$%^&*`)
- **Real-Time Visual Password Strength Meter**: Dynamic indicator with reactive color feedback (`Weak` -> `Moderate` -> `Strong & Verified`).
- **Cryptographic High-Entropy Password Generator**: "Suggest Strong Password" button generates a 14-character secure password satisfying all criteria, fills both password and confirm password fields, and reveals the text.
- **Secure Modals**:
  - Centered post-registration and login confirmation notices.
  - Centered logout modal requiring user confirmation before terminating an active session and safely returning to the landing page.

---

## 2. System Architecture & Technical Specifications

### 2.1 Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime / Library** | React | `^19.0.1` | Core UI component hierarchy |
| **Language** | TypeScript | `^7.0.2` | Static type safety and strict schema enforcement |
| **Build Tool & Bundler** | Vite | `^8.3.0` | Ultra-fast HMR and optimized production bundling |
| **Styling Engine** | Tailwind CSS | `^4.3.3` | Utility-first CSS framework with native `@import "tailwindcss";` |
| **Iconography** | Lucide React | `^0.546.0` | Crisp, accessible SVG agricultural & UI icon set |
| **Animation Engine** | Motion | `^12.23.24` | Micro-interactions and smooth layout transitions |
| **Server Runtime** | Node.js / Express | `^4.21.2` | Serving static assets and server-side production routes |

---

### 2.2 Directory Structure

```text
smartagri/
├── public/
│   ├── assets/               # Agricultural photography and hero visual assets
│   └── favicon.ico           # Application brand icon
├── src/
│   ├── components/
│   │   ├── admin/            # Enterprise Admin dashboard and subpages
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminSubpages.tsx
│   │   │   └── AdminTopbar.tsx
│   │   ├── auth/             # Authentication modals and password verification
│   │   │   └── AuthModal.tsx
│   │   ├── common/           # Shared UI primitives
│   │   │   ├── CenteredNotificationModal.tsx
│   │   │   ├── CropIcon.tsx
│   │   │   ├── LogoutConfirmModal.tsx
│   │   │   └── Toast.tsx
│   │   ├── crops/            # Crop management views and modals
│   │   │   ├── AddCropModal.tsx
│   │   │   └── CropManagementPage.tsx
│   │   ├── dashboard/        # Farmer Dashboard view and custom illustrations
│   │   │   ├── AgriculturalIllustration.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── farms/            # Farm parcels management views and modals
│   │   │   ├── AddFarmModal.tsx
│   │   │   ├── FarmDetailModal.tsx
│   │   │   └── MyFarmPage.tsx
│   │   ├── landing/          # Public landing page sections
│   │   │   ├── FAQSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LandingFooter.tsx
│   │   │   ├── LandingNavbar.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   ├── layout/           # Farmer shared layout
│   │   │   ├── FarmerLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── market/           # Mandi price feeds and market intelligence
│   │   │   └── MarketInformationPage.tsx
│   │   ├── notifications/    # Notification list and filtering
│   │   │   └── NotificationsPage.tsx
│   │   ├── profile/          # Farmer profile management
│   │   │   └── ProfilePage.tsx
│   │   ├── reports/          # Report cards and CSV generation
│   │   │   └── ReportsPage.tsx
│   │   ├── settings/         # Notification preferences
│   │   │   └── SettingsPage.tsx
│   │   └── weather/          # Micro-climate weather monitoring
│   │       └── WeatherInformationPage.tsx
│   ├── context/
│   │   └── AppContext.tsx     # Global reactive state, local persistence & business logic
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces, contracts, and type definitions
│   ├── App.tsx               # Root routing controller & layout orchestrator
│   ├── index.css             # Tailwind v4 entry point & custom font configuration
│   └── main.tsx              # React 19 application bootstrapping
├── .env.example              # Sample environment variable template
├── index.html                # HTML5 entry template with SEO metadata
├── package.json              # NPM dependencies and build scripts
├── tsconfig.json             # TypeScript compiler settings
└── vite.config.ts            # Vite bundler plugins and server options
```

---

### 2.3 Design System & Theme Specification

The application follows an agricultural green design system:

| Token Name | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Primary Brand Green** | `#17683D` | Primary action buttons, primary branding, navigation accents |
| **Dark Forest Green** | `#125532` | Sidebar background, dark button hover states |
| **Active Nav Tint** | `#DDEAD0` | Active navigation pill background |
| **Active Nav Text** | `#1E5633` | Active navigation item typography |
| **Canvas Background** | `#F6F9F6` | Main application workspace canvas |
| **Surface Card** | `#FFFFFF` | Card containers, modals, table surfaces |
| **Primary Text** | `#172B24` | Primary headers, card titles, prominent figures |
| **Muted Text** | `#829187` | Breadcrumbs, metadata, timestamps, input placeholders |
| **Border Neutral** | `#E3EAE1` | Card outlines, dividers, structural borders |
| **Status Alert** | `#D9534F` | Destructive actions, weak password indicator |
| **Status Warning** | `#F59E0B` | Moderate password indicator, harvesting alerts |
| **Status Success** | `#15B064` | Verified status badges, strong password indicators |

---

### 2.4 State Management & Data Flow

- **Single Source of Truth (`AppContext`)**: Core application entities (Farms, Crops, Market Items, Reports, Notifications, User Profiles, Registered Accounts) are managed within a unified React Context.
- **Client-Side Persistence**: State automatically synchronizes with browser `localStorage` (`smartagri_farms`, `smartagri_crops`, `smartagri_notifications`, `smartagri_profile`, `smartagri_accounts`).
- **Role Isolation Safeguard**: Login state and account profiles are strictly partitioned to ensure Farmer sessions never inherit Admin labels, and Admin sessions never downgrade to Farmer workspaces.
- **Toast & Notification Queue**: Non-blocking toast notifications appear at bottom-right with auto-dismiss timers (3.5 seconds).

---

### 2.5 Core Data Models & Schema

#### Farm Parcel Model
```typescript
interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  areaUnit: 'Acres' | 'Hectares';
  primaryCrop: string;
  soilType: 'Alluvial' | 'Black' | 'Red' | 'Clay Loam' | 'Sandy Loam';
  status: 'Active' | 'Fallow' | 'Preparation';
  coordinates?: string;
  waterSource?: string;
}
```

#### Crop Milestone Model
```typescript
interface Crop {
  id: string;
  name: string;
  farmId: string;
  farmName: string;
  status: 'Planted' | 'Growing' | 'Harvested';
  plantedDate: string;
  harvestDate: string;
  cultivatedArea: string;
  healthStatus: 'Excellent' | 'Good' | 'Attention Needed';
  stage: string;
  notes?: string;
}
```

#### Mandi Market Item Model
```typescript
interface MarketItem {
  id: string;
  crop: string;
  market: string;
  pricePerQuintal: number;
  change: number;
  changeType: 'up' | 'down' | 'steady';
  updated: string;
  variety: string;
}
```

---

## 3. Local Development & Installation

### 3.1 Prerequisites

Before setting up the project locally, ensure you have the following installed:
- **Node.js**: `v18.18.0` or higher (Node `v20.x` or `v22.x` recommended)
- **NPM**: `v9.0.0` or higher (bundled with Node.js)
- **Git**: For repository version control

Check your current installed versions:
```bash
node -v
npm -v
git --version
```

---

### 3.2 Quick Start Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smartagri.git
   cd smartagri
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment settings**:
   Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```
   *(Optional variables such as `PORT` or external API endpoints can be configured inside `.env`)*

4. **Launch the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

### 3.3 Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server on port `3000` with hot-module reloading. |
| `npm run build` | Compiles TypeScript and runs Vite production bundling into the `dist/` directory. |
| `npm run preview` | Spins up a local static server to preview the built `dist/` production assets. |
| `npm run lint` | Runs `tsc --noEmit` to validate strict TypeScript type-checking across the codebase. |
| `npm run clean` | Deletes the `dist/` build artifacts directory. |

---

### 3.4 Environment Variables

| Variable | Description | Required | Default |
| :--- | :--- | :--- | :--- |
| `PORT` | Local server port for dev and preview servers | No | `3000` |
| `APP_URL` | Canonical hosting URL for self-referential links | No | `http://localhost:3000` |

---

## 4. Deployment Guide

### 4.1 Building for Production

To create an optimized production build:
```bash
npm run build
```
This command compiles and tree-shakes all TypeScript and CSS assets, outputting a static bundle into the `dist/` folder.

To test the build locally before deploying:
```bash
npm run preview
```

---

### 4.2 Static Hosting (Vercel, Netlify, Cloudflare Pages)

#### Deploying to Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Set the Framework Preset to **Vite**.
4. Configure Build and Output settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

#### Single Page Application (SPA) Routing Note
Since SmartAgri is a Single Page Application using client-side routing, ensure all requests route to `index.html`. For Vercel, a `vercel.json` file can be added if custom server rewrites are needed:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### 4.3 Containerized / Cloud Run Deployment

To run SmartAgri inside a lightweight container:

**Dockerfile example**:
```dockerfile
# Step 1: Build the client assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve using Node.js or Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 5. Troubleshooting & FAQ

#### Q: Port 3000 is already in use. How do I change the port?
You can start the dev server on a different port by passing the `--port` flag:
```bash
npx vite --port 3001
```

#### Q: How do I switch between the Farmer Workspace and Admin Dashboard?
To switch roles:
1. Click the **Logout** button in the sidebar or top-right profile dropdown.
2. Confirm the logout in the centered confirmation modal.
3. On the landing page, click **Sign In**.
4. Select your desired role tab (**🌾 Farmer** or **🛡️ Admin**), enter your credentials, and click **Sign In**.

#### Q: Why are my newly added farms or crops retained after page refresh?
The application implements persistent storage via browser `localStorage`. To reset to the pristine initial state, open DevTools (`F12`), navigate to **Application > Local Storage**, and click **Clear Storage**.

#### Q: Does the application require an active internet connection?
All core farm management, crop records, reporting, and interface navigation functions run entirely client-side. Live weather and commodity feeds use robust local data caching when offline.

---

## 6. License & Authorship

Distributed under the **MIT License**. See `LICENSE` for details.

Developed with agricultural care for modern growers, cooperatives, and agribusinesses worldwide.
