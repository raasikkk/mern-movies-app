// SlideUpText.js
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SlideUpText = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      className={`transition-all ${className}`}
      initial={{ y: 30, opacity: 0 }}
      animate={{
        y: isInView ? 0 : 30, // Moves from 30px down to 0px
        opacity: isInView ? 1 : 0, // Fade-in effect
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 25,
        delay: 0.2, // Small delay to make it feel more smooth
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpText;
