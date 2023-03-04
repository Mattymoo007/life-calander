export const dropdownMenuAnimate = {
  enter: {
    opacity: 1,
    scale: 1,
    display: "block",
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const calanderAnimate = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.002,
    },
  },
};

export const calanderItemAnimate = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
