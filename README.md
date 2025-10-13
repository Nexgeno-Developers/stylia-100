# Stylia E-commerce Platform

## Project Structure

This project follows Next.js 15 app router best practices with a focus on scalability, reusability, and clean architecture.

### Key Features

- **Animation Libraries**: Motion.dev, Lottie, GSAP support
- **Component Architecture**: Modular and reusable components
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized for Next.js 15 features

### Folder Structure

```
stylia/
├── app/                    # Next.js 15 App Router
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── forms/             # Form components
│   ├── product/           # Product components
│   └── animations/        # Animation wrappers
├── sections/              # Page sections
│   ├── home/             # Home page sections
│   ├── product/          # Product page sections
│   └── common/           # Shared sections
├── lib/                  # Core application logic
│   ├── animations/       # Animation configurations
│   ├── utils/            # Utility functions
│   ├── constants/         # App constants
│   ├── hooks/            # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── store/            # State management
├── assets/               # Static assets
├── styles/               # Global styles
└── public/               # Public static files
```

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Install animation libraries:

```bash
npm install framer-motion lottie-react gsap
npm install clsx tailwind-merge
```

3. Run the development server:

```bash
npm run dev
```

### Animation Libraries

- **Motion.dev**: For React-based animations
- **Lottie**: For complex vector animations
- **GSAP**: For advanced timeline and scroll-triggered animations

### Development Guidelines

1. **Components**: Place reusable components in `components/`
2. **Sections**: Page-specific sections go in `sections/`
3. **Animations**: Animation configs are centralized in `lib/animations/`
4. **Types**: All TypeScript types are defined in `lib/types/`
5. **Constants**: App-wide constants are in `lib/constants/`
