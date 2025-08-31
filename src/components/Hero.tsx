import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-resume.pdf';
    link.download = 'John-Developer-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      <div className="text-center z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 100, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            >
              Hello, I'm{' '}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 100, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                delay: 1.2, 
                duration: 0.8, 
                type: "spring",
                stiffness: 150
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
            >
              Developer
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 50, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.6,
            type: "spring",
            stiffness: 100
          }}
          className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            Full-stack developer passionate about creating beautiful,
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            functional web experiences with modern technologies.
          </motion.span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 2.2,
            type: "spring",
            stiffness: 120
          }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4"
        >
          <motion.button 
            initial={{ opacity: 0, x: -100, rotateZ: -10 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ delay: 2.4, duration: 0.6, type: "spring" }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              rotateZ: 1,
              boxShadow: "0 20px 40px -10px rgba(100, 255, 218, 0.4)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer text-center"
          >
            View Projects
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, x: 100, rotateZ: 10 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ delay: 2.6, duration: 0.6, type: "spring" }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              rotateZ: -1,
              backgroundColor: "rgba(100, 255, 218, 1)",
              color: "rgba(15, 23, 42, 1)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCV}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-center"
          >
            Download CV
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.8, type: "spring" }}
          className="mt-8 sm:mt-12 flex justify-center space-x-2 sm:space-x-6 px-4"
        >
          {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 30, rotateY: -45 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: 3.2 + index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ 
                scale: 1.2, 
                y: -5,
                rotateZ: Math.random() * 10 - 5,
                transition: { duration: 0.3 }
              }}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-cyan-400/20 text-cyan-400 rounded-full"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0.7, 1], 
          y: [30, 0, 5, 0, 5], 
          scale: [0, 1, 1.1, 1, 1.1] 
        }}
        transition={{ 
          delay: 3.5, 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <motion.div
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          />
        ))}
      </motion.div>
    </section>
  )
}