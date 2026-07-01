# Deployment Guide: Hostinger Node.js

## Prerequisites
- Node.js 14+ installed on Hostinger
- SSH access to your Hostinger account
- cPanel or similar hosting control panel

## Setup Instructions

### 1. Upload Files
```bash
scp -r web-notes-app/* your_user@your_host:/path/to/your/domain/
```

Or use File Manager in cPanel to upload the project folder.

### 2. Install Dependencies
SSH into your Hostinger account and run:
```bash
cd /path/to/your/domain
npm install
```

This installs: express, express-session, dotenv

### 3. Configure Environment Variables
- Rename `.env.example` to `.env`
- Edit `.env` with your values:
  - `PORT`: Usually handled by Hostinger (ignore or use 3000 for testing)
  - `NODE_ENV`: Set to `production`
  - `APP_PASSWORD`: Choose a strong password for app access
  - `SESSION_SECRET`: Generate a random secret string

```bash
cp .env.example .env
nano .env  # Edit the file with your settings
```

### 4. Create Startup Script
Create `startup.js` in the root directory (if using PM2):
```bash
npm install -g pm2  # Install PM2 globally if not present
pm2 start server.js --name "web-notes-app"
pm2 startup
pm2 save
```

Or configure via cPanel's Application Manager to run: `npm start`

### 5. Configure Web Server
In cPanel, set up a Node.js application:
- **Application root**: `/path/to/web-notes-app`
- **Startup file**: `server.js`
- **Port**: Assign an available port (usually auto-assigned)

### 6. Data Persistence
The app stores notes in `notes.json` in the app root. Ensure this directory is writable:
```bash
chmod 755 /path/to/web-notes-app
chmod 755 /path/to/web-notes-app/notes.json
```

### 7. Enable HTTPS
Configure SSL/TLS in cPanel (AutoSSL or manual certificate). This is recommended for the login feature.

## Important Notes

- **Security**: Change `APP_PASSWORD` and `SESSION_SECRET` in .env to strong random values
- **Backups**: Regularly backup `notes.json` as it contains all data
- **Logs**: Check Hostinger error logs via cPanel if app fails to start
- **Port**: Hostinger assigns ports automatically; you don't need to specify
- **Database**: Currently uses file-based storage (notes.json). For scalability, consider migrating to MongoDB or MySQL

## Troubleshooting

**App won't start:**
- Check error logs in cPanel
- Ensure `npm install` completed successfully
- Verify `.env` file exists and is readable

**Session issues:**
- Ensure `SESSION_SECRET` is set in `.env`
- Check that cookies are enabled in browser

**File permission errors:**
- Run `chmod 755` on app directory and notes.json

**Port already in use:**
- Hostinger auto-assigns ports; restart the application via cPanel

## Support
For Hostinger-specific issues, contact their support or check cPanel documentation.
