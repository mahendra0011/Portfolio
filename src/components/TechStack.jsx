import React from 'react';
import TechBadge from './TechBadge';
import './TechStack.css';

const TechStack = () => {
  // Track mouse movement for Spotlight Effect CSS variables
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="tech-stack-wrapper">
      <div className="glow-1"></div>
      <div className="glow-2"></div>

      <section className="container">
        <div className="header-glow"></div>
        <div className="header">
          <span className="header-tag">Skills</span>
          <h2 className="header-title">
            Technologies I work with<br />
            <span className="text-gradient">The stack I use to bring ideas to life.</span>
          </h2>
        </div>

        <div className="bento-grid">
          {/* Frontend Card */}
          <div className="card col-span-2 row-span-2" onMouseMove={handleMouseMove}>
            <div className="card-header">
              <div className="icon-box blue">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M21 9H3M21 15H3M12 3v18" />
                </svg>
              </div>
              <div>
                <h3 className="card-title">Frontend & UI</h3>
                <p className="card-desc">Modern interfaces, animations & design systems.</p>
              </div>
            </div>

            <div className="badges-container">
              <TechBadge name="HTML5" iconUrl="https://cdn.simpleicons.org/html5/E34F26" />
              <TechBadge name="CSS3">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#1572B6">
                  <path d="M5 2l1.5 15.6L12 22l5.5-4.4L19 2H5zm11.2 5.7h-6.8l-.2 1.8h6.6l-.4 4.5-3.3 1-3.3-1-.2-1.8H11l.1.8 1.4.4 1.4-.4.2-1.3H7.6l-.6-6.5h9.8l-.2 1.5z" />
                </svg>
              </TechBadge>
              <TechBadge name="JavaScript (ES6+)">
                <svg viewBox="0 0 128 128" className="badge-icon">
                  <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
                  <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
                </svg>
              </TechBadge>
              <TechBadge name="React" iconUrl="https://cdn.simpleicons.org/react/61DAFB" />
              <TechBadge name="React Router" iconUrl="https://cdn.simpleicons.org/reactrouter/CA4245" />
              <TechBadge name="Tailwind CSS" iconUrl="https://cdn.simpleicons.org/tailwindcss/06B6D4" />
              <TechBadge name="Redux" iconUrl="https://cdn.simpleicons.org/redux/764ABC" />
              <TechBadge name="Recoil">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="2.5" fill="#3578e5" />
                  <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#3578e5" strokeWidth="1.5" transform="rotate(30 12 12)" />
                  <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#3578e5" strokeWidth="1.5" transform="rotate(90 12 12)" />
                  <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#3578e5" strokeWidth="1.5" transform="rotate(150 12 12)" />
                </svg>
              </TechBadge>
              <TechBadge name="TanStack Query" iconUrl="https://cdn.simpleicons.org/reactquery/FF4154" />
              <TechBadge name="Axios" iconUrl="https://cdn.simpleicons.org/axios/5A29E4" />
              <TechBadge name="Framer Motion">
                <svg className="badge-icon" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="framerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF007F" />
                      <stop offset="50%" stopColor="#7B00FF" />
                      <stop offset="100%" stopColor="#0055FF" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0h24v8H12l12 12v4H0v-8h12L0 8V0z" fill="url(#framerGrad)" />
                </svg>
              </TechBadge>
              <TechBadge name="GSAP" iconUrl="https://cdn.simpleicons.org/greensock/88CE02" />
              <TechBadge name="Lenis">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 12c3-6 5-6 8 0s5 6 8 0 4-6 4-6" />
                </svg>
              </TechBadge>
              <TechBadge name="MUI" iconUrl="https://cdn.simpleicons.org/mui/007FFF" />
              <TechBadge name="Ant Design" iconUrl="https://cdn.simpleicons.org/antdesign/0189FF" />
              <TechBadge name="shadcn/ui" iconUrl="https://cdn.simpleicons.org/shadcnui/ffffff" />
              <TechBadge name="HeroUI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M24 0H0v24h24V0zM8.5 17.5l-4-4 4-4 1.4 1.4-2.6 2.6 2.6 2.6-1.4 1.4zm7 0l-1.4-1.4 2.6-2.6-2.6-2.6 1.4-1.4 4 4-4 4z" />
                </svg>
              </TechBadge>
              <TechBadge name="Mantine UI" iconUrl="https://cdn.simpleicons.org/mantine/339AF0" />
              <TechBadge name="React Aria">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#3B82F6">
                  <path d="M12 2L2 22h4.5l2.5-5.5h6l2.5 5.5H22L12 2zm.5 11l-2-4.5 2-4.5 2 4.5-2 4.5z" />
                </svg>
              </TechBadge>
              <TechBadge name="Radix UI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                </svg>
              </TechBadge>
              <TechBadge name="Base UI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M7 12h10" />
                </svg>
              </TechBadge>
              <TechBadge name="Reshaped">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5">
                  <path d="M4 20V4h7a4 4 0 010 8H4m7 0l5 8" />
                </svg>
              </TechBadge>
              <TechBadge name="daisyUI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#5A0EF8">
                  <path d="M12 2a4 4 0 00-4 4v2a4 4 0 00-4 4v4a6 6 0 0012 0v-4a4 4 0 00-4-4V6a4 4 0 00-4-4zm2 8v4a2 2 0 01-4 0v-4h4z" />
                </svg>
              </TechBadge>
              <TechBadge name="Kibo UI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2">
                  <path d="M4 4h6v16H4zm10 0h6v8h-6zM14 16h6v4h-6z" />
                </svg>
              </TechBadge>
              <TechBadge name="AlignUI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h12M4 18h14" />
                </svg>
              </TechBadge>
              <TechBadge name="Tailark">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                  <path d="M12 2L2 22h20L12 2zm0 6l6 10H6l6-10z" />
                </svg>
              </TechBadge>
              <TechBadge name="Lightwind UI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M3 9h6" />
                </svg>
              </TechBadge>
              <TechBadge name="ReactBits">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </TechBadge>
              <TechBadge name="Floating UI">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <path d="M17 13v8M13 17h8" />
                </svg>
              </TechBadge>
            </div>
          </div>

          {/* Backend Card */}
          <div className="card row-span-2" onMouseMove={handleMouseMove}>
            <div className="card-header">
              <div className="icon-box green">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h3 className="card-title">Backend & Databases</h3>
                <p className="card-desc">Scalable APIs, authentication & data management.</p>
              </div>
            </div>

            <div className="badges-container">
              <TechBadge name="Node.js" iconUrl="https://cdn.simpleicons.org/nodedotjs/339939" />
              <TechBadge name="Express.js" iconUrl="https://cdn.simpleicons.org/express/ffffff" />
              <TechBadge name="Python" iconUrl="https://cdn.simpleicons.org/python/3776AB" />
              <TechBadge name="REST API">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M13 3l-2 18" />
                </svg>
              </TechBadge>
              <TechBadge name="JWT" iconUrl="https://cdn.simpleicons.org/jsonwebtokens/ffffff" />
              <TechBadge name="Socket.IO" iconUrl="https://cdn.simpleicons.org/socketdotio/ffffff" />
              <TechBadge name="WebRTC" iconUrl="https://cdn.simpleicons.org/webrtc/333333" />
              <TechBadge name="Multer">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#A3E635" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2v12M9 5l3-3 3 3M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
                </svg>
              </TechBadge>
              <TechBadge name="Nodemailer">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#00b573" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </TechBadge>
              <TechBadge name="PDFKit">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#EF4444">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 12H9.5V9H12c1.1 0 2 .9 2 2s-.9 2-2 2z" />
                </svg>
              </TechBadge>
              <TechBadge name="MongoDB" iconUrl="https://cdn.simpleicons.org/mongodb/47A248" />
              <TechBadge name="PostgreSQL" iconUrl="https://cdn.simpleicons.org/postgresql/4169E1" />
              <TechBadge name="MySQL" iconUrl="https://cdn.simpleicons.org/mysql/4479A1" />
              <TechBadge name="Redis" iconUrl="https://cdn.simpleicons.org/redis/DC382D" />
              <TechBadge name="Kafka" iconUrl="https://cdn.simpleicons.org/apachekafka/ffffff" />
            </div>
          </div>

          {/* Deployment & Tools Card */}
          <div className="card col-span-2" onMouseMove={handleMouseMove}>
            <div className="card-header">
              <div className="icon-box orange">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <h3 className="card-title">Cloud, DevOps & Deployment</h3>
                <p className="card-desc">Deployment, hosting & production infrastructure.</p>
              </div>
            </div>

            <div className="badges-container">
              <TechBadge name="Git" iconUrl="https://cdn.simpleicons.org/git/F05032" />
              <TechBadge name="GitHub" iconUrl="https://cdn.simpleicons.org/github/ffffff" />
              <TechBadge name="GitHub Actions" iconUrl="https://cdn.simpleicons.org/githubactions/2088FF" />
              <TechBadge name="Docker" iconUrl="https://cdn.simpleicons.org/docker/2496ED" />
              <TechBadge name="Nginx" iconUrl="https://cdn.simpleicons.org/nginx/009639" />
              <TechBadge name="AWS">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </TechBadge>
              <TechBadge name="Google Cloud" iconUrl="https://cdn.simpleicons.org/googlecloud/4285F4" />
              <TechBadge name="Vercel" iconUrl="https://cdn.simpleicons.org/vercel/ffffff" />
              <TechBadge name="Render" iconUrl="https://cdn.simpleicons.org/render/ffffff" />
              <TechBadge name="Serverless" iconUrl="https://cdn.simpleicons.org/serverless/FD5750" />
              <TechBadge name="VPS">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="5" rx="1" />
                  <rect x="2" y="11" width="20" height="5" rx="1" />
                  <rect x="2" y="19" width="20" height="5" rx="1" />
                  <circle cx="6" cy="5.5" r="1" fill="#22C55E" />
                  <circle cx="6" cy="13.5" r="1" fill="#22C55E" />
                  <circle cx="6" cy="21.5" r="1" fill="#22C55E" />
                </svg>
              </TechBadge>
              <TechBadge name="Hostinger" iconUrl="https://cdn.simpleicons.org/hostinger/673DE6" />
              <TechBadge name="GoDaddy">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#1CBF6F">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.4-1.4L11 14.2l6.6-6.6L19 9l-8 8z" />
                </svg>
              </TechBadge>
            </div>
          </div>

          {/* Services & Integrations Card */}
          <div className="card" onMouseMove={handleMouseMove}>
            <div className="card-header">
              <div className="icon-box purple">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div>
                <h3 className="card-title">Services & Integrations</h3>
                <p className="card-desc">Authentication, storage, payments & third-party services.</p>
              </div>
            </div>

            <div className="badges-container">
              <TechBadge name="Auth0" iconUrl="https://cdn.simpleicons.org/auth0/EB5424" />
              <TechBadge name="Firebase" iconUrl="https://cdn.simpleicons.org/firebase/FFCA28" />
              <TechBadge name="Supabase" iconUrl="https://cdn.simpleicons.org/supabase/3ECF8E" />
              <TechBadge name="Clerk">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#6C47FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </TechBadge>
              <TechBadge name="Brevo" iconUrl="https://cdn.simpleicons.org/brevo/0092FF" />
              <TechBadge name="SendGrid">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#51A9E3">
                  <path d="M21 11H13V3a1 1 0 00-1-1H3a1 1 0 00-1 1v10a1 1 0 001 1h8v8a1 1 0 001 1h10a1 1 0 001-1V12a1 1 0 00-1-1zM4 12V4h7v8H4zm16 8h-7v-7h7v7z" />
                </svg>
              </TechBadge>
              <TechBadge name="Razorpay" iconUrl="https://cdn.simpleicons.org/razorpay/ffffff" />
              <TechBadge name="Cashfree">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5">
                  <circle cx="10" cy="12" r="6" />
                  <circle cx="14" cy="12" r="6" stroke="#0072FF" />
                </svg>
              </TechBadge>
              <TechBadge name="Cloudinary" iconUrl="https://cdn.simpleicons.org/cloudinary/3448C5" />
              <TechBadge name="FlexSearch">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="10" r="7" />
                  <path d="M15 15l6 6" />
                  <path d="M10 7v6M7 10h6" />
                </svg>
              </TechBadge>
              <TechBadge name="React Charts">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
              </TechBadge>
              <TechBadge name="MapCN">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-12v15" />
                </svg>
              </TechBadge>
              <TechBadge name="VS Code" iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
              <TechBadge name="Postman" iconUrl="https://cdn.simpleicons.org/postman/FF6C37" />
              <TechBadge name="Excel">
                <svg className="badge-icon" viewBox="0 0 24 24" fill="#217346">
                  <path d="M14 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V10l-6-8zM13 3.5L18.5 9H13V3.5zM7.5 11h2.3l1.2 2.2 1.2-2.2h2.3l-2.2 3.5 2.3 3.5H12.3L11 14.8l-1.3 2.7H7.4l2.3-3.5L7.5 11z" />
                </svg>
              </TechBadge>
              <TechBadge name="C++" iconUrl="https://cdn.simpleicons.org/cplusplus/00599C" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TechStack;