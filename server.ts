import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieSession from 'cookie-session';
import { OAuth2Client } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Session middleware
  app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'a-very-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: true,
    sameSite: 'none',
  }));

  app.use(express.json());

  // Google OAuth Client
  const getOAuthClient = (origin: string) => {
    return new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      `${origin}/auth/callback`
    );
  };

  // API Routes
  app.get('/api/auth/google/url', (req, res) => {
    if (!GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: 'GOOGLE_CLIENT_ID is not configured' });
    }
    const origin = req.headers.origin || `${req.protocol}://${req.get('host')}`;
    const client = getOAuthClient(origin);
    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      prompt: 'consent'
    });
    res.json({ url });
  });

  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
      return res.status(400).send('No code provided');
    }

    try {
      const origin = `${req.protocol}://${req.get('host')}`;
      const client = getOAuthClient(origin);
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);

      const userInfoResponse = await client.request({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo'
      });

      const userData = userInfoResponse.data as any;
      
      // Store user info in session
      req.session!.user = {
        id: userData.sub,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      };

      // Send success message to parent window and close popup
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.status(500).send('Authentication failed');
    }
  });

  app.get('/api/auth/me', (req, res) => {
    res.json({ user: req.session?.user || null });
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session = null;
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
