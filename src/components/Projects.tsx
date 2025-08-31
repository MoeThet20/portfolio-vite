import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates and team features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      tech: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
      github: '#',
      live: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with forecasts and interactive maps.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop',
      tech: ['Vue.js', 'Weather API', 'Chart.js', 'Tailwind'],
      github: '#',
      live: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Interactive portfolio with Three.js animations and modern design.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
      github: '#',
      live: '#'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const projectVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      y: 50,
      rotateY: index % 2 === 0 ? -15 : 15
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  return (
    <section id="projects" className="min-h-screen py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -100, rotateX: -45 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 100, rotateX: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
          >
            Here are some of my recent projects that showcase my skills and passion for development.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              custom={index}
              variants={projectVariants}
              whileHover={{ 
                scale: 1.02,
                x: index % 2 === 0 ? 10 : -10,
                rotateY: index % 2 === 0 ? 5 : -5,
                boxShadow: "0 25px 50px -12px rgba(100, 255, 218, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-400 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
              
              <div className="p-4 sm:p-6">
                <motion.h3 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  className="text-xl sm:text-2xl font-bold text-white mb-3"
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  className="text-slate-300 mb-4 text-sm sm:text-base"
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.5, type: "spring" }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span 
                      key={tech}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.7 + techIndex * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-cyan-400/20 text-cyan-400 rounded-full cursor-pointer"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <motion.a 
                    href={project.github}
                    whileHover={{ x: 5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-slate-300 hover:text-white transition-colors py-2 sm:py-0"
                  >
                    <Github className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-sm sm:text-base">Code</span>
                  </motion.a>
                  <motion.a 
                    href={project.live}
                    whileHover={{ x: 5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-slate-300 hover:text-cyan-400 transition-colors py-2 sm:py-0"
                  >
                    <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-sm sm:text-base">Live Demo</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}