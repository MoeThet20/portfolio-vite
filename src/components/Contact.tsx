import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { VALIDATION_RULES } from "../constants";

// Define the form data type
type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

// Create Zod schema for form validation
const createContactSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .min(1, t("contact.form.validation.nameRequired"))
      .min(VALIDATION_RULES.MIN_NAME_LENGTH, t("contact.form.validation.nameMinLength", {
        min: VALIDATION_RULES.MIN_NAME_LENGTH,
      })),
    email: z
      .string()
      .min(1, t("contact.form.validation.emailRequired"))
      .email(t("contact.form.validation.emailInvalid")),
    message: z
      .string()
      .min(1, t("contact.form.validation.messageRequired"))
      .min(VALIDATION_RULES.MIN_MESSAGE_LENGTH, t("contact.form.validation.messageMinLength", {
        min: VALIDATION_RULES.MIN_MESSAGE_LENGTH,
      }))
      .max(VALIDATION_RULES.MAX_MESSAGE_LENGTH, t("contact.form.validation.messageMaxLength", {
        max: VALIDATION_RULES.MAX_MESSAGE_LENGTH,
      })),
  });

export default function Contact() {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const contactSchema = createContactSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Auto-reset form and hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000); // Hide success message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.labels.email"),
      value: t("contact.info.email"),
    },
    {
      icon: Phone,
      label: t("contact.info.labels.phone"),
      value: t("contact.info.phone"),
    },
    {
      icon: MapPin,
      label: t("contact.info.labels.location"),
      value: t("contact.info.location"),
    },
  ];

  const socialLinks = [
    {
      href: "#",
      label: "GitHub",
      iconPath:
        "M12 2c5.514 0 10 4.486 10 10 0 4.411-2.865 8.147-6.839 9.465-.5.092-.682-.217-.682-.483 0-.237.008-.868.013-1.703 2.782.605 3.369-1.343 3.369-1.343.454-1.158 1.11-1.466 1.11-1.466.908-.62-.069-.608-.069-.608-1.003.07-1.531 1.032-1.531 1.032-.892 1.53-2.341 1.088-2.91.832-.092-.647-.35-1.088-.636-1.338 2.22-.253 4.555-1.113 4.555-4.951 0-1.093-.39-1.988-1.029-2.688.103-.253.446-1.272-.098-2.65 0 0-.84-.27-2.75 1.026A9.564 9.564 0 0112 6.844c-.85.004-1.705.115-2.504.337-1.909-1.296-2.747-1.027-2.747-1.027-.546 1.379-.202 2.398-.1 2.651-.64.7-1.028 1.595-1.028 2.688 0 3.848 2.339 4.695 4.566 4.943-.288.248-.546.73-.546 1.467 0 1.061-.01 1.917-.01 2.176 0 .269-.18.579-.688.481C4.865 20.147 2 16.411 2 12 2 6.486 6.486 2 12 2z",
    },
    {
      href: "#",
      label: "LinkedIn",
      iconPath:
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      href: "#",
      label: "Twitter",
      iconPath:
        "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    },
  ];

  const formFields = [
    {
      name: "name",
      label: t("contact.form.name.label"),
      type: "text",
      placeholder: t("contact.form.name.placeholder"),
    },
    {
      name: "email",
      label: t("contact.form.email.label"),
      type: "text",
      placeholder: t("contact.form.email.placeholder"),
    },
    {
      name: "message",
      label: t("contact.form.message.label"),
      type: "textarea",
      placeholder: t("contact.form.message.placeholder"),
    },
  ];

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv-resume.pdf";
    link.download = "Zaw-Moe-Thet-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("idle");

    try {
      // EmailJS configuration
      const result = await emailjs.send(
        "service_5my9t1e",
        "template_9ibwldk",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: "mrzawmoethet@gmail.com",
        },
        "J-wh23WiHvcI87QLI"
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");
      
      // Reset form immediately after successful submission
      reset({
        name: "",
        email: "",
        message: ""
      }, {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false
      });
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

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
            {t("contact.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100, rotateZ: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
          >
            {t("contact.description")} {t("contact.description2")}
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
              {t("contact.info.title")}
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
                    transition: { duration: 0.3 },
                  }}
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      duration: 0.6,
                      type: "spring",
                    }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <info.icon className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {info.label}
                    </p>
                    <p className="text-white font-semibold text-sm sm:text-base break-all">
                      {info.value}
                    </p>
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
                {t("contact.connect.title")}
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
                      transition={{
                        delay: 1 + index * 0.1,
                        duration: 0.5,
                        type: "spring",
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        rotate: 5,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 sm:w-12 h-10 sm:h-12 bg-slate-800 hover:bg-cyan-400 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                    >
                      <svg
                        className="w-5 sm:w-6 h-5 sm:h-6 text-slate-300 group-hover:text-slate-900"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-label={social.label}
                      >
                        <path d={social.iconPath} />
                      </svg>
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
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCV}
                  className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("contact.connect.resume")}</span>
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
              transition: { duration: 0.3 },
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
              {t("contact.form.title")}
            </motion.h3>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6"
              >
                <p className="text-green-400 text-sm">
                  {t("contact.form.success")}
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6"
              >
                <p className="text-red-400 text-sm">
                  {t("contact.form.error")}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: 30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                  }}
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
                  {field.type === "textarea" ? (
                    <motion.textarea
                      {...register(field.name as keyof ContactFormData)}
                      rows={5}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileFocus={{
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base ${
                        errors[field.name as keyof ContactFormData]
                          ? "border-red-500 focus:border-red-400"
                          : "border-slate-600 focus:border-cyan-400"
                      }`}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <motion.input
                      {...register(field.name as keyof ContactFormData)}
                      type={field.type}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileFocus={{
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-all duration-300 text-sm sm:text-base ${
                        errors[field.name as keyof ContactFormData]
                          ? "border-red-500 focus:border-red-400"
                          : "border-slate-600 focus:border-cyan-400"
                      }`}
                      placeholder={field.placeholder}
                    />
                  )}
                  {errors[field.name as keyof ContactFormData] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-red-400 text-xs sm:text-sm"
                    >
                      {errors[field.name as keyof ContactFormData]?.message}
                    </motion.p>
                  )}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.05,
                  y: isSubmitting ? 0 : -2,
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 10px 25px -5px rgba(100, 255, 218, 0.4)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
              >
                {isSubmitting ? t("common.loading") : t("contact.form.submit")}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
