# George Okello - Portfolio & Research Hub

A highly interactive, performance-optimized personal portfolio and research hub for George Okello Ouma, Computational Neuroscientist & AI Researcher. Built with modern web technologies to showcase academic achievements, professional experience, and research publications.

## Features
- **Immersive Interactive Canvas**: Custom WebGL/Canvas neural network background that reacts to scroll and user interactions.
- **Dynamic Theming**: Polished light and dark modes with distinct visual identities.
- **Academic Timeline**: Staggered scroll animations powered by Framer Motion.
- **SEO Optimized**: Pre-configured React Helmet metadata, Open Graph tags, and standard robots guidelines.
- **Responsive Design**: Tailored experiences for mobile, tablet, and desktop viewing.

## Tech Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: React Helmet Async

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Containerization

You can easily run this application in an isolated Docker container.

### Using Docker Compose (Recommended)
1. Build and start the container:
   ```bash
   docker-compose up -d --build
   ```
2. Access the application at `http://localhost:8080`

### Using Docker CLI
1. Build the image:
   ```bash
   docker build -t george-portfolio .
   ```
2. Run the container:
   ```bash
   docker run -p 8080:80 -d george-portfolio
   ```

## Deployment

### GitHub Pages / Static Hosting
This application is a Single Page Application (SPA) and can be easily deployed to GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

1. Build the application:
   ```bash
   npm run build
   ```
2. The compiled assets will be available in the `dist/` directory, ready to be served by any static file host.

## License
MIT License
