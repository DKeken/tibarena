"use client";

import { HTMLMotionProps, motion } from "framer-motion";

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export const MotionDiv = motion.div;
