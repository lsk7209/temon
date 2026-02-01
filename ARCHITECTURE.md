# Development Environment & Architecture

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Turso (libSQL)
- **ORM**: Drizzle ORM
- **Hosting**: Vercel
- **Version Control**: GitHub
- **Language**: TypeScript

## Database Setup (Turso)
The project uses Turso as the primary database.

- **Connection**: Managed via `@libsql/client`.
- **Schema Management**: Drizzle Kit (`npx drizzle-kit push`).
- **Environment Variables**:
  - `TURSO_DATABASE_URL`: Connection string (starts with `libsql://` or `https://`).
  - `TURSO_AUTH_TOKEN`: Authentication token.

## Deployment (Vercel)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Must be configured in Vercel Project Settings > Environment Variables.
  - `TURSO_DATABASE_URL`
  - `TURSO_AUTH_TOKEN`
  - `NEXT_PUBLIC_APP_URL` (for CORS/Auth)

## Local Development
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Create `.env.local` with your Turso credentials.
3. **Database Migration**:
   ```bash
   # Push schema changes
   npx drizzle-kit push
   # Or use the manual script if protocol errors occur
   node scripts/migrate.js
   ```
4. **Run Server**:
   ```bash
   npm run dev
   ```

## Key Directories
- `lib/db`: Database client (`client.ts`) and schema (`schema.ts`).
- `app/api`: Backend API routes (Edge Runtime).
- `drizzle`: Migration SQL files.
