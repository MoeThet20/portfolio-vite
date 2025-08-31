import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Smartphone, 
  Server, 
  GitBranch,
  Cloud
} from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5/CSS3', level: 98 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Sass/SCSS', level: 85 }
      ]
    },
    {
      category: 'Backend Development',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'REST APIs', level: 92 },
        { name: 'GraphQL', level: 80 },
        { name: 'Microservices', level: 75 }
      ]
    },
    {
      category: 'Database & Storage',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'MySQL', level: 82 },
        { name: 'Firebase', level: 85 },
        { name: 'Supabase', level: 78 }
      ]
    },
    {
      category: 'DevOps & Cloud',
      icon: Cloud,
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'AWS', level: 82 },
        { name: 'Vercel', level: 90 },
        { name: 'GitHub Actions', level: 80 },
        { name: 'Nginx', level: 75 },
        { name: 'Linux', level: 78 }
      ]
    },
    {
      category: 'Tools & Workflow',
      icon: GitBranch,
      skills: [
        { name: 'Git/GitHub', level: 95 },
        { name: 'VS Code', level: 98 },
        { name: 'Webpack/Vite', level: 85 },
        { name: 'Jest/Vitest', level: 88 },
        { name: 'ESLint/Prettier', level: 90 },
        { name: 'Figma', level: 80 }
      ]
    },
    {
      category: 'Mobile & Cross-Platform',
      icon: Smartphone,
      skills: [
        { name: 'React Native', level: 82 },
        { name: 'Flutter', level: 75 },
        { name: 'PWA', level: 85 },
        { name: 'Expo', level: 80 },
        { name: 'Ionic', level: 70 },
        { name: 'Cordova', level: 65 }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id="skills" className="min-h-screen py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
          >
            A comprehensive overview of my technical skills and proficiency levels across 
            various technologies and frameworks.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + 0.5, duration: 0.6, type: "spring" }}
                >
                  <category.icon className="w-8 h-8 text-cyan-400 mr-3" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                      <span className="text-xs text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5, 
                          duration: 1.2,
                          ease: "easeOut"
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full relative"
                      >
                        <motion.div
                          animate={{ 
                            boxShadow: [
                              "0 0 0px rgba(6, 182, 212, 0.4)",
                              "0 0 20px rgba(6, 182, 212, 0.6)",
                              "0 0 0px rgba(6, 182, 212, 0.4)"
                            ]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-full"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-slate-700"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
              <div className="text-slate-300 text-sm">Years Experience</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-slate-300 text-sm">Projects Completed</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-green-400 mb-2">30+</div>
              <div className="text-slate-300 text-sm">Technologies Used</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-slate-300 text-sm">Learning Mode</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}