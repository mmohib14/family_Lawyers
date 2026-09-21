# Apex Family Law Website

A production-oriented React website for Apex Family Law, focused on confidential intake, family-law practice discovery, social proof, attorney profiles, planning tools, and consultation conversion.

## Experience

- Responsive header with desktop navigation above 1080px and a compact scrollable mobile drawer at 1080px and below.
- Brown, cream, and gold visual system designed to feel authoritative and calm.
- Hero section with 24/7 consultation messaging, case evaluation CTAs, trust signals, and animated entrance effects.
- Five family-law practice pillars:
  - Marital & Relationship Law
  - Divorce & Property Division
  - Children & Custody Matters
  - Adoption, Paternity & Guardianship
  - Safety, Protection & Dispute Resolution
- Animated trust metrics with Intersection Observer counters.
- Interactive child-support planning estimator.
- Pre-divorce checklist CTA and categorized FAQ interface.
- Expandable case-result cards with claim-review CTAs.
- Auto-advancing, touch-swipeable testimonial slider.
- Attorney profile cards with full-portrait image treatment and biography modal.
- Four-step confidential consultation scheduler.
- 24/7 chat widget and responsive mobile call/book bar.
- Accessibility support for `prefers-reduced-motion`.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React icons
- React Router
- Express API server
- Optional Google Gemini integration for chat

## Project Structure

```text
src/
  App.tsx                         Application shell and routes
  index.css                       Global palette, responsive styles, and motion system
  types.ts                        Shared TypeScript contracts
  data/
    familyLawData.ts              Apex family-law practice pillars
    legalData.ts                  Attorneys, reviews, results, and trust data
  components/
    Header.tsx                    Responsive navigation and mobile drawer
    Hero.tsx                      Legacy route hero component
    ConsultationSchedulerModal.tsx Four-step consultation intake
    CaseResultsSection.tsx        Results filters, expandable cards, and reviews
    AttorneyProfiles.tsx           Attorney cards and biography modal
    ChatWidget.tsx                 Confidential intake chat
    StickyMobileBar.tsx            Mobile call and booking actions
    SiteFooter.tsx                 Footer navigation and office information
  pages/
    HomePage.tsx                  Main Apex Family Law homepage
    PracticeAreasPage.tsx         Practice-area overview
    PracticeAreaDetailPage.tsx    Practice-area detail view
    EligibilityPage.tsx           Eligibility workflow
    CaseResultsPage.tsx            Results and reviews page
    AttorneysPage.tsx             Attorney directory
    ContactPage.tsx               Contact and intake page
server.ts                         Express API and development server
vercel.json                       Vercel SPA build configuration
```

## Requirements

- Node.js 18 or newer
- npm
- Optional `GEMINI_API_KEY` for Gemini-powered chat responses

## Local Development

Install dependencies:

```bash
npm install
```

Create `.env.local` or `.env` when using Gemini chat:

```env
GEMINI_API_KEY=your_key_here
```

Start the development server:

```bash
npm run dev
```

The application runs at `http://localhost:3000`.

## Validation

Type-check the project:

```bash
npm run lint
```

Create the production client and server bundle:

```bash
npm run build
```

Start the built server:

```bash
npm run start
```

## API Endpoints

- `GET /api/health` - Service health check.
- `GET /api/results` - Case results, optionally filtered by `practiceArea`.
- `POST /api/leads/submit` - Consultation intake submission.
- `GET /api/leads` - Development/admin lead listing.
- `POST /api/chat/message` - Chat intake with Gemini fallback rules engine.

The current API uses in-memory storage for development. Production deployments should replace this with a persistent database and secure authentication for lead administration.

## Vercel Deployment

The repository includes `vercel.json` for the Vite SPA build:

```bash
npx vercel --prod
```

The static frontend can deploy to Vercel with the current configuration. The Express API server is not automatically converted into Vercel Functions; production API routes require a server deployment or a follow-up migration into an `api/` serverless-functions directory.

## Design Notes

- Gold is used for actions, trust indicators, and focus states.
- Brown is used for authority surfaces and dark CTAs.
- Cream backgrounds reduce visual intensity for stressed users.
- Motion is intentionally restrained and disabled or minimized for users who prefer reduced motion.
- Legal results, reviews, awards, phone numbers, and addresses are demonstration content and should be verified before public launch.

## Legal Content Reminder

This website includes attorney-advertising and informational disclaimers. Review all jurisdictional claims, credentials, testimonials, case results, privacy language, and emergency-contact workflows with the firm before production launch.
