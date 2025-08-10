# MintForgex Components

A sophisticated, animated interface for AI-powered content creation with smooth transitions and interactive elements.

## 🚀 Features

- ✨ **Animated Title**: Smooth morphing text that changes on search interaction
- 🖊️ **Pencil Animation**: SVG-based drawing animation with glowing effects
- 🖼️ **Dynamic Gallery**: Interactive image hover effects with cinematic transitions
- 🌐 **Parallax Background**: Animated grid lines that move with scroll
- 🔍 **Interactive Search**: Smooth focus transitions and glow effects
- 📱 **Responsive Design**: Works perfectly on all device sizes

## 📦 Installation

1. **Extract the zip file** to your project directory

2. **Install dependencies**:
\`\`\`bash
npm install lucide-react class-variance-authority clsx tailwind-merge
\`\`\`

3. **Add fonts to your layout**:
\`\`\`tsx
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  variable: "--font-poppins",
})

// Add to your body className: \${inter.variable} \${poppins.variable}
\`\`\`

4. **Import the CSS**:
\`\`\`css
@import './styles/mintforgex.css';
\`\`\`

## 🎯 Usage

\`\`\`tsx
import MintForgex from './components/MintForgex'

export default function Page() {
  return <MintForgex />
}
\`\`\`

## 📁 File Structure

\`\`\`
MintForgex-Components/
├── components/
│   ├── MintForgex.tsx          # Main component
│   ├── AnimatedTitle.tsx       # Title morphing logic
│   ├── PencilAnimation.tsx     # SVG pencil drawing
│   ├── ImageGallery.tsx        # Interactive image grid
│   └── GridBackground.tsx      # Parallax background
├── hooks/
│   └── useMintForgex.ts        # Custom hook for state management
├── constants/
│   └── mintforgex.ts           # Configuration constants
├── types/
│   └── mintforgex.ts           # TypeScript interfaces
├── styles/
│   └── mintforgex.css          # Custom CSS animations
├── package.json                # Dependencies
└── README.md                   # This file
\`\`\`

## 🎨 Customization

### Change Title Phrases
Edit \`constants/mintforgex.ts\`:
\`\`\`tsx
export const TITLE_PHRASES = [
  "Your Custom Phrase",
  "Another Great Idea",
  // Add more phrases...
]
\`\`\`

### Update Images
Replace image paths in \`CONTENT_IMAGES\` array:
\`\`\`tsx
export const CONTENT_IMAGES = [
  {
    funny: "/your-funny-image.jpg",
    serious: "/your-serious-image.jpg",
  },
  // Add more image sets...
]
\`\`\`

### Modify Colors
Update CSS variables in \`styles/mintforgex.css\` or use Tailwind classes.

## 🔧 Technical Details

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Animations**: CSS transitions with easing functions
- **TypeScript**: Full type safety included

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Feel free to customize and extend these components for your needs!

## 📄 License

MIT License - feel free to use in your projects.
\`\`\`

## 🆘 Support

If you encounter any issues:
1. Check that all dependencies are installed
2. Ensure your Next.js version is 14+
3. Verify Tailwind CSS is properly configured
4. Make sure the image paths exist in your public folder

---

**Happy coding! 🚀**
