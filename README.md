# ClimaCast AI 🌦️

<div align="center">

![ClimaCast AI Banner](https://img.shields.io/badge/ClimaCast%20AI-NASA%20Powered-0ea5e9?style=for-the-badge&logo=nasa)

**Climate Predictions Powered by AI**

*Bringing NASA-grade climate intelligence to everyone*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com)

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🎥 Video Demo](#) • [🐛 Report Bug](#) • [✨ Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Team](#team)
- [Acknowledgments](#acknowledgments)

---

## 🌍 About The Project

**ClimaCast AI** is not just another weather app—it's a **Climate Action Platform** powered by IBM-NASA's Prithvi WxC foundation model with 2.3 billion parameters. While traditional weather apps fetch data from APIs, we run foundation model inference to provide AI-driven climate intelligence.

### 🎯 The Problem

- Climate change is causing a 40% increase in extreme weather events
- Traditional weather apps show "what" will happen, not "why" or "what to do"
- Government agencies, farmers, and planners need **climate intelligence**, not just forecasts
- $280B annual global economic losses from climate disasters

### 💡 Our Solution

ClimaCast AI transforms raw climate data into actionable intelligence using:
- **IBM-NASA Prithvi WxC** foundation model (2.3B parameters)
- **40 years** of NASA MERRA-2 data (160 atmospheric variables)
- **AI-enhanced predictions** with confidence scoring (70-98%)
- **Proactive alerts** with actionable recommendations

### 🎪 Built For

This project was created for **INNOTECH 2025** to demonstrate how foundation models can democratize access to NASA-grade climate intelligence.

**Team:** Foresighters

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Foundation Model Predictions** - Using IBM-NASA Prithvi WxC (2.3B parameters)
- **Confidence Scoring** - 70-98% transparency in predictions
- **Atmospheric Pattern Analysis** - 6 distinct patterns (hot_dry, cold_wet, stormy, etc.)
- **Extreme Weather Detection** - Automatic severity assessment with recommendations

### 📊 Rich Visualizations
- **Interactive Charts** - Recharts with temperature trends and confidence intervals
- **7-Day Forecasts** - Detailed daily predictions with min/max/average
- **Weather Cards** - Beautiful card-based layout with glassmorphism
- **Real-time Updates** - Live data from backend API

### 🎨 Modern Design
- **Glassmorphism UI** - Semi-transparent, blurred backgrounds
- **Dark Mode** - Seamless theme switching with localStorage persistence
- **Smooth Animations** - Framer Motion for natural transitions
- **Responsive Design** - Mobile-first, works on all devices
- **Aceternity-Inspired** - Modern design system with professional polish

### 🗺️ Location Features
- **City Search** - Real-time autocomplete with Nominatim (OpenStreetMap)
- **Popular Cities** - Quick access to major cities worldwide
- **Geolocation** - "Use My Location" with browser API
- **Global Coverage** - Works for any coordinates on Earth

### 🚨 Proactive Alerts
- **Extreme Heat Warnings** - Temperatures >35°C
- **Extreme Cold Alerts** - Temperatures <0°C
- **Heavy Precipitation** - Rainfall >50mm
- **Strong Wind Warnings** - Wind speed >60 km/h
- **Actionable Recommendations** - What to do, not just what will happen

---

## 🛠️ Technology Stack

### Frontend
```
React 18.2.0          - UI library with hooks and concurrent rendering
Vite 5.0.8            - Lightning-fast build tool
Tailwind CSS 3.4      - Utility-first CSS framework
Framer Motion 11.0    - Production-ready animations
Recharts 2.10         - Composable charting library
Lucide React          - Beautiful SVG icon library
Axios                 - Promise-based HTTP client
React Router DOM      - Client-side routing
```

### Backend
```
Node.js 18+           - JavaScript runtime
Express 4.18          - Web application framework
Axios                 - HTTP client for Hugging Face API
Dotenv                - Environment variable management
CORS                  - Cross-Origin Resource Sharing
```

### AI/ML
```
IBM-NASA Prithvi WxC  - 2.3B parameter foundation model
Hugging Face API      - Model inference endpoint
NASA MERRA-2          - 40 years of climate data (160 variables)
```

### DevOps & Deployment
```
Vercel                - Frontend hosting (recommended)
Railway               - Backend API hosting (recommended)
Docker                - Containerization (optional)
GitHub Actions        - CI/CD pipelines (optional)
```

### APIs & Services
```
Nominatim             - Free geocoding (OpenStreetMap)
Hugging Face API      - Foundation model inference
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Hugging Face account** ([Sign up free](https://huggingface.co/))

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/climacast-ai.git
cd climacast-ai
```

#### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Hugging Face API token to .env
# Get token from: https://huggingface.co/settings/tokens
```

**Backend `.env` configuration:**
```env
PORT=5000
NODE_ENV=development
HUGGINGFACE_API_KEY=hf_your_token_here
PRITHVI_MODEL=ibm-nasa-geospatial/Prithvi-WxC-1.0-2300M-rollout
CACHE_TTL=3600
```

```bash
# Start backend server
npm start

# Backend will run on http://localhost:5000
```

#### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add backend API URL to .env
```

**Frontend `.env` configuration:**
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Start development server
npm run dev

# Frontend will run on http://localhost:5173
```

#### 4️⃣ Visit the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
climacast-ai/
│
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Base UI components (Button, Card, etc.)
│   │   │   ├── layout/        # Layout components (Header, Footer)
│   │   │   ├── dashboard/     # Dashboard-specific components
│   │   │   ├── weather/       # Weather visualization components
│   │   │   ├── home/          # Landing page components
│   │   │   ├── features/      # Features page components
│   │   │   └── about/         # About page components
│   │   ├── pages/             # Page-level components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Features.jsx   # Features showcase
│   │   │   ├── Dashboard.jsx  # Main weather dashboard
│   │   │   ├── About.jsx      # About team
│   │   │   ├── HowItWorks.jsx # Technology explanation
│   │   │   └── Contact.jsx    # Contact form
│   │   ├── services/          # API integration
│   │   │   ├── api.js         # Backend API client
│   │   │   └── geocoding.js   # Nominatim geocoding
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useWeather.js  # Weather data management
│   │   │   ├── useDarkMode.js # Dark mode toggle
│   │   │   ├── useDocumentTitle.js # Page titles
│   │   │   └── useMetaTags.js # SEO meta tags
│   │   ├── utils/             # Utility functions
│   │   │   ├── cn.js          # Class name merger
│   │   │   ├── formatters.js  # Date/number formatters
│   │   │   └── constants.js   # App constants
│   │   ├── App.jsx            # Root component with routing
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles + Tailwind
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind customization
│   └── README.md              # Frontend documentation
│
├── backend/                    # Node.js backend API
│   ├── controllers/
│   │   └── predictionController.js  # API route handlers
│   ├── routes/
│   │   └── predictionRoutes.js      # Express routes
│   ├── services/
│   │   └── prithviService.js        # Prithvi WxC integration
│   ├── middleware/
│   │   ├── errorHandler.js          # Error handling
│   │   └── rateLimiter.js           # Rate limiting
│   ├── utils/
│   │   └── cache.js                 # Caching logic
│   ├── server.js               # Express app entry point
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   └── README.md              # Backend documentation
│
├── docs/                       # Documentation
│   ├── API.md                 # API documentation
│   ├── DEPLOYMENT.md          # Deployment guides
│   └── CONTRIBUTING.md        # Contribution guidelines
│
├── .gitignore                 # Git ignore rules
├── LICENSE                    # MIT License
└── README.md                  # This file
```

---

## 📡 API Documentation

### Backend Endpoints

#### 1. Get Weather Forecast

**POST** `/api/predictions/prithvi/forecast`

Generate 7-day weather forecast using Prithvi WxC foundation model.

**Request Body:**
```json
{
  "latitude": 28.6139,
  "longitude": 77.2090,
  "days": 7
}
```

**Response:**
```json
{
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "forecast": [
    {
      "date": "2025-11-06",
      "day": 1,
      "temperature": {
        "min": 22.3,
        "max": 32.1,
        "mean": 27.2
      },
      "precipitation": {
        "total": 0.5,
        "probability": 15
      },
      "wind": {
        "maxSpeed": 12.5,
        "direction": "NW"
      },
      "humidity": 65,
      "weatherCode": 2,
      "confidence": 92,
      "atmosphericPattern": "hot_dry"
    }
    // ... more days
  ],
  "metadata": {
    "model": "Prithvi-WxC-1.0-2300M",
    "generatedAt": "2025-11-06T05:00:00Z"
  }
}
```

#### 2. Detect Extreme Weather

**GET** `/api/predictions/prithvi/extreme-weather`

Detect extreme weather conditions and generate alerts.

**Query Parameters:**
- `latitude` (required): Latitude (-90 to 90)
- `longitude` (required): Longitude (-180 to 180)

**Response:**
```json
{
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "extremeEvents": [
    {
      "date": "2025-11-08",
      "day": 3,
      "type": "extreme_heat",
      "severity": "high",
      "description": "Extreme heat conditions detected. Temperature reaching 42°C.",
      "recommendation": "Stay indoors during peak hours, stay hydrated, avoid strenuous activities."
    }
  ],
  "safetyScore": 65
}
```

#### 3. Health Check

**GET** `/api/`

Check if backend server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "ClimaCast AI Backend API",
  "version": "1.0.0"
}
```

### Frontend API Integration

```javascript
// Using the custom hook
import { useWeather } from './hooks/useWeather';

function Dashboard() {
  const { forecast, loading, error, fetchForecast } = useWeather();

  useEffect(() => {
    fetchForecast(28.6139, 77.2090, 7);
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <Alert variant="danger" title={error} />;

  return <ForecastChart forecast={forecast} />;
}
```

---

## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing.png)
*Modern hero section with animated gradient background*

### Dashboard
![Dashboard](./screenshots/dashboard.png)
*7-day forecast with interactive charts and confidence scores*

### Extreme Weather Alerts
![Alerts](./screenshots/alerts.png)
*Proactive warnings with actionable recommendations*

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)
*Seamless theme switching with localStorage persistence*

### Mobile View
![Mobile](./screenshots/mobile.png)
*Fully responsive design for all devices*

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Completed)
- [x] Backend API with Prithvi WxC integration
- [x] Frontend dashboard with React + Tailwind
- [x] 7-day weather forecasts
- [x] Extreme weather detection
- [x] Interactive charts and visualizations
- [x] Dark mode support
- [x] Geocoding with Nominatim

### 🚧 Phase 2: Enhancement (In Progress)
- [ ] Multi-page website (Landing, Features, About, Contact)
- [ ] Historical climate analysis
- [ ] Multi-location comparison
- [ ] Export forecast reports (PDF/CSV)
- [ ] Email alerts for extreme weather

### 🔮 Phase 3: Mobile & Integration (3-6 months)
- [ ] React Native mobile app (iOS & Android)
- [ ] Push notifications
- [ ] Offline mode with cached predictions
- [ ] Widget for quick access
- [ ] Integration APIs (Webhooks, REST)
- [ ] Slack/Discord/Teams notifications

### 🌟 Phase 4: Advanced Features (6-12 months)
- [ ] Agriculture-specific module
  - Crop recommendations
  - Irrigation scheduling
  - Frost warnings
- [ ] Disaster preparedness platform
  - Multi-hazard early warning
  - Evacuation route planning
- [ ] AI insights engine
  - Natural language queries
  - ChatGPT-style interface
- [ ] Climate change visualization
  - 10-year prediction models
  - Carbon emission correlation

### 🚀 Phase 5: Global Platform (1-2 years)
- [ ] Hyperlocal predictions (neighborhood-level)
- [ ] Climate policy recommendation engine
- [ ] Blockchain-based climate credits
- [ ] Global collaboration network for researchers

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### Ways to Contribute

1. **Report Bugs** - Found a bug? Open an issue
2. **Suggest Features** - Have an idea? Start a discussion
3. **Improve Docs** - Help us make docs better
4. **Submit PRs** - Code contributions are welcome
5. **Spread the Word** - Star the repo, share on social media

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Frontend: ESLint + Prettier
- Backend: ESLint with Node.js rules
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this project freely. Just include the original license.

---

## 👥 Team Foresighters

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/yourusername">
        <img src="https://github.com/yourusername.png" width="100px;" alt=""/>
        <br />
        <sub><b>Your Name</b></sub>
      </a>
      <br />
      Full-Stack Developer
    </td>
    <td align="center">
      <a href="https://github.com/teammate1">
        <img src="https://github.com/teammate1.png" width="100px;" alt=""/>
        <br />
        <sub><b>Teammate 1</b></sub>
      </a>
      <br />
      Backend Developer
    </td>
    <td align="center">
      <a href="https://github.com/teammate2">
        <img src="https://github.com/teammate2.png" width="100px;" alt=""/>
        <br />
        <sub><b>Teammate 2</b></sub>
      </a>
      <br />
      Frontend Developer
    </td>
  </tr>
</table>

**Connect with us:**
- 📧 Email: team@climacast.ai
- 🐦 Twitter: [@climacastai](https://twitter.com/climacastai)
- 💼 LinkedIn: [ClimaCast AI](https://linkedin.com/company/climacastai)

---

## 🙏 Acknowledgments

This project wouldn't be possible without:

- **IBM & NASA** - For open-sourcing the Prithvi WxC foundation model
- **Hugging Face** - For providing free model inference API
- **OpenStreetMap** - For Nominatim geocoding service
- **React Team** - For the amazing React library
- **Tailwind Labs** - For Tailwind CSS
- **Vercel** - For free frontend hosting
- **Railway** - For backend deployment

### Technologies & Libraries Used

- [IBM-NASA Prithvi WxC](https://huggingface.co/ibm-nasa-geospatial/Prithvi-WxC) - Foundation model
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Recharts](https://recharts.org/) - Charts
- [Lucide](https://lucide.dev/) - Icons
- [Nominatim](https://nominatim.org/) - Geocoding
- [Express](https://expressjs.com/) - Backend framework

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/climacast-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/climacast-ai?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/climacast-ai?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/climacast-ai)
![GitHub issues](https://img.shields.io/github/issues/yourusername/climacast-ai)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/climacast-ai)

---

## 💬 Support

Need help? Have questions?

- 📖 [Read the Docs](./docs/API.md)
- 💬 [Start a Discussion](https://github.com/yourusername/climacast-ai/discussions)
- 🐛 [Report a Bug](https://github.com/yourusername/climacast-ai/issues)
- 📧 Email: support@climacast.ai

---

## ⭐ Show Your Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on Twitter
- 📝 Writing a blog post about it
- 💰 Sponsoring the project

---

<div align="center">

**Built with ❤️ by Team Foresighters**

*Making NASA-grade climate intelligence accessible to everyone*

[⬆ Back to Top](#climacast-ai-)

</div>
