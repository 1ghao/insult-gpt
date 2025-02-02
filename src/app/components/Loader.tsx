import React from "react";
import { motion } from "framer-motion";

const dotVariants = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2,
    },
  }),
};

const dotStyle: React.CSSProperties = {
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "#000",
  borderRadius: "50%",
  margin: "0 4px",
};

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={dotStyle}
          variants={dotVariants}
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

export default Loader;
