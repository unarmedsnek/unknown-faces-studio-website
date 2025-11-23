# Images Folder - Unknown Faces Studio Website

This folder contains all images used throughout the website.

## 📁 Folder Structure

```
public/images/
├── studio/          ← Studio photos for Home & About pages
├── instagram/       ← Instagram grid photos for Home page
├── packages/        ← Package-specific images (optional)
└── README.md        ← This file
```

---

## 🖼️ Images You Need to Add

### 1. Studio Photos (`/images/studio/`)

**Required Images:**
- `studio-1.jpg` or `studio-1.png` - Professional equipment photo
- `studio-2.jpg` or `studio-2.png` - Creative space photo

**Usage:**
- Home page: Two alternating image/text sections
- About page: Philosophy and Space sections

**Recommended Size:**
- Aspect ratio: 16:9 (e.g., 1920x1080px)
- Format: JPG or PNG
- Max file size: 500KB each (optimized for web)

**Where to update in code:**
- File: `src/pages/Home.tsx` (lines ~68 and ~88)
- File: `src/pages/About.tsx` (lines ~35 and ~53)

---

### 2. Instagram Grid (`/images/instagram/`)

**Required Images:**
- `instagram-1.jpg` through `instagram-6.jpg`
- Or any naming scheme you prefer

**Usage:**
- Home page: Instagram section (6 photos in a grid)

**Recommended Size:**
- Aspect ratio: 1:1 (square, e.g., 800x800px)
- Format: JPG
- Max file size: 200KB each

**Where to update in code:**
- File: `src/pages/Home.tsx` (around line ~128)

---

### 3. Package Images (Optional) (`/images/packages/`)

If you want package-specific images:
- `basic-session.jpg`
- `standard-session.jpg`
- `premium-session.jpg`
- `full-day-session.jpg`

**Where to update:**
- File: `src/components/PackageCard.tsx`

---

## 🔧 How to Add Images to Your Website

### Step 1: Add Your Image Files

1. Copy your images to the appropriate folder
2. Name them clearly (use lowercase, hyphens for spaces)
3. Example: `studio-equipment.jpg`, `creative-space.jpg`

### Step 2: Update the Code

#### For Home Page Studio Images:

Open `src/pages/Home.tsx` and find this section (around line 68):

```tsx
<div className="manga-panel aspect-video rounded-none" />
```

Replace with:

```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-1.jpg" 
    alt="Professional recording equipment" 
    className="w-full h-full object-cover"
  />
</div>
```

Do the same for the second image placeholder (around line 88):

```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden lg:order-2">
  <img 
    src="/images/studio/studio-2.jpg" 
    alt="Creative recording space" 
    className="w-full h-full object-cover"
  />
</div>
```

#### For About Page Images:

Open `src/pages/About.tsx` and update the placeholders:

Around line 35:
```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-1.jpg" 
    alt="Our studio philosophy" 
    className="w-full h-full object-cover"
  />
</div>
```

Around line 53:
```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden lg:order-1">
  <img 
    src="/images/studio/studio-2.jpg" 
    alt="Our studio space" 
    className="w-full h-full object-cover"
  />
</div>
```

#### For Instagram Grid:

Open `src/pages/Home.tsx` and find the Instagram section (around line 127):

Replace:
```tsx
{[1, 2, 3, 4, 5, 6].map((i) => (
  <div
    key={i}
    className="manga-panel aspect-square rounded-none flex items-center justify-center"
  >
    <span className="font-mono text-sm text-muted-foreground">
      {t("home.instagram.post")} {i}
    </span>
  </div>
))}
```

With:
```tsx
{[1, 2, 3, 4, 5, 6].map((i) => (
  <div
    key={i}
    className="manga-panel aspect-square rounded-none overflow-hidden"
  >
    <img 
      src={`/images/instagram/instagram-${i}.jpg`}
      alt={`Instagram post ${i}`}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>
))}
```

---

## 📐 Image Optimization Tips

### Before uploading images:

1. **Resize images** to appropriate dimensions
   - Studio photos: 1920x1080px max
   - Instagram photos: 800x800px max

2. **Compress images** using:
   - [TinyPNG](https://tinypng.com/) - Free online compression
   - [Squoosh](https://squoosh.app/) - Google's image optimizer
   - Photoshop: "Export for Web"

3. **Use correct format:**
   - Photos: JPG (smaller file size)
   - Graphics/logos: PNG (better quality)
   - Modern browsers: WebP (best compression)

4. **Target file sizes:**
   - Studio photos: < 500KB each
   - Instagram photos: < 200KB each

---

## 🎨 Image Style Guidelines

For best visual consistency:

### Studio Photos:
- ✅ Professional, well-lit shots
- ✅ Show equipment and space clearly
- ✅ Clean, organized environment
- ✅ Consistent color grading

### Instagram Grid:
- ✅ Square aspect ratio (1:1)
- ✅ Similar color palette across all 6
- ✅ Mix of equipment, artists, sessions
- ✅ High quality, not pixelated

---

## 🔍 Testing Your Images

After adding images:

1. **Run dev server:** `npm run dev`
2. **Open website:** http://localhost:8081/
3. **Check all pages:**
   - Home page: Studio section & Instagram grid
   - About page: Philosophy & Space sections
4. **Test mobile view:** Resize browser to mobile size
5. **Check loading speed:** Images should load quickly

---

## 🚀 Quick Start Checklist

- [ ] Add 2 studio photos to `/images/studio/`
- [ ] Add 6 Instagram photos to `/images/instagram/`
- [ ] Update `Home.tsx` with studio image paths
- [ ] Update `Home.tsx` with Instagram image paths
- [ ] Update `About.tsx` with studio image paths
- [ ] Test on localhost
- [ ] Optimize images if page loads slowly
- [ ] Commit to git
- [ ] Deploy to production

---

## 📝 Example File Names

```
public/images/
├── studio/
│   ├── studio-equipment.jpg       (Professional gear shot)
│   └── creative-space.jpg         (Studio environment)
├── instagram/
│   ├── instagram-1.jpg            (Recording session)
│   ├── instagram-2.jpg            (Artist in studio)
│   ├── instagram-3.jpg            (Equipment close-up)
│   ├── instagram-4.jpg            (Control room)
│   ├── instagram-5.jpg            (Band recording)
│   └── instagram-6.jpg            (Studio vibe)
└── packages/
    ├── basic-session.jpg          (Optional)
    ├── standard-session.jpg       (Optional)
    ├── premium-session.jpg        (Optional)
    └── full-day-session.jpg       (Optional)
```

---

## 💡 Pro Tips

1. **Lazy Loading**: Images already use proper HTML attributes for performance
2. **Alt Text**: Always add descriptive alt text for accessibility
3. **Backup**: Keep original high-res versions elsewhere
4. **Git**: These images will be tracked in your repository
5. **CDN**: For production, consider using a CDN for faster loading

---

Need help? Check the code files mentioned above for exact line numbers and examples!

