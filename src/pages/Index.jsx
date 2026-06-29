import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import FloatingProfileImage from "@/components/portfolio/FloatingProfileImage";
import Services from "@/components/portfolio/Services";
import Focus from "@/components/portfolio/Focus";
import TechStack from "@/components/TechStack";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ThreeDBackground from "@/components/portfolio/ThreeDBackground";
import OakameLoader from "@/components/portfolio/OakameLoader";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const Index = () => {
  useScrollAnimations();

  return (<div className="portfolio-page min-h-screen text-foreground">
    <OakameLoader />
    <ThreeDBackground />
    <div className="glow-1" aria-hidden="true" />
    <div className="glow-2" aria-hidden="true" />
    <div className="portfolio-surface-overlay" aria-hidden="true" />
    <div className="portfolio-content">
      <Navbar />
      <FloatingProfileImage />
      <main>
        <Hero />
        <About />
        <Services />
        <Focus />
        <TechStack />
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