<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/89e48516-6acf-4e2c-ac3d-b32678a3e441

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

4. Start backend (AI auth + parsing):
   `npm run backend`
5. In a second terminal run frontend:
   `npm run dev`
6. Open `http://localhost:3000/` and login with:
   - Employee ID (format like `PW-1234`)
   - AI API key

## Security gating flow

- The app is now login-gated and will not render internal screens without auth.
- Login requires Employee ID + API key and requests a backend session token.
- All AI parse requests are sent to backend with `x-session-token`.
- Logout clears session and cached request data from browser storage.



## Localhost troubleshooting

After `npm run dev`, open **exactly**: `http://localhost:3000/` (note the `:3000` port).

If you open only `http://localhost`, you'll get `ERR_CONNECTION_REFUSED` because this app does not run on port 80.

Quick check:

```bash
curl -I http://127.0.0.1:3000
```

You should see `HTTP/1.1 200 OK`.
