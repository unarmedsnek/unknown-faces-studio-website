# Language Switcher - Visual Guide

## 🎨 What It Looks Like

### Desktop View (Navbar)
```
┌─────────────────────────────────────────────────────────────────┐
│  UNKNOWN FACES    Home  Booking  FAQ  About  Location  │ EN | LT │  │  🔗 🔗 🔗 │
└─────────────────────────────────────────────────────────────────┘
                                                              ↑
                                                    Language Switcher
```

When **English is active:**
- Shows: `EN | LT` (EN is bold, LT is grayed)

When **Lithuanian is active:**
- Shows: `LT | EN` (LT is bold, EN is grayed)

---

## 📱 Mobile View

When you open the hamburger menu:

```
┌─────────────────────────┐
│   ☰ MENU               │
├─────────────────────────┤
│  Home                   │
│  Booking                │
│  FAQ                    │
│  About                  │
│  Location               │
├─────────────────────────┤
│  EN | LT               │  ← Language Switcher
├─────────────────────────┤
│  🔗 🔗 🔗 🔗 🔗        │  (Social Icons)
└─────────────────────────┘
```

---

## 🔄 How It Works

### User Experience:
1. User clicks on the language switcher
2. **Entire website** switches language instantly
3. All text updates: navigation, buttons, forms, content
4. Language preference is **saved automatically**
5. Next visit remembers the language choice

### What Gets Translated:
- ✅ Navigation menu items
- ✅ Page titles and headings
- ✅ All body text and descriptions
- ✅ Button labels
- ✅ Form fields and placeholders
- ✅ Error and success messages
- ✅ Package names and descriptions
- ✅ FAQ questions and answers
- ✅ Footer copyright

---

## 🎯 Quick Test

### Test Steps:
1. Open http://localhost:8081/
2. Look at top-right corner of navbar
3. Click "EN | LT" button
4. Watch all text change to Lithuanian
5. Navigate to different pages - language persists
6. Refresh page - language is remembered
7. Click "LT | EN" to switch back to English

---

## 💻 Code Example

The switcher is incredibly simple to use in any component:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";

function MyComponent() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      {/* UNKNOWN FACES (EN) or UNKNOWN FACES (LT) */}
      
      <p>{t("home.hero.subtitle")}</p>
      {/* from unknown to known faces (EN) */}
      {/* iš nežinomų į žinomus veidus (LT) */}
      
      <button>{t("home.hero.bookNow")}</button>
      {/* BOOK NOW (EN) or REZERVUOK DABAR (LT) */}
    </div>
  );
}
```

---

## 🌐 Translation Examples

### Navigation
| English | Lithuanian |
|---------|-----------|
| Home | Pradžia |
| Booking | Rezervacija |
| FAQ | DUK |
| About | Apie Mus |
| Where to Find Us | Kur Mus Rasti |

### Booking Page
| English | Lithuanian |
|---------|-----------|
| Book Your Session | Rezervuok Savo Sesiją |
| Choose your package | Pasirink paketą |
| Available Packages | Galimi Paketai |
| Full Name | Vardas ir Pavardė |
| Phone Number | Telefono Numeris |
| Complete Booking | Patvirtinti Rezervaciją |

### Package Names
| English | Lithuanian |
|---------|-----------|
| Basic Session | Pagrindinė Sesija |
| Standard Session | Standartinė Sesija |
| Premium Session | Premium Sesija |
| Full Day Session | Visos Dienos Sesija |

### Descriptions (Casual 70% / Formal 30% Mix)
| English | Lithuanian | Tone |
|---------|-----------|------|
| Best for solo artists and demos | Geriausiai tinka solo atlikėjams ir demo | Casual |
| Professional Equipment | Profesionali Įranga | Formal |
| State-of-the-art recording equipment | Naujausios kartos įrašymo įranga | Mixed |

---

## 🎨 Styling

The language switcher button:
- **Font:** Monospace (matches website aesthetic)
- **Size:** Small, unobtrusive
- **Style:** Ghost button (no background)
- **Hover:** Subtle accent color
- **Active language:** Bold text
- **Inactive language:** Muted text color

---

## 🔧 Technical Details

### Storage
- **Method:** localStorage
- **Key:** `"language"`
- **Values:** `"en"` or `"lt"`
- **Default:** `"en"` (English)

### Context API
- **Provider:** `<LanguageProvider>`
- **Hook:** `useLanguage()`
- **Returns:**
  - `language` - Current language code
  - `setLanguage(lang)` - Change language
  - `t(key)` - Translate a key

### File Structure
```
src/
├── contexts/
│   └── LanguageContext.tsx
├── translations/
│   ├── en.ts
│   ├── lt.ts
│   └── index.ts
└── components/
    └── LanguageSwitcher.tsx
```

---

## ✨ Benefits

1. **No Page Reload** - Instant switching
2. **Persistent** - Remembers user choice
3. **Complete Coverage** - Every text translated
4. **Type-Safe** - TypeScript support
5. **Easy to Maintain** - Centralized translations
6. **SEO Friendly** - Can be extended for meta tags
7. **Accessible** - Works with keyboard navigation
8. **Mobile Optimized** - Responsive design

---

## 🚀 Live Demo

Your site is running at: **http://localhost:8081/**

**Try it now:**
1. Visit the homepage
2. Click the language switcher
3. See the magic happen! ✨

---

**Built with ❤️ using React Context API**

