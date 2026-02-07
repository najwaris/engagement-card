
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SectionProps } from '../types';


const Section: React.FC<SectionProps> = ({ id, className = "", children }) => {
  // Animation variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id={id} 
      className={`relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden paper-texture ${className}`}
    >
      {/* Parallax-style floating border accents */}
      <motion.img
        src="/assets/top-left.png"
        alt=""
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-40 md:w-56 pointer-events-none"
      />

      <motion.img
        src="/assets/top-right.png"
        alt=""
        initial={{ opacity: 0, x: 50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 right-0 w-40 md:w-56 pointer-events-none"
      />

      <motion.img
        src="/assets/bottom-left.png"
        alt=""
        initial={{ opacity: 0, x: -50, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-0 left-0 w-40 md:w-56 pointer-events-none"
      />

      <motion.img
        src="/assets/bottom-right.png"
        alt=""
        initial={{ opacity: 0, x: 50, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-0 right-0 w-40 md:w-56 pointer-events-none"
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Section;
