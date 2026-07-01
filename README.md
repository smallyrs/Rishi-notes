# Web Notes App

A secure, lightweight notes application built with Node.js and Express.

## Features

- 📝 Create, read, update, and delete notes
- 🔐 Password-protected access
- 💾 Persistent storage (JSON file-based)
- 🎨 Clean, responsive web interface
- 📱 Works on all devices

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your password and secret
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Access the app:**
   - Open http://localhost:3000
   - Enter password (default: `secretnotes` from .env)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Hostinger or other Node.js hosting providers.

### Quick Hostinger Setup:
```bash
npm install
cp .env.example .env
# Edit .env with production values
npm start
```

## Project Structure

```
web-notes-app/
├── server.js          # Express server entry point
├── database.js        # Note persistence layer
├── notes.json         # Data storage file
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (not versioned)
├── .env.example       # Template for .env
├── public/
│   ├── index.html     # Frontend HTML
│   ├── app.js         # Frontend logic
│   └── style.css      # Styling
└── routes/
    └── api.js         # API endpoints
```

## API Endpoints

### Authentication
- `POST /api/login` - Login with password
- `POST /api/logout` - Logout
- `GET /api/status` - Check authentication status

### Notes (requires authentication)
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| NODE_ENV | production | Environment mode |
| APP_PASSWORD | secretnotes | Password for app access |
| SESSION_SECRET | super-secret-session-key | Session encryption key |

**Important:** Change `APP_PASSWORD` and `SESSION_SECRET` in production!

## Security Notes

- Always use strong, unique passwords
- Deploy with HTTPS (TLS/SSL)
- Regularly backup `notes.json`
- Keep dependencies updated: `npm update`
- Use environment variables for sensitive data

## Development

### Running locally:
```bash
NODE_ENV=development npm start
```

### File-based persistence:
Notes are stored in `notes.json`. This file is created automatically on first use.

## License

ISC
