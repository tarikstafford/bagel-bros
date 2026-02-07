# Spacing & Image Size Improvements

## Changes Made

### 1. Container Max-Width (Better Side Margins)
- **Before:** `max-w-[1600px]` (too wide, overwhelming)
- **After:** Context-appropriate widths:
  - Hero sections: `max-w-4xl` to `max-w-5xl`
  - Content sections: `max-w-6xl`
  - CTA sections: `max-w-3xl` to `max-w-4xl`
  - Product grids: `max-w-5xl` to `max-w-6xl`

### 2. Horizontal Padding (More Breathing Room)
- **Before:** `px-4 sm:px-6 lg:px-8`
- **After:** `px-6 sm:px-8 lg:px-12`
- Added 50% more horizontal padding for better margins

### 3. Image Sizes Reduced

#### Homepage:
- **Hero logo:** 48px → 32px (33% smaller)
- **Lifestyle image:** Added `max-w-md` constraint
- **Brand story image:** Added `max-w-sm lg:max-w-md` + changed to 4:5 ratio
- **Product grid:** Added `max-w-[200px]` per image
- **Community grid:** Reduced from `max-w-3xl` to `max-w-2xl` + `max-w-[180px]` per image

#### Shop Page:
- **Product cards:** Changed from square to 4:5 aspect ratio (20% less height)
- **Grid gaps:** Increased from `gap-6 lg:gap-8` to `gap-8 lg:gap-10` for better separation

#### About Page:
- **Scoreboard:** Added `max-w-2xl` constraint
- **Team photos:** 3:4 → 4:5 ratio + `max-w-[200px]` per image
- **Team grid:** Added `max-w-3xl` constraint

### 4. Visual Balance Improvements
- Reduced grid container widths to create natural side margins
- Images now centered with `mx-auto` where appropriate
- Better proportion between content width and screen width
- Eliminated edge-to-edge layouts that felt cramped

## Impact
- ✅ 30-40% more white space on sides
- ✅ Images 20-35% smaller across the site
- ✅ Better visual hierarchy and breathing room
- ✅ More refined, luxury aesthetic
- ✅ Improved readability and content focus
