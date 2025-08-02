# Taskly
A modern subscription-based To‑Do management app built with Next.js, Prisma, and Clerk.

---

## Overview
Taskly is a sleek and intuitive To‑Do management web app that helps users stay organized and productive.
It offers core task management features (create, update, delete, and search tasks) and premium features for subscribed users — enabling an enhanced productivity experience.

--- 

## Features
- User Authentication – Secure login & signup using Clerk

- Task Management – Add, edit, delete, and search To‑Dos

- Pagination & Search – Quickly navigate through large task lists

- Subscription System – Unlock unlimited To‑Dos with a simple subscription

- Webhook Integration – Auto-sync Clerk users with the database

- Responsive & Accessible UI – Styled with DaisyUI + Tailwind CSS

- Modern Components – Built with Shadcn UI for consistent design

## Tech Stack

### Frontend:

Next.js 14 (App Router)

Tailwind CSS + DaisyUI (UI styling & themes)

Shadcn UI (components)

### Backend:

Prisma (ORM)

Clerk (Authentication & Webhooks)

Next.js API Routes

### Other Tools:

Svix for verifying Clerk Webhooks

TypeScript for type safety

## Getting Started & Installation

### Clone the repository:
```bash
git clone https://github.com/Ishita-01/Taskly.git
cd taskly
```

### Install dependencies:
```bash
npm install
```

### Set up environment variables in .env:
```bash
DATABASE_URL="your_database_url"
CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```


### Run Prisma migrations:
```bash
npx prisma migrate dev
```

### Start the development server:
```bash
npm run dev
```
