# Aditya Pathak Portfolio

React and Vite portfolio site with a Groq-powered AI chat assistant.

## Run locally

1. Install dependencies with `npm install`.
2. Create a Groq API key at [Groq Console](https://console.groq.com/keys).
3. Copy `.env.example` to `.env` and set `GROQ_API_KEY` to your key. Keep the key in `.env`; do not put it in frontend code or commit it.
4. Start the website and API together with `npm run dev`.

Open the local URL printed by Vite. Its `/api` proxy forwards chat requests to the Node API started by the same command. Check the API with `http://127.0.0.1:3001/api/health`. To run only the API, use `npm run dev:api`.

The API uses Groq's `openai/gpt-oss-120b` model and answers portfolio questions using the verified facts configured in `server.js`. Questions are limited to 1,000 characters; each request includes up to the latest 30 conversation messages as context. Chat can continue beyond 30 messages, but older messages are not included in later AI requests.

## Production deployment

Build the frontend with `npm run build`. Deploy the Node API as a separate web service (start command: `npm run start:api`) or alongside the frontend, and set `GROQ_API_KEY` and, optionally, `API_PORT` as server-side environment variables. The API must be reachable from the public internet or from the frontend host; it listens on all interfaces so container and reverse-proxy hosts can reach it.

If the frontend and API use different domains, set `VITE_API_BASE_URL` to the API's public base URL (for example, `https://portfolio-api.example.com`) in the frontend hosting environment **before building**, and set `FRONTEND_ORIGIN` on the API service to the frontend's exact origin (for example, `https://portfolio.example.com`). Redeploy the frontend after changing its build variable. If both share an origin, leave `VITE_API_BASE_URL` empty and configure the hosting platform or reverse proxy to forward `/api/*` requests to the API process.

Never expose the API key through a `VITE_` variable or serve it to the browser. Check `https://<your-api-host>/api/health` after deployment; it should return JSON with `status: "ok"` and `configured: true`.
