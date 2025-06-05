# Video-Chat-AI

A modern video chat application with AI-powered features, built using Next.js, Stream Video, and Clerk authentication.

## Features

- Real-time video calls
- AI-powered meeting summaries
- Meeting recordings with transcription
- Q&A with meeting content
- Personal meeting rooms
- Upcoming meetings scheduling
- Modern, responsive UI

## Tech Stack

- Next.js 14
- Stream Video SDK
- Clerk Authentication
- Tailwind CSS
- TypeScript
- Gemini AI API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see .env.example)
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

## License

MIT
