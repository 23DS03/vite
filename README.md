# Aditya Pathak Portfolio

The repository has two independent applications: `frontend/` contains the React/Vite portfolio, and `backend/` contains the Node.js/Groq chat API.

## Run locally

1. Install frontend dependencies with `npm --prefix frontend install`.
2. Create a Groq API key at [Groq Console](https://console.groq.com/keys).
3. Copy `backend/.env.example` to `backend/.env` and set `GROQ_API_KEY` to your key. Keep the key in the backend environment; do not put it in frontend code or commit it.
4. Start the website and API together with `npm --prefix frontend run dev`.

Open the local URL printed by Vite. Its `/api` proxy forwards chat requests to the separate Node API in `backend/`. Check the API with `http://127.0.0.1:3001/api/health`. To run only the API, use `npm --prefix frontend run dev:api`.

The API uses Groq's `openai/gpt-oss-120b` model and answers portfolio questions using the verified facts configured in `backend/server.js`. Questions are limited to 1,000 characters; each request includes up to the latest 30 conversation messages as context. Chat can continue beyond 30 messages, but older messages are not included in later AI requests.

## Production deployment

Deploy `backend/` as a Node web service with its root directory set to `backend/` and start command `npm start`. Set `GROQ_API_KEY` in the backend service's environment variables; the API uses the hosting platform's `PORT` variable, with `API_PORT` as a fallback. Set `FRONTEND_ORIGIN` to the exact deployed frontend origin (for example, `https://portfolio.example.com`). The API listens on all interfaces so hosting platforms can route requests to it.

Deploy `frontend/` separately as a static site with root directory `frontend/`, build command `npm run build`, and publish directory `dist`. Set `VITE_API_BASE_URL` to the backend's public base URL (for example, `https://portfolio-api.example.com`, without `/api`) in the frontend hosting environment **before building**, then redeploy the frontend. After deploying the API, open `https://<your-api-host>/api/health`; it must return JSON before testing chat from the frontend.

Never expose the API key through a `VITE_` variable or serve it to the browser. Check `https://<your-api-host>/api/health` after deployment; it should return JSON with `status: "ok"` and `configured: true`.
