# Unknown Faces Studio Website

A modern, bilingual (English/Lithuanian) website for Unknown Faces recording studio.

## 🚀 Features

- **Bilingual Support** - Full English and Lithuanian translations
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Booking System** - Integration with Cal.com for appointment scheduling
- **Email Notifications** - EmailJS integration for booking confirmations
- **Modern UI** - Clean, professional design built with React and Tailwind CSS

## 📋 Prerequisites

- Node.js 16+ and npm
- Cal.com account and API key
- EmailJS account and templates

## 🛠️ Installation

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd unknown-faces-studio-website
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.template .env.local
```

Edit `.env.local` and add your actual credentials:

```env
# Cal.com API
VITE_CALCOM_API_KEY=your_cal_api_key_here

# Cal.com Event Type IDs
VITE_EVENT_TYPE_2H=your_2h_event_id
VITE_EVENT_TYPE_4H=your_4h_event_id
VITE_EVENT_TYPE_6H=your_6h_event_id
VITE_EVENT_TYPE_8H=your_8h_event_id
VITE_EVENT_TYPE_10H=your_10h_event_id

# With Extra Hour
VITE_EVENT_TYPE_2H_EXTRA=your_2h_extra_event_id
VITE_EVENT_TYPE_4H_EXTRA=your_4h_extra_event_id
VITE_EVENT_TYPE_6H_EXTRA=your_6h_extra_event_id
VITE_EVENT_TYPE_8H_EXTRA=your_8h_extra_event_id
VITE_EVENT_TYPE_10H_EXTRA=your_10h_extra_event_id

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_OWNER_TEMPLATE_ID=your_owner_template_id
VITE_EMAILJS_USER_TEMPLATE_ID=your_user_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Important:** Never commit `.env.local` to git. It contains sensitive API keys.

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:8080/

## 📁 Project Structure

```
unknown-faces-studio-website/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main page components
│   ├── translations/    # English and Lithuanian translations
│   ├── contexts/        # React contexts (Language)
│   └── config/          # API configurations (gitignored)
├── public/
│   └── images/          # Studio photos and assets
├── .env.local          # Your API keys (gitignored)
├── .env.template       # Template for environment variables
└── README.md           # This file
```

## 🔐 Security

API keys are protected using environment variables:
- Config files use `import.meta.env.VITE_*` to read from `.env.local`
- `.env.local` is gitignored and never pushed to GitHub
- Example config files (`.example.ts`) are provided as reference

See `SECURITY_SETUP.md` for detailed security information.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` folder will contain production-ready files.

### Environment Variables on Hosting

Add all `VITE_*` variables from your `.env.local` to your hosting platform's environment settings:
- **Netlify:** Site Settings → Environment Variables
- **Vercel:** Project Settings → Environment Variables

## 📚 Documentation

- `SECURITY_SETUP.md` - API key security best practices
- `API_SETUP.md` - Cal.com and EmailJS configuration guide
- `public/images/README.md` - Guide for adding studio images

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 🌍 Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- Cal.com API
- EmailJS
- React Hook Form
- Zod validation

## 📧 Contact

For questions about this website, contact Unknown Faces Studio at unknownfacesnotes@gmail.com

---

© 2025 Unknown Faces Studio. All rights reserved.
