# Bagel Bros Design System

## 🎨 Design Philosophy: Brutalist Luxury

The Bagel Bros redesign embraces a **"Brutalist Luxury"** aesthetic that combines:
- Raw, unapologetic brutalist design principles
- Premium streetwear sophistication
- Bold typography that dominates the viewport
- High contrast and aggressive visual hierarchy
- Zero-compromise attitude matching the brand voice

---

## 🔤 Typography

### Font Families

**Display Font: Bebas Neue**
- Purpose: Headlines, numbers, major impact moments
- Weight: 400 (regular only)
- Style: All caps, ultra-condensed, commanding presence
- Usage: H1-H6, product titles, CTAs, navigation

**Body Font: Space Mono**
- Purpose: All body text, labels, descriptions
- Weights: 400 (regular), 700 (bold)
- Style: Monospace, technical, confident
- Usage: Paragraphs, buttons, forms, metadata

### Type Scale

```css
display-xl: clamp(4rem, 12vw, 10rem)     /* Hero headlines */
display-lg: clamp(3rem, 8vw, 6rem)       /* Section headers */
display-md: clamp(2rem, 5vw, 4rem)       /* Subheadings */
display-sm: clamp(1.5rem, 3vw, 2.5rem)   /* Card titles */
```

### Type Characteristics
- **Line Height:** 0.9-1.0 for display (tight, impactful)
- **Letter Spacing:** 0.02em for display, wider tracking for small caps
- **Text Transform:** Uppercase for emphasis and labels

---

## 🎨 Color Palette

### Primary Colors

```css
--bagel-tan: #D4A574      /* The hero accent */
--bagel-green: #4A7C59    /* Supporting accent */
--cream: #F5F1E8          /* Main background */
--true-black: #0A0A0A     /* Text and borders */
--true-white: #FEFEFE     /* Inverted text */
```

### Color Usage

**Bagel Tan (#D4A574)**
- Primary CTA backgrounds
- Hover states
- Urgency badges ("Only 5 left")
- Brand accents and highlights

**Cream (#F5F1E8)**
- Main page background
- Card backgrounds
- Subtle contrast areas

**True Black (#0A0A0A)**
- All borders (always 3px thick)
- Body text
- Dark section backgrounds
- Brutal shadows

**True White (#FEFEFE)**
- Text on dark backgrounds
- Not pure white (too harsh)

---

## 🔲 Layout Principles

### Grid System
- Max width: 1600px
- Padding: 4px mobile, 24px tablet, 32px desktop
- Asymmetric layouts preferred over centered grids
- Large white space = premium feel

### Spacing Scale
```
3px  - Borders (always)
4px  - Micro gaps
8px  - Small spacing
12px - Medium spacing
16px - Base spacing
24px - Large spacing
32px - Section spacing
```

### Border Style: "Brutal"
```css
border: 3px solid #0A0A0A;
box-shadow: 6px 6px 0 #0A0A0A;
```

On hover:
```css
transform: translate(-2px, -2px);
box-shadow: 8px 8px 0 #0A0A0A;
```

---

## 🎭 Components

### Buttons

**Primary CTA**
```
Background: Bagel Tan
Border: 3px solid black
Shadow: Brutal (6px 6px)
Hover: Lift effect (brutal shadow grows)
Text: Space Mono, bold, uppercase, 0.05em tracking
```

**Secondary Button**
```
Background: Transparent
Border: 3px solid black
Hover: Fill with black, white text
```

**Disabled State**
```
Background: Black 20% opacity
Border: Black 20% opacity
Text: Black 40% opacity
Cursor: not-allowed
```

### Cards

**Product Card**
```
Border: 3px solid black
Aspect ratio: 3:4 for images
Image hover: Scale 1.05, slow (700ms)
Overlay hover: Bagel tan 20% opacity
Quick view hint: Slides up from bottom
```

**Info Card**
```
Border: Brutal style
Background: Varies (cream, black, tan)
Padding: 32px-48px
```

### Forms

**Input Fields**
```
Border: 3px solid
Background: Cream/transparent
Font: Space Mono
Padding: 20px 24px
Focus: Border color to bagel tan
```

**Size Selector**
```
Grid: 4 columns
Each button: Square aspect ratio
Border: 3px solid black
Selected: Bagel tan background + brutal shadow
Hover: Bagel tan background
Low stock: Pulsing indicator dot
```

---

## ✨ Animations

### Timing Functions
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* Smooth deceleration */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful bounce */
```

### Animation Library

**Slide Up (Page Load)**
```css
animation: slideUp 0.8s var(--ease-out);
opacity: 0 → 1
transform: translateY(40px) → translateY(0)
```

**Stagger Delays**
```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
/* etc up to .stagger-6 */
```

**Hover Lift**
```css
transition: transform 0.4s var(--ease-bounce);
hover: translateY(-8px)
```

**Brutal Hover (Buttons/Cards)**
```css
hover: translate(-2px, -2px) + shadow grows
duration: 200ms
```

**Image Scale**
```css
transition: transform 0.7s ease-out;
hover: scale(1.05)
```

---

## 🖼️ Image Guidelines

### Photography Style
- **Lifestyle shots:** Players on court, candid moments
- **Product shots:** Clean, minimal backgrounds
- **Cropping:** Aggressive, asymmetric
- **Aspect ratios:**
  - Hero: 16:9
  - Product: 3:4
  - Lifestyle: 4:5

### Image Placeholders
All use the "6-0" motif with light gray background:
```jsx
<div className="font-display text-9xl text-true-black/10">6-0</div>
```

---

## 📐 Responsive Breakpoints

```css
mobile:  < 640px   (base styles)
tablet:  640px+    (sm:)
laptop:  1024px+   (lg:)
desktop: 1600px+   (max container width)
```

### Mobile-First Approach
- Stack layouts vertically
- Full-width CTAs
- Larger touch targets (min 44px)
- Simplified navigation
- Sticky headers

---

## 🎯 Key Design Patterns

### Hero Sections
```
- Massive headlines (display-xl)
- Background graphic element (huge "6-0" at 5% opacity)
- Asymmetric layout
- Scroll indicator (bouncing)
```

### Section Headers
```
- Brutalist style (3px borders, shadows)
- Bagel tan accent words
- Uppercase labels/eyebrows
- Generous spacing
```

### CTAs
```
- Never subtle
- Always bordered
- Brutal shadow on hover
- Uppercase + tracking
- Clear hierarchy
```

### Scarcity Messaging
```
- Pulsing indicators
- Bagel tan backgrounds
- Bold text
- Positioned prominently
```

---

## 🌟 Brand Moments

### Homepage Hero
- Full viewport height
- Massive animated headline
- Background "6-0" graphic
- Staggered fade-in elements

### Countdown Timer
- Brutal bordered boxes
- Pulsing second indicator
- Hover state: Bagel tan background
- Clear hierarchy

### Product Hover
- Slow scale animation (700ms)
- Bagel tan overlay (20%)
- "View Details" hint slides up
- Status badges (top right)

### Cart Drawer
- Slides from right
- Black header section
- Brutal bordered items
- Prominent checkout CTA

---

## 🚫 Design Don'ts

❌ **Never:**
- Use rounded corners (except specific cases)
- Use gradients (solid colors only)
- Use drop shadows (brutal shadows only)
- Use subtle animations (commit fully)
- Use centered layouts everywhere
- Use small type for headlines
- Use passive CTAs

✅ **Always:**
- 3px borders
- Brutal shadows
- Bold typography
- High contrast
- Generous spacing
- Commit to the aesthetic
- Make it memorable

---

## 🎨 Suggested Real Photography

### Hero Section
- Wide shot of 4 players on outdoor padel court
- Golden hour lighting
- Players wearing Bagel Bros gear
- Natural, candid moments (not posed)

### Product Lifestyle
- Close-up of player serving in branded tee
- Detail shot of logo/branding
- Post-match group shot (sweaty, happy, defeated)
- Court-side product flat lay

### About Page
- Action shots of actual bagel moments (scoreboard showing 6-0)
- Candid reactions to getting bageled
- Group celebration despite losing
- Lifestyle moments off the court

---

## 📱 Mobile Optimizations

### Touch Targets
- Minimum 44px × 44px
- Size selector buttons: 60px+
- Navigation items: 48px height
- Cart icons: 48px hit area

### Layout Adjustments
- Single column grids
- Sticky CTAs at bottom
- Larger type scale
- Simplified navigation (hamburger menu alternative)

### Performance
- Next.js Image optimization
- Lazy loading below fold
- Font preloading
- Edge caching (Vercel)

---

## 🔄 Animation Performance

### CSS-Only Animations
- Transforms (not position)
- Opacity changes
- Box-shadow (brutal style)
- Border-color transitions

### GPU Acceleration
```css
transform: translateZ(0);
will-change: transform;
```

---

## 🎬 Page Load Sequence

1. **Instant:** Layout, borders, backgrounds
2. **0.1s:** Hero headline fades up
3. **0.2s:** Subheadline fades up
4. **0.3s:** CTA appears
5. **0.4s+:** Additional content staggers in

All using `animate-slide-up` with `stagger-N` classes.

---

## 📊 Design Success Metrics

**Visual Impact**
- Headlines command attention immediately
- Brand personality is unmistakable
- Users remember the aesthetic

**Usability**
- CTAs are obvious and clickable
- Navigation is intuitive
- Mobile experience is fast

**Brand Alignment**
- Confident, not apologetic
- Premium but approachable
- Funny without being childish

---

## 🛠️ Implementation Notes

### Tailwind Utilities
Custom utilities in `globals.css`:
- `.border-brutal` - 3px border + shadow
- `.border-brutal-hover` - Hover lift effect
- `.hover-lift` - Bounce animation
- `.grain` - Subtle texture overlay
- `.animate-slide-up` - Page load animation
- `.stagger-N` - Staggered delays

### Component Patterns
All components follow:
1. Mobile-first responsive
2. TypeScript typed props
3. Accessible (ARIA labels, focus states)
4. Performant (Next.js optimization)

---

This design system ensures consistency across all pages while maintaining the bold, unapologetic attitude of Bagel Bros. Use it as a reference when creating new components or pages.

🥯 **If you know, you know.**
