import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const RESUME_URL = "/Mahendra_Resume.pdf";

const Resume = () => (
  <section id="resume" className="py-24 relative">
    <div className="container">
      <SectionHeading
        eyebrow="Resume"
        title="My Full Resume"
        description="Preview my resume below or download a copy"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button asChild size="lg" className="gradient-bg shadow-glow hover:scale-105 transition-transform">
            <a href={RESUME_URL} download>
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="hover:scale-105 transition-transform">
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Open in New Tab
            </a>
          </Button>
        </div>

        <div className="glass rounded-2xl p-2 shadow-glow overflow-hidden">
          <object
            data={`${RESUME_URL}#view=FitH`}
            type="application/pdf"
            className="w-full h-[80vh] rounded-xl bg-background"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <FileText className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Your browser can't display PDFs inline.
              </p>
              <Button asChild className="gradient-bg">
                <a href={RESUME_URL} download>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>
          </object>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Resume;