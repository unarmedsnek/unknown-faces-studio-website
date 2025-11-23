# 🖼️ Quick Guide: Adding Images to Your Website

## ✅ What I've Set Up For You

1. ✅ **Created folder structure:** `public/images/` with organized subfolders
2. ✅ **Fixed favicon:** Logo now shows in browser tab
3. ✅ **Updated contact info:** New address, phone, and email
4. ✅ **Removed transit/bike directions:** Only car directions remain
5. ✅ **Prepared image placeholders:** Ready for your photos

---

## 📸 Images You Need

### Required Images:
1. **2 Studio Photos** - For Home & About pages
2. **6 Instagram Photos** - For Instagram grid on Home page

### Where to Put Them:
```
public/images/studio/     ← Put your 2 studio photos here
public/images/instagram/  ← Put your 6 Instagram photos here
```

---

## 🚀 Quick Start: 3 Easy Steps

### Step 1: Add Your Images

Copy your images into these folders:
- `public/images/studio/studio-1.jpg` (equipment photo)
- `public/images/studio/studio-2.jpg` (space photo)
- `public/images/instagram/instagram-1.jpg` through `instagram-6.jpg`

**Name them exactly as shown above, or adjust the code in Step 2**

---

### Step 2: Update the Code

I'll give you the exact code to copy/paste:

#### A) Home Page - Studio Images

Open: `src/pages/Home.tsx`

**Find line ~68** (first studio image placeholder):
```tsx
<div className="manga-panel aspect-video rounded-none" />
```

**Replace with:**
```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-1.jpg" 
    alt="Professional recording equipment and studio setup" 
    className="w-full h-full object-cover"
  />
</div>
```

**Find line ~88** (second studio image placeholder):
```tsx
<div className="manga-panel aspect-video rounded-none lg:order-2" />
```

**Replace with:**
```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden lg:order-2">
  <img 
    src="/images/studio/studio-2.jpg" 
    alt="Creative recording space with comfortable atmosphere" 
    className="w-full h-full object-cover"
  />
</div>
```

---

#### B) Home Page - Instagram Grid

Open: `src/pages/Home.tsx`

**Find line ~128** (Instagram grid section):
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

**Replace with:**
```tsx
{[1, 2, 3, 4, 5, 6].map((i) => (
  <div
    key={i}
    className="manga-panel aspect-square rounded-none overflow-hidden cursor-pointer"
  >
    <img 
      src={`/images/instagram/instagram-${i}.jpg`}
      alt={`Unknown Faces Studio - Instagram post ${i}`}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>
))}
```

---

#### C) About Page - Studio Images

Open: `src/pages/About.tsx`

**Find line ~35** (first image placeholder):
```tsx
<div className="manga-panel aspect-video rounded-none" />
```

**Replace with:**
```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden">
  <img 
    src="/images/studio/studio-1.jpg" 
    alt="Our philosophy: Professional equipment and dedicated approach" 
    className="w-full h-full object-cover"
  />
</div>
```

**Find line ~53** (second image placeholder):
```tsx
<div className="manga-panel aspect-video rounded-none lg:order-1" />
```

**Replace with:**
```tsx
<div className="manga-panel aspect-video rounded-none overflow-hidden lg:order-1">
  <img 
    src="/images/studio/studio-2.jpg" 
    alt="Our studio space: Acoustically treated rooms and creative atmosphere" 
    className="w-full h-full object-cover"
  />
</div>
```

---

### Step 3: Test!

1. Save all files
2. Open http://localhost:8081/
3. Check Home page - should see your images!
4. Check About page - should see your images!
5. Images should load and look great!

---

## 📐 Image Size Recommendations

### Studio Photos (2 photos):
- **Dimensions:** 1920x1080px (or any 16:9 ratio)
- **Format:** JPG
- **File Size:** Under 500KB each
- **Content:** 
  - Photo 1: Equipment/gear shot
  - Photo 2: Wide studio space shot

### Instagram Photos (6 photos):
- **Dimensions:** 800x800px (1:1 square ratio)
- **Format:** JPG
- **File Size:** Under 200KB each
- **Content:** Mix of studio shots, recording sessions, equipment

---

## 🎨 Image Optimization

**Before adding images, compress them:**

1. Visit [TinyPNG.com](https://tinypng.com/)
2. Upload your images
3. Download compressed versions
4. Use those on your website

This makes your site load MUCH faster! ⚡

---

## ✨ What's Already Updated

### Contact Information (Both Languages):
- ✅ **Address:** 99 Laisvės alėja, Kaunas, Kauno apskritis 44291
- ✅ **Phone:** +370 606 23373
- ✅ **Email:** unknownfacesnotes@gmail.com

### Directions:
- ✅ Removed "By Public Transit"
- ✅ Removed "By Bike"
- ✅ Kept only "By Car" section

### Favicon:
- ✅ Logo now shows in browser tab!
- ✅ Fixed paths in `index.html`

---

## 🗂️ Folder Structure

```
public/
├── images/                           ← Your new images folder!
│   ├── studio/                       ← Add 2 studio photos here
│   │   ├── studio-1.jpg             ← Equipment photo
│   │   └── studio-2.jpg             ← Space photo
│   ├── instagram/                    ← Add 6 Instagram photos here
│   │   ├── instagram-1.jpg          ← Grid photo 1
│   │   ├── instagram-2.jpg          ← Grid photo 2
│   │   ├── instagram-3.jpg          ← Grid photo 3
│   │   ├── instagram-4.jpg          ← Grid photo 4
│   │   ├── instagram-5.jpg          ← Grid photo 5
│   │   └── instagram-6.jpg          ← Grid photo 6
│   ├── packages/                     ← Optional package images
│   └── README.md                     ← Detailed instructions
├── favicon.ico
└── unknown_faces_logo 512x512.png   ← Your logo (working!)
```

---

## 🐛 Troubleshooting

### Images Not Showing?
1. Check file names match exactly (case-sensitive!)
2. Make sure images are in `public/images/` folder
3. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Images Too Big/Slow?
1. Compress images using TinyPNG
2. Resize to recommended dimensions
3. Use JPG format (not PNG for photos)

### Wrong Image Aspect Ratio?
- Studio images should be **16:9** (horizontal rectangle)
- Instagram images should be **1:1** (perfect square)

---

## 📝 Example File Names (Optional)

If you want different names, just update the code:

**Instead of `studio-1.jpg`, you could use:**
- `equipment-shot.jpg`
- `recording-room.jpg`
- `main-studio.jpg`

**Just remember to update the image paths in the code!**

---

## 💡 Pro Tips

1. **Consistent Style:** Use images with similar lighting/color for cohesive look
2. **High Quality:** Don't use blurry or pixelated images
3. **Show Your Brand:** Include your logo/branding in photos if possible
4. **Real Photos:** Use actual studio photos, not stock images
5. **Backup:** Keep original high-resolution versions saved elsewhere

---

## ✅ Your Checklist

- [ ] Add 2 studio photos to `/images/studio/`
- [ ] Add 6 Instagram photos to `/images/instagram/`
- [ ] Update `Home.tsx` with image code (Section A & B above)
- [ ] Update `About.tsx` with image code (Section C above)
- [ ] Compress images if needed (TinyPNG)
- [ ] Test website on localhost
- [ ] Check mobile view too!
- [ ] Celebrate! 🎉

---

## 🆘 Need Help?

See the detailed guide in `public/images/README.md` for:
- Line-by-line code locations
- More customization options
- Advanced image optimization
- Troubleshooting tips

---

**Everything is ready - just add your images and update the code!** 🚀

Your website already looks great, and with your photos it'll be amazing! 📸✨

