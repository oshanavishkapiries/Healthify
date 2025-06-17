import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden blur-7xl">
      <motion.div
        className="absolute w-[120%] h-[120%] rotate-60 bg-gradient-to-r from-primary via-background to-primary rounded-full blur-3xl opacity-60"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360, 0],
          x: ["-10%", "10%", "-10%"],
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
