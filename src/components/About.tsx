import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone } from 'lucide-react'

export default function About() {
  const skills = [
    { icon: Code, name: 'Frontend Development', desc: 'React, TypeScript, Tailwind CSS' },
    { icon: Database, name: 'Backend Development', desc: 'Node.js, Python, PostgreSQL' },
    { icon: Globe, name: 'Web Technologies', desc: 'HTML5, CSS3, JavaScript ES6+' },
    { icon: Smartphone, name: 'Mobile Development', desc: 'React Native, Flutter' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, y: 30 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section id="about" className="min-h-screen py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            About Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
          >
            I'm a passionate developer with expertise in modern web technologies. 
            I love creating innovative solutions and bringing ideas to life through code.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                x: 10,
                transition: { duration: 0.3 }
              }}
              className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors duration-300"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6, type: "spring" }}
              >
                <skill.icon className="w-10 sm:w-12 h-10 sm:h-12 text-cyan-400 mb-3 sm:mb-4" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{skill.name}</h3>
              <p className="text-sm sm:text-base text-slate-300">{skill.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -100, rotateY: -15 }}
          whileInView={{ 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: {
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            x: 10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            transition: { duration: 0.3 }
          }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-slate-700"
        >
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            My Journey
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            With over 3 years of experience in web development, I've worked on diverse projects 
            ranging from small business websites to large-scale applications. I'm constantly learning 
            new technologies and staying up-to-date with industry trends to deliver cutting-edge solutions.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}