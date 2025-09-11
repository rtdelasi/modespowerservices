# Modes Power Services Website

A professional website for Modes Power Services, offering electrical engineering solutions for industrial, commercial, and residential needs.

## Features

- **Responsive Design**: Looks great on all devices
- **Modern UI/UX**: Clean and professional interface
- **Interactive Elements**: Smooth scrolling, form validation, and animations
- **Gallery**: Showcase of completed projects
- **Services**: Detailed service offerings
- **Contact Form**: Easy way for clients to get in touch
- **Back-to-Top Button**: For better navigation

## Pages

- **Home**: Overview and featured services
- **About Us**: Company information and team
- **Services**: Detailed service offerings
- **Projects**: Portfolio of completed work
- **Gallery**: Photo gallery of projects
- **Contact**: Contact form and information

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (Vanilla JS)
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) (Roboto and Montserrat)

## File Structure

```
modespowerservices/
├── css/
│   └── styles.css           # Main stylesheet
├── images/                  # All website images
│   ├── clients/             # Client logos
│   ├── gallery/             # Project gallery images
│   ├── services/            # Service-related images
│   └── team/                # Team member photos
├── js/
│   ├── back-to-top.js       # Back to top button functionality
│   ├── main.js              # Main JavaScript file
│   └── stats-counter.js     # Statistics counter animation
├── about.html               # About page
├── contact.html             # Contact page
├── gallery.html             # Gallery page
├── index.html               # Home page
├── project-details.html     # Project details page
├── projects.html            # Projects page
└── services.html            # Services page
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd modespowerservices
   ```

3. Open `index.html` in your preferred web browser.

## Browser Support

The website is compatible with all modern web browsers including:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## Customization

### Changing Colors

Edit the CSS variables in `css/styles.css` to change the color scheme:

```css
:root {
    --primary-color: #0066ff;
    --secondary-color: #00ff99;
    --dark-bg: #121212;
    --darker-bg: #0a0a0a;
    --light-text: #ffffff;
    --dark-text: #333333;
    --gray-text: #a0a0a0;
    --card-bg: #1e1e1e;
    --border-color: #2d2d2d;
    --overlay: rgba(0, 0, 0, 0.7);
}
```

### Adding New Pages

1. Create a new HTML file (e.g., `new-page.html`)
2. Copy the basic structure from an existing page
3. Update the content as needed
4. Add a link to the new page in the navigation menu

## Contact

For any inquiries or support, please contact us through the contact form on the website.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
