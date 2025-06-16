import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function AnimatedContainer({
  children,
  className,
}: AnimatedContainerProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const AnimatedItem = ({
  children,
  className,
}: AnimatedContainerProps) => {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};
