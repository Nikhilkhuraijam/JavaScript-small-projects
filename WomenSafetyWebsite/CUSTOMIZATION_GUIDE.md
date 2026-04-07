# Client Customization Guide

This guide helps you quickly customize the Women Safety Website for your organization.

## Quick Start (15 minutes)

### 1. Organization Branding

**Open:** `index.html`

**Find and Replace:**
- Replace "SafeSpace" with your organization name (appears ~20 times)
- Update logo icon if desired

```html
<!-- Line 18 - Change this -->
<div class="logo">
    <i class="fas fa-shield-alt"></i> SafeSpace
</div>

<!-- To: -->
<div class="logo">
    <i class="fas fa-heart"></i> Your Organization Name
</div>
```

### 2. Contact Information

**Find sections with:**
```html
Email: support@safespace.com
Phone: 1-800-SAFE-NOW
```

**Replace with your organization's contact info**

### 3. Emergency Hotlines

**Find the "Emergency Resources" section:**
Replace all hotline numbers with actual numbers for your region/organization

```html
<div class="resource-card">
    <h3>📞 Your Service</h3>
    <p class="number">Your Phone Number</p>
    <p>Service description</p>
</div>
```

## Color Customization

### Option A: Keep Current Colors
The default deep blue & coral is professional and client-ready.

### Option B: Change Colors

**Edit:** `assets/css/style.css`

**Find (Line ~25):**
```css
:root {
    --primary-color: #003D82;    /* Deep Blue */
    --secondary-color: #FF6B5B;  /* Coral */
}
```

**Replace with your colors:**
- Use a tool like [canva.com/colors](https://www.canva.com/colors) to find colors
- Primary: Main brand color (buttons, headers)
- Secondary: Action/attention color (highlights, calls-to-action)

**Example:**
```css
:root {
    --primary-color: #1B4965;    /* Professional teal */
    --secondary-color: #F77F00;  /* Orange accent */
}
```

## Content Customization

### Blog Posts

**Edit:** `index.html` - Blog Section

Current template:
```html
<article class="blog-card">
    <div class="blog-date">April 5, 2024</div>
    <h3>5 Signs Someone May Be Catfishing You</h3>
    <p>Learn how to identify fake profiles...</p>
    <a href="#" class="read-more">Read More →</a>
</article>
```

**To add new posts:**
1. Copy the entire card
2. Update date, title, description
3. Link to actual blog post URL

### Safety Tips

**Edit:** `index.html` - "Essential Safety Tips" section

Each tip card has:
- Icon (emoji)
- Title
- Description

Customize each to match your organization's focus areas.

### Community Statistics

**Edit:** `index.html` - Community Section

```html
<div class="stat-number">2,450</div>
<div class="stat-label">Active Members</div>
```

Update numbers to reflect actual community stats.

## Chat Responses

**Edit:** `assets/js/script.js` - Lines ~200-230

The chatbot responds based on keywords. Customize responses:

```javascript
const chatResponses = {
    'password': [
        'Your custom response about passwords...',
        'Another response...'
    ],
    'privacy': [
        'Your custom response about privacy...'
    ],
    // Add more topics
};
```

**How it works:**
- User types a message
- Bot looks for keywords in the message
- Responds with a matching answer
- Falls back to default if no match

### Add New Chat Topics

```javascript
'two-factor': [
    'Two-factor authentication adds an extra security layer...',
    'To enable 2FA on most platforms...'
],
```

## Logo & Images

### Replace Logo Text

Change from text to an actual logo image:

```html
<!-- Current -->
<div class="logo">
    <i class="fas fa-shield-alt"></i> SafeSpace
</div>

<!-- Replace with image -->
<div class="logo">
    <img src="assets/images/logo.png" alt="Organization Logo" width="50">
</div>
```

Then save your logo as `assets/images/logo.png`

## Mobile Testing

After changes, test on:
1. Desktop (1920x1080)
2. Tablet (768x1024)
3. Mobile (375x667)

Use browser DevTools:
- Chrome: Press F12 → Toggle Device Toolbar (Ctrl+Shift+M)
- Firefox: Press F12 → Responsive Design Mode (Ctrl+Shift+M)

## SEO Optimization

**Edit:** `index.html` - Lines 4-7 (head section)

```html
<title>Women Safety Online - Your Trusted Digital Safety Guide</title>
<meta name="description" content="...">
```

Update for your organization:
```html
<title>Your Org - Safe Online, Safe Life</title>
<meta name="description" content="[Your organization] provides online safety resources, emergency support, and community for women.">
```

## Deployment Checklist

Before going live:

- [ ] Organization name updated everywhere
- [ ] Contact information correct
- [ ] Emergency hotlines verified and current
- [ ] Logo/branding applied
- [ ] Colors customized (if desired)
- [ ] Blog posts updated
- [ ] Chat responses relevant
- [ ] Testing on mobile devices
- [ ] Links all working
- [ ] Footer links correct
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Analytics set up (optional)

## Where Specific Things Are

| Element | Location |
|---------|----------|
| Organization Name | `index.html` - search "SafeSpace" |
| Contact Info | `index.html` - footer section |
| Colors | `assets/css/style.css` - :root |
| Chat Bot | `assets/js/script.js` - chatResponses |
| Hotlines | `index.html` - Resources section |
| Blog Posts | `index.html` - Blog section |
| Logo | `index.html` - navbar |
| Social Links | `index.html` - footer |

## Common Edits

### Change Website Title
File: `index.html`
Find: `<title>Women Safety Online...</title>`
Replace with: `<title>Your Organization Name</title>`

### Add New Resource
File: `index.html` - Resources section
Copy entire `<div class="resource-card">` block and customize

### Update Emergency Hotline
File: `index.html` - Resources section
Find: `<p class="number">PHONE NUMBER</p>`
Replace with actual number

### Change Primary Color
File: `assets/css/style.css`
Find: `--primary-color: #003D82;`
Replace with hex color code

### Add Your Blog Post
File: `index.html` - Blog section
Copy `<article class="blog-card">` block
Update date, title, description, link

## Advanced Customization

### Add New Section
1. Create new `<section>` in `index.html`
2. Add ID for navigation (e.g., `id="resources"`)
3. Add CSS styling in `style.css`
4. Add navigation link in navbar

### Connect Real Database
For features like:
- Community forum (instead of static posts)
- Report storage and viewing
- User accounts
- Real-time chat

You'll need:
- Backend server (Node.js, Python, etc.)
- Database (MySQL, MongoDB, etc.)
- API integration with JavaScript

### Add Email Notifications
You'll need:
- Email service (SendGrid, Mailgun, etc.)
- Backend code to send emails
- User email collection

## Performance Tips

1. **Optimize Images** - Use tools like TinyPNG
2. **Minimize Files** - Use minifiers for CSS/JS in production
3. **Cache Strategy** - Enable browser caching on web server
4. **CDN** - Use CDN for faster loading globally

## Support Resources

- **Font Awesome Icons:** [fontawesome.com](https://fontawesome.com)
- **Color Tools:** [coolors.co](https://coolors.co)
- **HTML Validation:** [validator.w3.org](https://validator.w3.org)
- **SEO:** [moz.com/tools](https://moz.com/tools)

## Testing Your Changes

After editing:

1. **Visual Check:**
   - Open `index.html` in browser
   - Click through all sections
   - Check colors and fonts

2. **Responsiveness:**
   - Test on mobile, tablet, desktop
   - All buttons clickable
   - Text readable

3. **Functionality:**
   - Quiz works correctly
   - Chat responds
   - Forms submit
   - Links work

4. **SEO:**
   - Title and meta descriptions set
   - Proper heading hierarchy
   - Alt text on images

## Final Notes

- **Backup original files** before making changes
- **Test thoroughly** before deploying
- **Keep content updated** - especially hotlines
- **Regular maintenance** - outdated information hurts credibility
- **User feedback** - make improvements based on user needs

---

For more detailed customization or feature requests, refer to the main README.md file or contact development support.

**Remember:** Every customization should enhance user experience and keep safety as the top priority.
