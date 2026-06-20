import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import FloatingProfileImage from "@/components/portfolio/FloatingProfileImage";
import Services from "@/components/portfolio/Services";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ThreeDBackground from "@/components/portfolio/ThreeDBackground";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const Index = () => {
  useScrollAnimations();

  return (<div className="portfolio-page min-h-screen text-foreground">
    <ThreeDBackground />
    <div className="portfolio-surface-overlay" aria-hidden="true" />
    <div className="portfolio-content">
      <Navbar />
      <FloatingProfileImage />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  </div>);
};

export default Index;
