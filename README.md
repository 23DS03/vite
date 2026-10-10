# Aditya Pathak Portfolio

React and Vite portfolio site with a Groq-powered AI chat assistant.

## Run locally

1. Install dependencies with `npm install`.
2. Create a Groq API key at [Groq Console](https://console.groq.com/keys).
3. Copy `.env.example` to `.env` and set `GROQ_API_KEY` to your key. Keep the key in `.env`; do not put it in frontend code or commit it.
4. Start the website and API together with `npm run dev`.

Open the local URL printed by Vite. Its `/api` proxy forwards chat requests to the Node API started by the same command. Check the API with `http://127.0.0.1:3001/api/health`. To run only the API, use `npm run dev:api`.

The API uses Groq's `openai/gpt-oss-120b` model and answers portfolio questions using the verified facts configured in `server.js`. Requests are limited to 1,000 characters and the latest 10 conversation messages.

## Production deployment

Build the frontend with `npm run build`. Deploy the generated `dist` folder alongside the Node API and configure the hosting platform or reverse proxy to forward `/api/*` requests to the API process. Set `GROQ_API_KEY` and, optionally, `API_PORT` as server-side environment variables. Never expose the API key through a `VITE_` variable or serve it to the browser.
