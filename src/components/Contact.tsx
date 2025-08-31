import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download } from 'lucide-react'

export default function Contact() {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@developer.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ]

  const formFields = [
    { label: 'Name', type: 'text', placeholder: 'Your name' },
    { label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
    { label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...' }
  ]

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-resume.pdf';
    link.download = 'John-Developer-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    hidden: { opacity: 0, x: -50, y: 20 },
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
    <section id="contact" className="min-h-screen py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -100, rotateZ: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 100, rotateZ: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
          >
            I'm always open to discussing new opportunities and interesting projects. 
            Let's connect and create something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h3 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8"
            >
              Contact Information
            </motion.h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={info.label} 
                  variants={itemVariants}
                  whileHover={{ 
                    x: 10, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6, type: "spring" }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <info.icon className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-slate-400 text-xs sm:text-sm">{info.label}</p>
                    <p className="text-white font-semibold text-sm sm:text-base break-all">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-lg sm:text-xl font-semibold text-white mb-4"
              >
                Connect & Download
              </motion.h4>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, y: 30, scale: 0 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring" }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 sm:w-12 h-10 sm:h-12 bg-slate-800 hover:bg-cyan-400 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                    >
                      <social.icon className="w-5 sm:w-6 h-5 sm:h-6 text-slate-300 group-hover:text-slate-900" />
                    </motion.a>
                  ))}
                </div>
                
                <motion.button
                  initial={{ opacity: 0, y: 30, scale: 0 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(100, 255, 218, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCV}
                  className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{
              x: -5,
              boxShadow: "0 25px 50px -12px rgba(100, 255, 218, 0.25)",
              transition: { duration: 0.3 }
            }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-slate-700"
          >
            <motion.h3 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-6"
            >
              Send Message
            </motion.h3>
            
            <form className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: 30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6, type: "spring" }}
                >
                  <motion.label 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="block text-slate-300 mb-2 text-sm sm:text-base"
                  >
                    {field.label}
                  </motion.label>
                  {field.type === 'textarea' ? (
                    <motion.textarea 
                      rows={5}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileFocus={{ scale: 1.02, transition: { duration: 0.3 } }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <motion.input 
                      type={field.type}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileFocus={{ scale: 1.02, transition: { duration: 0.3 } }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                      placeholder={field.placeholder}
                    />
                  )}
                </motion.div>
              ))}
              
              <motion.button 
                type="submit"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(100, 255, 218, 0.4)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}