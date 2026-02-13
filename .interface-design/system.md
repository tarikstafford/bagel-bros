# Bagel Bros Design System

## Direction
Brutalist streetwear aesthetic — bold, unapologetic, minimal polish. Heavy black borders, sharp edges, no traditional shadows. High contrast with limited color palette.

## Spacing
**Grid:** 4px (Tailwind default)

**Common values:**
- Micro: 4px, 8px, 12px
- Small: 16px, 20px, 24px
- Medium: 32px, 48px
- Large: 64px, 80px
- XL: 128px

**Layout rhythm:**
- Fixed header: h-20 (80px)
- Page top padding: pt-20 (80px) — ensures content clears fixed header
- Section vertical padding: py-20 sm:py-32 (80px / 128px)
- Container max-widths: max-w-5xl to max-w-6xl for consistency
- Grid gaps: gap-6 sm:gap-8 (24px / 32px) for cards, gap-4 sm:gap-6 (16px / 24px) for galleries

## Depth
**System:** Borders-only with brutal offset shadows

**Rules:**
- Use border-3 (3px) for ALL structural elements (consistency is key)
- Use border-brutal utility for buttons/CTAs (3px border + 6px offset shadow)
- NEVER use border-2 or border-4 unless explicitly required
- NEVER use traditional box-shadow (blur/spread)
- NEVER use rounded corners (rounded-*) — brutal means sharp edges
- OK to use brutal shadows: `box-shadow: 6px 6px 0 var(--true-black)`
- Focus states use 3px solid outline with bagel-tan

## Colors
**Palette:**
```
bagel-tan:   #D4A574  // Primary accent
bagel-green: #4A7C59  // Secondary (rare)
cream:       #F5F1E8  // Primary background
true-black:  #0A0A0A  // Primary text/borders
true-white:  #FEFEFE  // Rare, used in specific contexts
```

**Opacity modifiers:**
- /5, /10, /20, /30 for subtle backgrounds
- /40, /50, /60 for de-emphasized text
- /70, /80 for medium emphasis

## Typography
**Families:**
- Display: Bebas Neue (headings, large text)
- Mono: Space Mono (body, labels, UI)

**Sizes:**
- display-xl: clamp(4rem, 12vw, 10rem) — Hero headlines
- display-lg: clamp(3rem, 8vw, 6rem) — Section headers
- display-md: clamp(2rem, 5vw, 4rem) — Subsection headers
- display-sm: clamp(1.5rem, 3vw, 2.5rem) — Card titles

**Body:**
- Base: text-sm to text-base (font-mono)
- Small: text-xs (labels, metadata)
- Large: text-lg to text-xl (prominent body)

## Patterns

### Button (Primary CTA)
```tsx
<button className="border-brutal border-brutal-hover bg-bagel-tan px-12 py-5 font-display text-2xl sm:text-4xl">
  Shop Now
</button>
```
- Border: 3px solid with brutal shadow
- Padding: px-12 py-5 (large), px-8 py-4 (medium), px-4 py-2 (small)
- Font: font-display for large, font-mono for small
- Hover: Translates -2px, shadow increases to 8px

### Button (Secondary/Text)
```tsx
<button className="font-mono text-sm uppercase tracking-wider border-b-2 border-true-black hover:border-bagel-tan transition-colors">
  Continue Shopping
</button>
```
- No background, underline only
- uppercase + tracking-wider
- Hover changes border color

### Card (Product)
```tsx
<div className="border-3 border-true-black overflow-hidden aspect-square">
  <Image className="object-cover transition-transform duration-700 group-hover:scale-105" />
</div>
```
- Border: border-3 border-true-black
- Aspect: aspect-square for products
- Image hover: scale-105, duration-700
- Optional overlay: bg-bagel-tan/20 on hover

### Badge/Pill
```tsx
<div className="font-mono text-xs uppercase tracking-wider bg-bagel-tan px-4 py-2">
  Limited Release
</div>
```
- Font: font-mono text-xs
- Transform: uppercase tracking-wider
- Padding: px-4 py-2
- Colors: bg-bagel-tan or bg-true-black

### Input/Form
```tsx
<input className="border-3 border-true-black px-4 py-3 font-mono text-sm focus:outline-none focus:border-bagel-tan" />
```
- Border: border-3
- Padding: px-4 py-3
- Focus: border color changes to bagel-tan

### Navigation Link
```tsx
<Link className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider hover:text-bagel-tan transition-colors duration-300">
  Shop
</Link>
```
- Font: font-mono font-bold
- Transform: uppercase tracking-wider
- Hover: color changes to bagel-tan, duration-300

### Section Container
```tsx
<section className="py-20 sm:py-32 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
```
- Vertical: py-20 sm:py-32
- Max-width: max-w-4xl to max-w-6xl depending on content
- Horizontal: px-6 sm:px-8 lg:px-12

## Transitions
**Durations:**
- Quick: 200ms (button hover, simple state)
- Standard: 300ms (color, opacity)
- Smooth: 500ms (complex transforms)
- Slow: 700ms (image scale/zoom)

**Easing:**
- Default: ease-in-out
- Brutal hover: translate(-2px, -2px) with duration-200

## Utilities

### Toast Notifications
Use centralized toast config from `@/lib/utils/toast-config`:

```tsx
import { toast } from '@/lib/utils/toast-config';

// Success toast (bagel-tan background)
toast.success('Added to cart');

// Error toast (true-black background)
toast.error('Something went wrong');
```

**Styling:**
- Font: Space Mono, 14px
- Success: bagel-tan background, true-black text, bold
- Error: true-black background, true-white text
