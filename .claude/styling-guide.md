# North Star AGI Frontend Styling Guide

## Architecture & Tech Stack

**Framework**: Astro with React integration
**Styling**: Tailwind CSS + shadcn/ui components + Custom CSS
**Utility Library**: clsx + tailwind-merge (via cn utility)

## Core Design System

### Color Palette
- **Primary Background**: Pure black (#000) with subtle gradients
- **Text Colors**: White primary, white/60-90 opacity variations for secondary text
- **Accent Colors**:
  - Blue: #3b82f6 (Events theme)
  - Orange: #f59e0b (Robotics theme) 
  - Green: #10b981 (AI theme)
- **Border Colors**: white/20-40 opacity for subtle borders
- **Status Colors**: Green (completed), Blue (upcoming), Gray (coming-soon)

### Typography
- **Font**: ui-monospace system font stack (monospace)
- **Hierarchy**: 4xl-6xl for heroes, 2xl-3xl for section headers, base/sm for body text
- **Weight**: Bold for emphasis, regular/light for body text

### Layout System
- **Container**: Max-width 6xl-7xl with auto margins
- **Spacing**: 20-32 py for sections, 4-8 px for components
- **Grid**: Responsive grid layouts (1->2->3 columns on mobile->tablet->desktop)

## Component Patterns

### Navigation (Navbar)
- **Style**: Pill-shaped navbar with backdrop blur
- **Position**: Fixed top with z-50
- **Background**: Black with white/20 border
- **Interactive**: Hover scale effects (105-110%), mobile menu overlay

### Cards
- **Base**: Rounded-3xl with backdrop blur
- **Borders**: white/20 base, white/40 on hover
- **Backgrounds**: Theme-based gradients with low opacity
- **Hover**: Scale 102%, enhanced border opacity
- **Status**: Color-coded backgrounds and borders

### Buttons
- **Primary**: White bg, black text, rounded-full
- **Secondary**: Transparent bg, white text, white border
- **CTA**: Scale 105% on hover with shadow effects
- **States**: Using shadcn/ui button variants (default, destructive, outline, secondary, ghost, link)

### Images & Media
- **Containers**: Aspect ratios with overflow hidden
- **Hover**: Scale 105% transforms
- **Overlays**: Black gradients (from-black/80 to transparent)

## Animation System

### Keyframe Animations
- **Fade-in**: translateY(-10px to 0) with opacity
- **Glitch Effects**: Text shadow with cyan/magenta colors  
- **Cross/Star**: Height/width scaling animations
- **Pulse/Glow**: Scaling with opacity changes
- **Scroll Bounce**: translateY with opacity for indicators

### Stagger Patterns
- Sequential fade-ins with delays (0.3s increments)
- Timeline items with progressive delays
- Hover states with transform and scale

### Transition Standards
- **Duration**: 300ms for interactions, 700ms-1s for complex animations
- **Easing**: ease-out for entrances, ease-in-out for loops
- **Properties**: transform, opacity, colors, border-colors

## Responsive Design

### Breakpoints
- Mobile: Base styles
- Tablet: md: prefix
- Desktop: lg: prefix

### Layout Adaptations
- Text scales: 4xl->6xl, 2xl->3xl responsive jumps
- Grid columns: 1->2->3 progression
- Spacing: Smaller on mobile (py-20 vs py-32)
- Navigation: Hamburger menu on mobile with overlay

## Custom CSS Integration

### Global Styles (src/styles/globals.css)
- CSS custom properties for theming
- Dark mode variants
- Base layer resets with Tailwind

### Component-Level Styles
- Scoped `<style>` tags in .astro files
- Complex animations and keyframes
- Advanced selectors and pseudo-elements

## shadcn/ui Components
- **Button**: Variant-based with cva (class-variance-authority)
- **Card**: Semantic components (Card, CardHeader, CardContent, etc.)
- **Badge**: For status indicators
- **Utils**: cn() function for conditional classes

When making any changes, maintain this consistent design language with dark themes, subtle animations, monospace typography, and the established color scheme.