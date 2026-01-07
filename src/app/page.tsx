"use client";

import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Zap, 
  Cpu, 
  Globe,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Quantum Nexus",
    description: "A futuristic data visualization platform built with Next.js and Three.js.",
    tags: ["React", "Three.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Aetherial UI",
    description: "A comprehensive design system focusing on glassmorphic and neomorphic aesthetics.",
    tags: ["Framer Motion", "TypeScript", "CSS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Lumina CRM",
    description: "Real-time customer relationship management with integrated AI insights.",
    tags: ["Next.js", "Supabase", "OpenAI"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  }
];

const skills = [
  { name: "Frontend Architecture", icon: <Palette className="w-5 h-5" /> },
  { name: "Fullstack Development", icon: <Code2 className="w-5 h-5" /> },
  { name: "UI/UX Motion", icon: <Zap className="w-5 h-5" /> },
  { name: "Cloud Infrastructure", icon: <Globe className="w-5 h-5" /> },
  { name: "AI Integration", icon: <Cpu className="w-5 h-5" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass px-8 py-3 rounded-full flex items-center gap-8 backdrop-blur-md"
        >
          <a href="#hero" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</a>
          <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors">Skills</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl w-full"
        >
          <div className="glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden text-center">
            {/* Decorative inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            
            <motion.div variants={itemVariants}>
              <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/30 text-primary bg-primary/5 rounded-full">
                Available for New Projects
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6"
            >
              Crafting Digital <span className="text-primary text-glow italic">Atmospheres</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Full-stack developer specializing in building high-performance applications 
              with immersive glassmorphic interfaces and fluid motion experiences.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg font-medium group">
                View My Work
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full w-14 h-14 border border-white/5 glass hover:bg-white/10">
                  <Github className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full w-14 h-14 border border-white/5 glass hover:bg-white/10">
                  <Linkedin className="w-6 h-6" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <Badge className="mb-4">Portfolio</Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass h-full flex flex-col overflow-hidden border-white/5 group-hover:border-primary/30 transition-all duration-500">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" className="rounded-full glass-darker">
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full glass-darker">
                      <Github className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-wider">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Case Study
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold font-display mb-6">Mastering the <span className="text-primary italic">Modern Stack</span></h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I build robust applications using cutting-edge technologies. My focus is always on performance, scalability, and exceptional user experience.
              </p>
              <Button variant="outline" className="rounded-full border-white/10 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                Download Resume
              </Button>
            </div>
            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-5 rounded-2xl flex items-center gap-4 border-white/5 hover:border-primary/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="glass p-12 md:p-16 rounded-[3rem] text-center border-white/5">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Let's <span className="text-accent italic">Connect</span></h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Ready to bring your vision to life? Whether you have a specific project in mind 
            or just want to say hello, I'm always open to new opportunities.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:hello@example.com"
              className="flex items-center gap-3 px-6 py-4 glass rounded-2xl border-white/10 hover:border-primary/30 transition-colors"
            >
              <Mail className="text-primary" />
              <span>hello@example.com</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="#"
              className="flex items-center gap-3 px-6 py-4 glass rounded-2xl border-white/10 hover:border-accent/30 transition-colors"
            >
              <Linkedin className="text-accent" />
              <span>LinkedIn Profile</span>
            </motion.a>
          </div>

          <Button size="lg" className="rounded-full px-12 h-16 text-lg shadow-[0_20px_50px_rgba(8_112_184_0.7)] hover:shadow-primary/40 transition-shadow">
            Start a Conversation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-muted-foreground text-sm border-t border-white/5">
        <p>© 2026 Creative Developer Portfolio. Built with Next.js, Framer Motion & Glassmorphism.</p>
      </footer>
    </main>
  );
}
