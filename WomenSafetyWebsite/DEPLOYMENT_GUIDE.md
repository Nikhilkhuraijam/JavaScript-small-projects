# Deployment & Hosting Guide

A simple guide to get your website live on the internet. No technical experience needed!

## Understanding the Basics

### What You Need
1. **Domain Name** - Your website address (e.g., safespace.org)
2. **Hosting** - A computer that stores your website 24/7
3. **Files** - The HTML, CSS, and JavaScript files (you have these)

### How It Works (Simple Version)
```
User types website URL
         ↓
Connects to your hosting server
         ↓
Server sends website files
         ↓
Website appears in browser
```

---

## Option 1: Easiest - No Coding Required

### Use Netlify (Recommended for Beginners)

**Cost:** Free - $19/month

**Steps:**

1. **Go to netlify.com**
   - Click "Sign up"
   - Use email, GitHub, or Google account

2. **Create a New Site**
   - Click "Add new site"
   - Select "Deploy manually"

3. **Upload Your Files**
   - Drag and drop your website folder
   - Wait 30 seconds for upload

4. **Get Your Website**
   - Netlify gives you a free URL (random name)
   - Example: `peaceful-elephant-42.netlify.app`

5. **Add Your Domain** (optional)
   - Buy domain on Namecheap, GoDaddy, etc.
   - Netlify explains how to connect it

**Advantages:**
- ✅ No coding needed
- ✅ Free tier available
- ✅ Automatic HTTPS (secure)
- ✅ Simple interface

---

## Option 2: Popular - Vercel

**Cost:** Free - $20+/month

**Steps:**

1. **Go to vercel.com**
   - Click "Sign up"
   - Connect your GitHub account

2. **Push Files to GitHub**
   - Create account on github.com
   - Create new repository
   - Upload your website folder

3. **Import to Vercel**
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

**Advantages:**
- ✅ Extremely fast
- ✅ Free SSL
- ✅ Good for teams
- ✅ Analytics included

---

## Option 3: Affordable - Shared Hosting

**Cost:** $3-10/month

Services to try:
- Bluehost
- HostGator
- SiteGround
- A2 Hosting

**Steps:**

1. **Choose a hosting provider**
   - Look for "Shared Hosting" plans
   - Choose plan with enough storage (100GB+ recommended)

2. **Set Up Your Domain**
   - You can buy domain from them
   - Or transfer existing domain
   - Update DNS settings

3. **Upload Files via FTP**
   - Download FileZilla (free FTP client)
   - Get login credentials from hosting provider
   - Connect and upload files
   - Upload all files to `public_html` folder

**Advantages:**
- ✅ Very affordable
- ✅ Good for small websites
- ✅ Easy SSL setup
- ✅ Email hosting available

**Disadvantages:**
- ❌ Slower than Netlify/Vercel
- ❌ Requires FTP knowledge
- ❌ May need support more often

---

## Option 4: Most Control - Virtual Private Server (VPS)

**Cost:** $5-50/month

Services:
- DigitalOcean
- Linode
- Vultr
- AWS

**Note:** Requires more technical knowledge. Recommended if you have IT support.

---

## Domain Names

### What's a Domain?
Your website address: `safespace.org`, `myorganization.org`

### Where to Buy
- Namecheap.com (cheapest)
- GoDaddy.com (most popular)
- Google Domains
- Your hosting provider

### Cost
$10-15/year for most names

### Steps to Buy
1. Go to domain registrar
2. Search for desired name
3. Add to cart
4. Checkout with payment
5. Set up DNS pointing to your hosting

---

## SSL Certificate (HTTPS)

### What Is It?
The "S" in HTTPS means secure. Shows connection is encrypted.

### Why You Need It
- Protects user information
- Google ranks secure sites better
- Users trust sites with HTTPS

### How to Get It
- **Netlify:** Automatic - nothing to do
- **Vercel:** Automatic - nothing to do
- **Shared Hosting:** Usually free, click one button
- **VPS:** Use Let's Encrypt (free) or buy certificate

---

## Step-by-Step: Publishing on Netlify (Complete)

### Part 1: Prepare Files (5 minutes)

1. Open file manager on your computer
2. Go to your website folder: `WomenSafetyWebsite`
3. Make sure you have:
   - `index.html`
   - `assets/` folder with CSS and JS
4. **Important:** No folders like `.git` or `node_modules`

### Part 2: Create Netlify Account (2 minutes)

1. Go to **netlify.com**
2. Click **"Sign up"** (top right)
3. Choose email, GitHub, or Google
4. Verify email
5. Click **"Continue"**

### Part 3: Deploy Website (3 minutes)

1. After login, click **"Add new site"**
2. Select **"Deploy manually"**
3. **Drag and drop** your website folder onto the page
4. Wait for upload (shows progress bar)
5. When complete, Netlify shows your URL!

### Part 4: See Your Live Website (1 minute)

1. Click on the URL Netlify gave you
2. Your website is now live!
3. Share URL with your organization

**Example URL:** `https://peaceful-elephant-42.netlify.app`

### Part 5: Add Your Own Domain (10 minutes)

1. In Netlify, click **"Domain settings"**
2. Click **"Add a custom domain"**
3. Enter your domain (e.g., `safespace.org`)
4. Click **"Verify"**
5. Netlify shows DNS records to add
6. Go to your domain registrar (GoDaddy, Namecheap, etc.)
7. Update DNS records as shown
8. Wait 24 hours for updates to spread

---

## Step-by-Step: FTP Upload Method (Shared Hosting)

### If Using Shared Hosting with FTP

**Part 1: Get Login Credentials**
- Check email from hosting company
- You need:
  - FTP Host
  - FTP Username
  - FTP Password
  - FTP Port (usually 21)

**Part 2: Download FileZilla**
1. Go to **filezilla-project.org**
2. Download FileZilla Client (free)
3. Install on your computer

**Part 3: Connect to Hosting**
1. Open FileZilla
2. File → Site Manager
3. New site, fill in:
   - Protocol: SFTP
   - Server: FTP host from email
   - User: FTP username
   - Pass: FTP password
   - Port: 22 (or 21)
4. Click **"Connect"**

**Part 4: Upload Files**
1. Right side: Navigate to `public_html`
2. Left side: Open your website folder
3. Select all files and folders
4. Drag to right side (upload)
5. Wait for completion

**Part 5: Visit Your Website**
1. Open browser
2. Type your domain
3. Your website should appear!

---

## Troubleshooting

### Website Shows "Not Found"
- **Solution:** Files might not be in correct folder
- **Check:** Make sure `index.html` is in root directory
- **Fix:** Re-upload files to correct location

### Page Shows Old Content
- **Solution:** Browser is using cached version
- **Fix:** Press `Ctrl+Shift+Delete` to clear cache
- **Or:** Check domain DNS is updated (24 hour wait)

### HTTPS Not Working
- **Solution:** Usually needs 24 hours to activate
- **Check:** Try again tomorrow
- **If Netlify:** It's automatic, should be instant

### Website Very Slow
- **Solution:** Free tier may be overloaded
- **Options:**
  - Upgrade to paid plan
  - Switch to different hosting
  - Optimize images (reduce file size)

### Cannot Upload Files
- **Solution:** Check FTP credentials
- **Verify:** Username and password correct
- **Try:** Different FTP client or hosting support

---

## Comparison: Quick Decision Guide

| Need | Best Option | Cost | Time |
|------|-------------|------|------|
| Easiest | Netlify | Free-19/mo | 5 min |
| Fastest | Vercel | Free-20/mo | 10 min |
| Cheapest | Shared Host | 3-10/mo | 30 min |
| Most Control | VPS | 5-50/mo | 1+ hour |

---

## After Deployment

### Things to Do

1. **Test Everything**
   - Click all links
   - Fill out report form
   - Try chat
   - Take quiz
   - Check mobile version

2. **Monitor Performance**
   - Check uptime (site stays online)
   - Monitor speed
   - Ensure no errors

3. **Set Up Analytics** (Optional)
   - Google Analytics for traffic stats
   - Netlify analytics for basic stats
   - See who visits and from where

4. **Maintain Content**
   - Update hotline numbers regularly
   - Add new blog posts
   - Keep information current
   - Fix any broken links

5. **Security**
   - Keep software updated
   - Regular backups
   - Monitor for issues
   - Use strong admin passwords

---

## Monthly Costs Example

### Minimal Setup
- Domain: $12/year = $1/month
- Netlify free tier: $0/month
- **Total: $1/month**

### Standard Business Setup
- Domain: $15/year + privacy: $10/year = $2/month
- Netlify Pro: $19/month
- Email service: $20/month (optional)
- **Total: $41/month**

### Professional Setup
- Domain + privacy: $2/month
- Premium Hosting: $30/month
- Email: $20/month
- Backups: $10/month
- Support: $50/month
- **Total: $112/month**

---

## Getting Help

### If You're Stuck

1. **Netlify Support**: Help within netlify.com dashboard
2. **Hosting Support**: Email support from your provider
3. **Technical Help**: Hire a freelancer (Fiverr, Upwork)
4. **Video Tutorials**: YouTube has guides for each platform

### Success Tips

- ✅ Start with free option first
- ✅ Test thoroughly before promoting
- ✅ Keep passwords secure
- ✅ Make regular backups
- ✅ Update content consistently
- ✅ Monitor traffic and user feedback

---

## Deployment Checklist

**Before Going Live:**
- [ ] All files uploaded
- [ ] Homepage loads correctly
- [ ] All links work
- [ ] Colors appear right
- [ ] Mobile version looks good
- [ ] Chat works
- [ ] Quiz works
- [ ] Form submission works
- [ ] SSL certificate active (HTTPS)

**After Going Live:**
- [ ] Website accessible from different devices
- [ ] Domain points to correct site
- [ ] Email contacts work
- [ ] Analytics set up (optional)
- [ ] Backup strategy in place
- [ ] Share with stakeholders
- [ ] Monitor for issues

---

## Next Steps

1. **Choose hosting** - Start with Netlify (easiest)
2. **Buy domain** - If not buying from hosting provider
3. **Customize content** - Update organization name, hotlines
4. **Deploy** - Follow appropriate guide above
5. **Test** - Make sure everything works
6. **Promote** - Share with target audience
7. **Maintain** - Keep content updated

**Estimated Time to Live:** 30 minutes to 2 hours depending on experience level and choice of platform.

Good luck! Your website will help many women stay safe online. 🎉
