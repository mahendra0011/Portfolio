import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import FloatingProfileImage from "@/components/portfolio/FloatingProfileImage";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Achievements from "@/components/portfolio/Achievements";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
const Index = () => (<div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <FloatingProfileImage />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <Certifications />
      <Contact />
    </main>
    <Footer />
  </div>);
export default Index;
