# Advanced CV & Resume Generator

> A modern, feature-rich web application for building professional CVs and Resumes — with live preview, multiple templates, AI assistance, and PDF export.



## Features

- **Multiple CV Templates** — Choose from 15+ professionally designed templates (Classic, Modern, Bold, Elegant, Tech, Academic, Medical, Infographic, Europass, and more)
- **Resume Builder** — Dedicated resume builder with its own set of templates and form sections
- **AI Assistant** — Built-in AI-powered text suggestions to help write better CV content
- **Color Themes** — Customize your CV with a variety of color palettes
- **Live Preview** — See your changes reflected in real time as you type
- **Export Options** — Export your CV/Resume as a **PDF** or **DOCX** file
- **Reset / Start Fresh** — Quickly clear all data and start a new CV
- **payment Modal** — Premium features gating with a payment flow



## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **React Context API** | Global State Management |
| **CSS (Vanilla)** | Styling & Animations |
| **html2pdf / print** | PDF Export |
| **docx** | DOCX Export |



## Project Structure

```
src/
├── components/
│   ├── forms/          # CV section forms (Education, Experience, Skills, etc.)
│   ├── resume-forms/   # Resume-specific forms
│   ├── templates/      # All CV template components
│   ├── resume-template/ # Resume template component
│   └── common/         # Shared components (AI Assistant, AI TextArea)
├── context/
│   ├── CVContext.jsx    # Global CV state
│   └── ResumeContext.jsx # Global Resume state
├── pages/
│   ├── LandingPage.jsx  # Home/Landing page
│   ├── HomePage.jsx     # Dashboard
│   ├── EditorPage.jsx   # CV Editor
│   └── ResumeEditorPage.jsx # Resume Editor
├── services/
│   └── aiService.js     # AI integration service
└── utils/
    ├── colorThemes.js   # Color theme definitions
    ├── exportDocx.js    # CV DOCX export utility
    ├── exportResumeDocx.js # Resume DOCX export utility
    ├── templates.js     # Template registry
    └── tips.js          # CV writing tips
```



## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/raphael-124/ADVANCE-CV-AND-RESUME-GENERATOR.git

# 2. Navigate into the project folder
cd ADVANCE-CV-AND-RESUME-GENERATOR

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser and go to: `http://localhost:5173`



## Screenshots

> *(Coming soon — add screenshots of the Landing Page, CV Editor, and exported PDF here)*



## Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open an [issue](https://github.com/raphael-124/ADVANCE-CV-AND-RESUME-GENERATOR/issues) or submit a pull request.


## License

This project is open source and available under the [MIT License](LICENSE).



## Author

**raphael-124**  
GitHub: [@raphael-124](https://github.com/raphael-124)
