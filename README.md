# AIRA — Your Voice, Supercharged

A privacy-first web application that learns your unique writing style and transforms any text to match your voice perfectly.

## Features

- **Personalized Profile**: 70+ binary parameters (0 or 1) capture every nuance of your writing style
- **Smart Onboarding**: 20-question wizard that maps your preferences to style parameters
- **AI-Powered Rewriting**: Transform any text to match your unique voice using GPT-4
- **Version History**: Track all your rewrites with full parameter snapshots
- **Export & Share**: Download your profile as JSON
- **Privacy-First**: Your data stays secure with encrypted storage
- **Authentication**: Email/password + OAuth (Google) support

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: OpenAI GPT-4o

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (for rewrite functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aira
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Update `.env.local` with your values:
   ```bash
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/aira?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # OpenAI API (required for rewrite functionality)
   OPENAI_API_KEY="your-openai-api-key"
   ```

   To generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Set up the database**
   ```bash
   # Create the database schema
   npx prisma migrate dev --name init

   # Generate Prisma Client
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000)

## Database Schema

### Users Table
- Stores user authentication and profile information
- Supports both email/password and OAuth authentication

### Profiles Table
- Stores the 70+ binary parameters for each user
- Includes a scorecard explaining which onboarding answers set which parameters
- Version tracking for parameter changes

### Responses Table
- Stores rewrite history
- Each entry includes input text, output text, and parameter snapshot
- Enables users to track how their profile evolution affects outputs

## Parameter Groups

AIRA tracks 70+ binary parameters across 11 categories:

1. **Personality** (12 params): Assertive, supportive, confident, cautious, humorous, etc.
2. **Tone** (10 params): Formal, casual, friendly, academic, technical, etc.
3. **Style** (12 params): Active voice, storytelling, bullets, examples, analogies, etc.
4. **Structure** (10 params): Intro, summary, conclusion, problem-solution, steps, etc.
5. **Punctuation** (8 params): Em dashes, Oxford comma, exclamations, emoji, etc.
6. **Audience** (6 params): Experts, executives, students, general public, etc.
7. **Content Safety** (6 params): Sensitive topics, medical/legal/financial disclaimers, etc.
8. **Productivity** (5 params): Templates, auto-headings, outlines, variants, summaries
9. **Formatting** (7 params): Plain language, reading level, title case, Markdown, etc.

## User Flow

1. **Sign Up** → Create account with email/password or Google OAuth
2. **Onboarding** → Answer 20 questions about writing preferences
3. **Profile Creation** → System computes 70+ binary parameters from answers
4. **Dashboard** → View/edit profile, rewrite text, access history
5. **Rewrite** → Paste text and transform it to match your voice
6. **History** → Track all rewrites with parameter snapshots
7. **Export** → Download profile as JSON for backup or sharing

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in with credentials
- `GET /api/auth/session` - Get current session

### Profile
- `POST /api/profile/onboarding` - Save profile from onboarding answers
- `GET /api/profile` - Get user's profile
- `PUT /api/profile` - Update profile parameters

### Rewrite
- `POST /api/rewrite` - Rewrite text using user's profile

### History
- `GET /api/responses` - Get rewrite history
- `POST /api/responses` - Save rewrite to history

## Development

### Run in development mode
```bash
npm run dev
```

### Build for production
```bash
npm run build
npm start
```

### Database migrations
```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# View database in Prisma Studio
npx prisma studio
```

### Type checking
```bash
npx tsc --noEmit
```

## Deployment

### Environment Setup

Ensure all environment variables are set in your production environment:
- `DATABASE_URL` - Production PostgreSQL connection string
- `NEXTAUTH_URL` - Production URL (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET` - Secure random string
- `OPENAI_API_KEY` - OpenAI API key
- OAuth credentials (if using Google/Apple sign-in)

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

The app will automatically build and deploy.

## Security Features

- **Password Hashing**: bcrypt with 12 rounds
- **Session Management**: JWT-based sessions with 30-day expiry
- **Rate Limiting**: 120 requests per minute per user
- **PII Encryption**: Sensitive data encrypted at rest
- **HTTPS Only**: Force secure connections in production
- **CSRF Protection**: Built into NextAuth.js
- **Input Validation**: Zod schema validation on all inputs

## Privacy

AIRA is privacy-first:
- No tracking or analytics by default
- User data never shared with third parties
- OpenAI API calls are stateless (not used for training)
- Users can export and delete their data anytime

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db push
```

### OpenAI API Errors
- Verify your API key is valid and has credits
- Check rate limits on your OpenAI account
- Ensure `OPENAI_API_KEY` environment variable is set

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npx prisma generate
```

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Prisma, and OpenAI
