# Mahendra Prajapati Portfolio

Personal portfolio website for Mahendra Prajapati, a full-stack developer and B.Tech Electronics & Communication student from Jabalpur, Madhya Pradesh.

The site presents featured MERN projects, skills, services, certifications, resume access, and contact details in a responsive single-page experience.

![Portfolio preview](public/og-image.png)

## Highlights

- Responsive React and Vite portfolio with smooth section navigation.
- Animated hero, project cards, skill chips, and scroll-triggered interactions.
- Project showcase with screenshots, tech stacks, GitHub links, and live demo links.
- Resume download and resume preview assets in the public folder.
- Contact form validation with Zod and toast feedback.
- SEO, Open Graph, Twitter card, favicon, and Vercel SPA rewrite configuration.

## Featured Projects

| Project | Description | Stack |
| --- | --- | --- |
| MediCore | Hospital management system with patient, doctor, and admin portals. | React, Node.js, Express, MongoDB, JWT, Cloudinary |
| EventO | Event discovery and ticket booking platform with host and admin workflows. | React, Tailwind CSS, Node.js, Express, MongoDB |
| MindSupport | Mental wellness platform built for Smart India Hackathon 2025. | React, Node.js, Express, MongoDB, Socket.IO |
| MoviX | Movie ticket booking platform with seat selection and theater workflows. | React, Node.js, Express, MongoDB |
| RentPE | Room rental marketplace for students, interns, job seekers, and movers. | React, Node.js, Express, MongoDB |
| TempTalk | Anonymous real-time chat platform with temporary rooms and media sharing. | React, Express, Socket.IO, MongoDB |
| StudyBuddy | AI study platform for notes, PDF summaries, YouTube summaries, and tasks. | React, Node.js, Express, MongoDB, Gemini AI |
| LostAndFound | Recovery platform for reporting, searching, and managing lost items. | React, Tailwind CSS, Node.js, Express, MongoDB |

## Tech Stack

- React 18, Vite, React Router, Redux Toolkit
- Tailwind CSS, shadcn/ui, Radix UI, lucide-react, react-icons
- Framer Motion, GSAP, Lenis, ReactBits-style interaction components
- Zod, Sonner, React Hook Form utilities
- Vitest, Testing Library, ESLint
- Vercel-ready static deployment

## Getting Started

```bash
npm install
npm run dev
```

The development server runs through Vite. After starting it, open the local URL printed in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev          # Start the local development server
npm run build        # Create a production build
npm run build:dev    # Build in development mode
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint
npm run test         # Run Vitest once
npm run test:watch   # Run Vitest in watch mode
```

## Project Structure

```text
src/
  components/
    portfolio/       Portfolio sections such as hero, projects, skills, resume, and contact
    reactbits/       Interaction helpers used by portfolio cards and buttons
    ui/              Reusable shadcn/ui components
  hooks/             Theme, scroll, animation, and responsive hooks
  lib/               Utility and hash-scroll helpers
  store/             Redux Toolkit portfolio state
  test/              Vitest setup and example test
public/
  projects/          Project screenshots and icons
  Mahendra_Resume.pdf
  resume-preview.png
  og-image.png
```

## Deployment

This project is ready for static hosting. For Vercel, the included `vercel.json` rewrites all routes to `index.html` so React Router routes can refresh correctly.

```bash
npm run build
```

Upload or serve the generated `dist/` directory.

## Contact

- GitHub: [mahendra0011](https://github.com/mahendra0011)
- LinkedIn: [Mahendra Prajapati](https://www.linkedin.com/in/mahendra-prajapati-73163930b)
- Email: [mahendrapra0077@gmail.com](mailto:mahendrapra0077@gmail.com)
