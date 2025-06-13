# Language Learning Website Overview

This project is a full‑stack web application aimed at helping users learn Japanese. It combines spaced repetition for memorizing kanji with AI assisted conversations and several account management features.

## Technology Stack

- **Next.js** – React framework used for both the user interface and backend API routes.
- **Chakra UI** – Component library for consistent styling and dark mode support.
- **NextAuth** – Handles user authentication with credential based login.
- **MongoDB & Mongoose** – Stores user accounts and study progress.
- **OpenAI** – Provides chatbot interactions for conversational practice.
- **Nodemailer** – Sends password recovery emails.

## Application Structure

```
src/
  app/              – Next.js app router pages and API routes
  components/       – Reusable React components (Navbar, KanjiCard, etc.)
  authProviders.js  – Wrapper for NextAuth SessionProvider
lib/                – MongoDB connection helper
models/             – Mongoose models for User and Progress
public/             – Static assets
```

### Pages
- **Home** – Marketing landing page with call to action.
- **Dashboard** – Authenticated hub showing activity log, progress charts and navigation links.
- **Kanji Study** – Presents kanji cards. Uses SRS intervals computed by the `/api/progress` API.
- **Chatbot** – Allows conversation via OpenAI chat completions.
- **Assessments** – Placeholder for JLPT style assessments.
- **Profile & Account Settings** – Lets the user change email or password and view details.

### API Routes
`src/app/api/*` defines server routes. Key endpoints include:
- `register` and `auth/[...nextauth]` for authentication
- `forgot-password`, `reset-password`, and token verification
- `update-email` and `update-password` for account changes
- `kanji` and `progress` to fetch study materials and save SRS results

## Design Highlights

1. **Spaced Repetition** – Each kanji is hashed into an identifier. Progress documents keep review intervals and the next review date. The `/api/progress` route updates these values based on user feedback (happy / neutral / unhappy).
2. **AI Chatbot** – The chatbot page sends recent chat history to OpenAI’s Chat Completion API, enabling conversation practice directly in the app.
3. **User Management** – Password resets are handled via emailed tokens. Protected routes rely on `next-auth` middleware and API routes check the user’s email before altering data.
4. **Theming** – Chakra UI’s color mode toggle allows light or dark mode. A custom theme defines the initial color scheme.

This repository currently contains only the application code; no production deployment configuration is included. Run `npm run dev` to start a development server after installing dependencies.
