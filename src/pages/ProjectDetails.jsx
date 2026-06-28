import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Image as ImageIcon,
  Info,
  Sparkles,
  Layers,
  Wrench,
  BookOpen,
  FileText,
} from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiTailwindcss,
  SiJavascript,
  SiFirebase,
  SiRedux,
  SiMui,
  SiShadcnui,
  SiCloudinary,
  SiPostman,
  SiRender,
  SiVercel,
  SiJsonwebtokens,
  SiPython,
  SiGit,
  SiGithub,
  SiRedis,
  SiDocker,
  SiFramer,
  SiGsap,
  SiPostgresql,
} from "react-icons/si";
import { projects } from "../components/portfolio/Projects";

const TECH_ICONS = {
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "Express": SiExpress,
  "MongoDB": SiMongodb,
  "Socket.IO": SiSocketdotio,
  "Socket.io": SiSocketdotio,
  "Tailwind": SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  "JavaScript": SiJavascript,
  "Firebase": SiFirebase,
  "Redux": SiRedux,
  "MUI": SiMui,
  "Shadcn": SiShadcnui,
  "Cloudinary": SiCloudinary,
  "JWT": SiJsonwebtokens,
  "Python": SiPython,
  "Git": SiGit,
  "Next.js": SiReact,
  "GSAP": SiGsap,
  "Framer Motion": SiFramer,
  "PostgreSQL": SiPostgresql,
};

const SECTIONS = [
  { id: "s-overview", label: "Overview", icon: Info },
  { id: "s-gallery",  label: "Gallery",  icon: ImageIcon },
  { id: "s-tech",     label: "Tech Stack", icon: Layers },
  { id: "s-features", label: "Features",  icon: Sparkles },
  { id: "s-setup",    label: "Setup & Links", icon: Wrench },
  { id: "s-readme",   label: "README",    icon: BookOpen },
  { id: "s-details",  label: "Project Details", icon: FileText },
];

const TAG_COLORS = {
  featured: "bg-primary/10 text-primary border border-primary/30",
  event: "bg-purple-400/10 text-purple-400 border border-purple-400/30",
  default: "bg-secondary text-muted-foreground border border-border",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readmeContent, setReadmeContent] = useState(null);
  const [loadingReadme, setLoadingReadme] = useState(false);

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (window.__portfolioLenis) {
      window.__portfolioLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    if (project && project.github && project.github !== "#") {
      const fetchReadme = async () => {
        try {
          setLoadingReadme(true);
          const urlParts = project.github.replace(".git", "").split("/");
          const repo = urlParts.pop();
          const owner = urlParts.pop();
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            { headers: { Accept: "application/vnd.github.v3.raw" } }
          );
          setReadmeContent(response.ok ? await response.text() : null);
        } catch {
          setReadmeContent(null);
        } finally {
          setLoadingReadme(false);
        }
      };
      fetchReadme();
    }
  }, [project]);

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      if (window.__portfolioLenis) {
        window.__portfolioLenis.scrollTo(top, { duration: 0.25 });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  const galleryImages = [
    { src: project.image, fallback: `https://placehold.co/1200x675/1e293b/ffffff?text=${encodeURIComponent(project.title)}`, label: project.title + " - Main View" },
    { src: `/projects/${project.id}-2.png`, fallback: `https://placehold.co/800x500/1e293b/ffffff?text=${encodeURIComponent(project.title + " • View 2")}`, label: project.title + " - Detail View" },
    { src: `/projects/${project.id}-3.png`, fallback: `https://placehold.co/800x500/1e293b/ffffff?text=${encodeURIComponent(project.title + " • View 3")}`, label: project.title + " - Feature View" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-md border-b border-border flex items-center px-4 gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Portfolio
        </button>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Projects</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{project.title}</span>
        </div>
      </nav>

      <div className="flex pt-14 min-h-screen">
        {/* Sidebar - Table of Contents */}
        <aside className="sticky top-14 left-0 z-10 h-[calc(100vh-3.5rem)] w-64 shrink-0 bg-background border-r border-border overflow-y-auto">
          <div className="p-4">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 px-2">
              Table of Contents
            </p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id: sId, label, icon: Icon }) => (
                <li key={sId}>
                  <button
                    onClick={() => scrollTo(sId)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all text-left"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-20">
          {/* Overview */}
          <section id="s-overview">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.featured && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${TAG_COLORS.featured}`}>
                  <Sparkles className="w-3 h-3" /> Featured Project
                </span>
              )}
              {project.event && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${TAG_COLORS.event}`}>
                  <Sparkles className="w-3 h-3" /> {project.event}
                </span>
              )}
              {project.tech.slice(0, 4).map((t) => {
                const TechIcon = TECH_ICONS[t];
                return (
                  <span key={t} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${TAG_COLORS.default}`}>
                    {TechIcon && <TechIcon className="w-3.5 h-3.5" />}
                    {t}
                  </span>
                );
              })}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-3xl border-l-4 border-primary pl-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary" />
                {project.tech.length} technologies
              </span>
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-primary" />
                Full Stack
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                {project.featured ? "Featured" : project.event ? "Hackathon" : "Personal"}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-accent text-foreground border border-border rounded-xl text-sm font-semibold transition-colors shadow-lg"
                >
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold transition-colors shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>

            {/* Contents */}
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">CONTENTS</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SECTIONS.map(({ id: sId, label }) => (
                  <button key={sId} onClick={() => scrollTo(sId)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    <span className="w-4 h-4 rounded text-muted-foreground flex items-center justify-center text-xs">◆</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section id="s-gallery">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 rounded-2xl overflow-hidden border border-border bg-card aspect-video group">
                <img src={galleryImages[0].src} alt={galleryImages[0].label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = galleryImages[0].fallback; }}
                />
              </div>
              {galleryImages.slice(1).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-border bg-card aspect-video group">
                  <img src={img.src} alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = img.fallback; }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section id="s-tech">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tag) => {
                const TechIcon = TECH_ICONS[tag];
                return (
                  <span key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary transition-colors">
                    {TechIcon && <TechIcon className="w-4 h-4" />}
                    {tag}
                  </span>
                );
              })}
            </div>
          </section>

          {/* Features */}
          <section id="s-features">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Features</h2>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-3">
              {project.description.split(", ").map((feat, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{feat.replace(/\.$/, "")}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Setup & Links */}
          <section id="s-setup">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
              <Wrench className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Setup & Links</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card/50 hover:border-primary/50 hover:bg-accent/50 transition-all group">
                  <Github className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">GitHub Repository</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">{project.github.replace("https://", "")}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary" />
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card/50 hover:border-primary/50 hover:bg-accent/50 transition-all group">
                  <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">Live Demo</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">{project.demo.replace("https://", "")}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary" />
                </a>
              )}
            </div>
          </section>

          {/* README */}
          {project.github && project.github !== "#" && (
            <section id="s-readme">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">README</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
                {loadingReadme ? (
                  <div className="flex flex-col gap-4 animate-pulse">
                    <div className="h-7 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-28 bg-muted rounded w-full mt-4" />
                  </div>
                ) : readmeContent ? (
                  <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-code:bg-secondary prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border prose-img:rounded-xl prose-img:border prose-img:border-border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-hr:border-border">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeContent}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-3">No README found or could not be loaded from GitHub.</p>
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="text-primary hover:underline text-sm">View directly on GitHub →</a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Project Details */}
          <section id="s-details">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Project Details</h2>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 divide-y divide-border">
              {[
                { label: "Project Name", value: project.title },
                { label: "Tech Stack", value: project.tech.join(", ") },
                { label: "GitHub", value: project.github !== "#" ? project.github : "Private / Coming Soon" },
                { label: "Live Demo", value: project.demo !== "#" ? project.demo : "Coming Soon" },
                { label: "Category", value: project.event ? `Hackathon · ${project.event}` : project.featured ? "Featured Project" : "Personal Project" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-3.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:w-36 shrink-0">{label}</span>
                  <span className="text-sm text-foreground break-all">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-accent border border-border text-foreground text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;