# Novel Office - Homepage

A clean, modern homepage for Novel Office matching the provided design reference. Built with pure HTML, CSS, and JavaScript.

## 🌟 Features

- **Animated Hero Text**: "OFFICES with NOVEL" appears with smooth fade-in and slide-up animation, featuring large text for "OFFICES" and "NOVEL" with smaller "with" in between
- **Scroll Indicator**: Animated vertical line that expands and contracts with "scroll to know more" text below
- **Clean Minimal Design**: Transparent navbar over full-screen office background
- **Dark Overlay**: Professional dark layer over background image for better contrast
- **Custom Typography**: Montserrat font for hero text with precise spacing, Roboto for navigation
- **Logo Integration**: Uses your logo.png from assets folder
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Navigation**: Clean transparent header with dropdown menus and mobile hamburger menu
- **Full-Screen Background**: Your office image covers the entire viewport
- **Mobile-First**: Optimized for all screen sizes

## 📁 Files

```
project/
├── public/
│   └── assets/
│       ├── Frame 427319551 3@4x.png  # Office background image
│       └── logo.png                  # Company logo
├── index.html                        # Main homepage
├── style.css                        # All styling
├── script.js                        # Interactive functionality
└── README.md                        # This file
```

## 🚀 Quick Start

1. **Open** `index.html` in any web browser
2. **That's it!** The website is ready to use

## 📱 How It Works

### Desktop View
- Clean navigation bar with "NOVEL OFFICE" logo
- Navigation menu: HOME, SOLUTIONS, LOCATIONS (dropdown), INVESTMENTS, CONTACT US, MORE
- Full-screen hero section with your office image background
- Animated "OFFICES with NOVEL" text appears in center with fade-in effect - large "OFFICES" and "NOVEL" with smaller "with"
- Scroll indicator with animated vertical line and "scroll to know more" text below the hero title

### Mobile View
- Responsive hamburger menu for navigation
- Full-screen background image adapts to smaller screens
- Touch-friendly buttons and navigation

## 🎨 Customization

### Change Text Content
Edit the text in `index.html`:
```html
<h2 class="hero-title">Modern Office Spaces<br>for Growing Businesses</h2>
<p class="hero-subtitle">Your custom subtitle here</p>
```

### Change Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #1a1a1a;    /* Text color */
    --accent-color: #007AFF;     /* Button color */
    --white: #ffffff;            /* Background */
}
```

### Change Background Image
Replace `Frame 427319551 3@4x.png` with your own image and update the CSS:
```css
.hero-background {
    background: url('your-image.jpg') center/cover no-repeat;
}
```

## 🔧 Browser Support

- Chrome ✅
- Firefox ✅  
- Safari ✅
- Edge ✅

## 📞 Contact

Perfect for presenting your office space business with a professional, modern design.

---

**Simple. Clean. Professional.** 