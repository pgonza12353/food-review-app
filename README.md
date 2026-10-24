# Food Reviewing App
A full-stack web application that allows users to rate and review restaurants, providing a platform to track food experiences.

**Live Demo**: [food-review-app](https://food-review-app-woad.vercel.app)

## Tech Stack
- Frontend: Next.js + React + Tailwind CSS
- Backend: Next.js API routes (Node.js)
- Database: PostgreSQL
- Schema: Prisma
- Hosting: Vercel (frontend) + Supabase (backend DB)
- Version Control: Git + GitHub

## Demo (with demo user)
### Home (demo user + reviews)
![Home](./media/home.png)

### Home (empty review submission form)
![Review](./media/review.png)

### Add Review Flow
![Add Review](./media/add_review.gif)

## Current Progress
- Prisma models and database schema are complete
- Implemented CRUD APIs for restaurants and reviews (the UI covers create and read)
- UI pages for submitting restaurants and reviews are built
- Data is stored and retrieved successfully from Postgres

## Known Limitations
- No authentication: users are hardcoded, and the API routes have no access control
- No filtering, sorting, search, or pagination

## Clone the repo
```bash
git clone https://github.com/pgonza12353/food-review-app
cd food-review-app
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

### IMPORTANT
Don't commit your real .env file 
Make sure .env is in .gitignore

### Environment variables
```bash
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
SUPABASE_URL="your_supabase_url_here"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key_here"
```

### Project Structure
```bash
/app
    /api
        /restaurants
        /reviews
    /components
        NavBar.tsx
    /context
        UserContext.tsx
    /lib
        prisma.ts
        supabaseClient.ts
    /restaurants
    /reviews
/prisma
    schema.prisma
```

### Deployment (Vercel)
1. Push repo to Github
2. Create new project in Vercel
3. Connect your Github repo
4. Add environment variables in Vercel
5. Deploy
