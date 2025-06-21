import { motion } from "motion/react";

export default function AuthSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
      className={` ${className}`}
    >
      {children}
    </motion.div>
  );
}
