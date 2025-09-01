# Cosmic Trading Preferences Questionnaire

A modern, professional Next.js application featuring a cosmic-themed questionnaire for collecting trading preferences. Built with the latest Next.js 15 App Router, featuring glassmorphism effects, smooth animations, and a responsive design.

## ✨ Features

- **Cosmic Theme**: Beautiful space-themed design with parallax background
- **Glassmorphism UI**: Semi-transparent blurred cards with glowing borders
- **Multi-step Form**: Wizard-like questionnaire progression with progress tracking
- **Responsive Design**: Mobile-first approach with smooth animations
- **Form Validation**: Comprehensive validation using React Hook Form and Zod
- **Data Persistence**: Submissions saved to local JSON file
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: React Icons
- **Fonts**: Roboto (headings), Open Sans (body)

## 🎨 Design System

### Colors
- **Background**: #050505 (deep black)
- **Secondary Dark**: #1A1A1A
- **Text Light**: #FFFFFF
- **Accents**: #7F42FF (purple), #6745FF (blue), #A042FF (purple variant)
- **Gradient**: Blue (#3D5AFE) to Purple (#A942FF)

### Typography
- **Headings**: Roboto (Bold, Medium)
- **Body**: Open Sans (Regular)

## 📱 Questionnaire Structure

1. **Trading Type**: Stocks, Crypto, or Both
2. **Platforms** (conditional): Coinbase, Binance, Bybit, Kucoin, Kraken, Other
3. **Brokers** (conditional): Fidelity, Interactive Brokers, Exness, Other
4. **Investment Range**: 0-1K, 1K-10K, 10K-100K, 100K+
5. **Contact**: Email submission

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd cosmic-questionnaire
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open your browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cosmic-questionnaire/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── submit/
│   │   │       └── route.ts          # Form submission API
│   │   ├── globals.css               # Global styles & custom CSS
│   │   ├── layout.tsx                # Root layout with metadata
│   │   └── page.tsx                  # Main landing page
│   └── components/
│       └── QuestionnaireForm.tsx     # Multi-step form component
├── public/
│   └── cosmic-space-scene-with-astronaut-floating-in-spac.png
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Background Image**: Replace the image in `public/` folder
- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Questions**: Update the form structure in `QuestionnaireForm.tsx`

## 📊 Data Storage

Form submissions are automatically saved to `submissions.json` in the project root. Each submission includes:

- Unique ID
- Timestamp
- All form responses
- Email validation

## 🎭 Animations & Effects

- **Floating Elements**: Subtle floating cosmic particles
- **Glassmorphism**: Semi-transparent blurred backgrounds
- **Smooth Transitions**: Framer Motion-powered animations
- **Progress Tracking**: Animated progress bar with gradient
- **Hover Effects**: Interactive elements with glow effects

## 📱 Responsive Features

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets for mobile users
- **Adaptive Layout**: Responsive grid systems
- **Progressive Enhancement**: Works on all devices

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm run start
```

## 🔍 SEO & Performance

- **Meta Tags**: Comprehensive Open Graph and Twitter Card support
- **Semantic HTML**: Proper heading hierarchy and accessibility
- **Performance**: Optimized images and minimal bundle size
- **Accessibility**: ARIA labels and keyboard navigation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
