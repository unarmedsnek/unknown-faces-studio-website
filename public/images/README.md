# Images Guide

This folder contains all images for the Unknown Faces Studio website.

## 📁 Folder Structure

```
public/images/
├── studio/          # Studio photos (Home & About pages)
├── instagram/       # Instagram grid (Home page)
└── packages/        # Package-specific images (optional)
```

## 🖼️ Required Images

### 1. Studio Photos (`/images/studio/`)

Add 2 professional photos of your studio:
- `studio-1.jpg` - Equipment/recording setup
- `studio-2.jpg` - Creative space/environment

**Specifications:**
- Aspect ratio: 16:9 (e.g., 1920x1080px)
- Format: JPG or PNG
- Max size: 500KB each (use compression)

**Used on:**
- Home page (2 sections)
- About page (2 sections)

### 2. Instagram Grid (`/images/instagram/`)

Add 6 photos for the Instagram-style grid:
- `instagram-1.jpg` through `instagram-6.jpg`

**Specifications:**
- Aspect ratio: 1:1 (square, e.g., 800x800px)
- Format: JPG
- Max size: 200KB each

**Used on:**
- Home page (Instagram section)

### 3. Package Images (Optional) (`/images/packages/`)

If you want package-specific images:
- `2h-session.jpg`
- `4h-session.jpg`
- `6h-session.jpg`
- `8h-session.jpg`
- `10h-session.jpg`

## 🔧 How to Add Images

### Step 1: Add Files
Copy your images to the appropriate folder with correct names.

### Step 2: Update Code

#### For Studio Images:

**Home.tsx** - Find and replace placeholders:
```tsx
// Around line 68
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-1.jpg" 
    alt="Recording studio equipment" 
    className="w-full h-full object-cover"
  />
</div>

// Around line 88
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-2.jpg" 
    alt="Studio creative space" 
    className="w-full h-full object-cover"
  />
</div>
```

**About.tsx** - Find and replace placeholders:
```tsx
// Around line 35
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-1.jpg" 
    alt="Our studio philosophy" 
    className="w-full h-full object-cover"
  />
</div>

// Around line 53
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-2.jpg" 
    alt="Our studio space" 
    className="w-full h-full object-cover"
  />
</div>
```

#### For Instagram Grid:

**Home.tsx** - Find Instagram section (around line 127):
```tsx
{[1, 2, 3, 4, 5, 6].map((i) => (
  <div key={i} className="manga-panel aspect-square rounded-none overflow-hidden">
    <img 
      src={`/images/instagram/instagram-${i}.jpg`}
      alt={`Instagram post ${i}`}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>
))}
```

## 🎨 Image Optimization

Before adding images:

1. **Resize** to appropriate dimensions
   - Studio: 1920x1080px max
   - Instagram: 800x800px max

2. **Compress** using:
   - [TinyPNG](https://tinypng.com/) - Free online compression
   - [Squoosh](https://squoosh.app/) - Google's image optimizer
   - Photoshop: "Export for Web"

3. **Target file sizes:**
   - Studio photos: < 500KB each
   - Instagram photos: < 200KB each

## 🧪 Testing

After adding images:

1. Start dev server: `npm run dev`
2. Visit http://localhost:8080/
3. Check Home and About pages
4. Verify images load correctly
5. Test on mobile view

## 📐 Image Guidelines

### Studio Photos:
- ✅ Professional, well-lit
- ✅ Show equipment/space clearly
- ✅ Clean, organized
- ✅ Consistent color grading

### Instagram Grid:
- ✅ Square aspect ratio (1:1)
- ✅ Similar color palette
- ✅ Mix of equipment, artists, sessions
- ✅ High quality, sharp focus

## 🚀 Quick Checklist

- [ ] Add 2 studio photos to `/images/studio/`
- [ ] Add 6 Instagram photos to `/images/instagram/`
- [ ] Update `Home.tsx` with studio image paths
- [ ] Update `Home.tsx` with Instagram image paths
- [ ] Update `About.tsx` with studio image paths
- [ ] Optimize images (compress to target sizes)
- [ ] Test on localhost
- [ ] Test mobile view
- [ ] Commit to git
- [ ] Deploy

---

Need help? Check the code files mentioned above for exact line numbers and examples!
