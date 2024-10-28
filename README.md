# Tyler Cartwright Portfolio

A React-based portfolio website showcasing my journey through education and professional experience in software engineering and data science.

## 🚀 Live Site
[tylercartwright.co.uk](https://tylercartwright.co.uk)

## 🛠️ Built With
- React
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## 🔄 Development Workflow

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/tyler-carty/tyler-carty.github.io.git
cd tyler-carty.github.io

# Install dependencies
npm install
```

### Making Changes

1. Create a new feature branch:
```bash
# From main branch
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

2. Make your changes and test locally:
```bash
npm start
```

3. Commit your changes:
```bash
git add .
git commit -m "Description of your changes"
git push origin feature/your-feature-name
```

### Deployment Process

1. Before deploying, ensure your changes are working locally:
```bash
npm start
```

2. Create a production build and deploy:
```bash
npm run deploy
```
This command will:
- Build your React app
- Push the build to the gh-pages branch
- Deploy to GitHub Pages

3. Merge your feature branch to main:
```bash
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

### Important Notes

#### Custom Domain
- The CNAME file in the `public` folder maintains the custom domain configuration
- Don't modify or delete the CNAME file unless changing domains
- Content: `tylercartwright.co.uk`

#### Branch Structure
- `main`: Source code and development
- `gh-pages`: Automated deployment branch (don't modify directly)
- Feature branches: For new developments

#### GitHub Pages Settings
- Deploy from: gh-pages branch
- Custom domain: tylercartwright.co.uk
- Enforce HTTPS: Enabled

## 📂 Project Structure

```
src/
├── components/
│   └── Portfolio.js       # Main portfolio component
├── App.js                 # Root component
└── index.js              # Entry point
```

## 🔧 Making Common Changes

### Adding a New Section
1. In `Portfolio.js`, locate the `PORTFOLIO_CHAPTERS` array
2. Add a new chapter object following the existing pattern:
```javascript
{
    title: "Your New Section",
    icon: YourIcon,
    content: (
        <>
            {/* Your content here */}
        </>
    )
}
```

### Updating Content
1. Find the relevant section in `PORTFOLIO_CHAPTERS`
2. Update the content within the JSX
3. Test locally with `npm start`
4. Deploy using the deployment process above

### Styling Changes
- Global styles: Modify `src/index.css`
- Component styles: Update Tailwind classes in respective components

## 🚨 Troubleshooting

### Deployment Issues
1. Check GitHub Pages settings in repository
2. Verify CNAME file exists in public folder
3. Ensure gh-pages branch was updated
4. Check build output for errors

### Local Development Issues
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`

## 📝 Version History
- v1.0: Original static HTML portfolio
- v2.0: React-based interactive portfolio

## 🤝 Contributing
Personal portfolio project - not open for contributions.

## 📄 License
This project is private and not licensed for public use.