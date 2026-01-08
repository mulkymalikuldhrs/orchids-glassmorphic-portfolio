# Mulky OS | Glassmorphic Portfolio

A high-end, interactive web-based operating system experience and portfolio. Built with **Next.js 15 (Turbopack)**, **Tailwind CSS 4**, and **Framer Motion**, Mulky OS combines minimalist aesthetics with functional AI integration.

## 🌌 Overview

Mulky OS is not just a portfolio; it's a digital ecosystem designed to showcase work through a "Web OS" interface. It features a custom terminal, real-time system monitoring, and an AI-driven mascot (Betta_Core).

## ✨ Key Features

- **Terminal Interface**: A fully functional command-line interface (CLI) to explore the system, view projects, and access contact information.
- **Glassmorphic Design**: Cutting-edge UI utilizing advanced CSS blur filters and frosted-glass effects for a premium look.
- **AI Companion (AIPet)**: An interactive 3D/2D hybrid AI mascot with autonomous "Thinking" states and reactive animations.
- **Premium Access (Stripe)**: Integrated Stripe checkout for secure "Resume Access" and other digital products.
- **Real-time Data**: Syncs directly with the GitHub API to display latest repositories and activity.
- **Bilingual Core**: Seamless switching between Indonesian (ID) and English (EN) throughout the entire OS.
- **Visitor Analytics**: Real-time tracking of visitor engagement powered by Supabase.

## 💻 Terminal Commands

Access the terminal via the `/ai` route. Available commands include:

| Command | Description |
|---------|-------------|
| `help` | Lists all available system commands |
| `ls` | Lists files in the virtual directory |
| `cat [file]` | Reads the content of a virtual file (e.g., `cat about.md`) |
| `projects` | Displays a curated list of portfolio projects |
| `whoami` | Shows current system kernel and user information |
| `contact` | Reveals developer contact details |
| `clear` | Clears the terminal history |

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion (Animations)
- **Backend/Services**: Supabase (Database & Auth), Stripe (Payments)
- **UI Components**: Radix UI, Lucide Icons
- **Performance**: Turbopack, Image Optimization, Edge Runtime

## 🛠️ Installation & Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/mulkymalikuldhrs/orchids-glassmorphic-portfolio.git
   cd orchids-glassmorphic-portfolio
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file with the following keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   GITHUB_TOKEN=your_github_token
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

## 📄 License & Creator

Created by **Mulky Malikul Dhaher**. 
All rights reserved. Designed for the Aceh-Subtle-v2 Kernel ecosystem.

---
*Inspired by the concept of minimalist digital sovereignty.*
