import React from "react";
import styles from "./Modal.module.scss";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  transition: {
    duration: 0.2,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25,
    },
  },
};

const modalContentVariant = {
  hidden: {
    opacity: 0,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
};

function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className={styles["backdrop"]}
      onClick={onClick}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
}

function Modal({ children, className, hideModal, closingButtonText, show }) {
  return (
    <AnimatePresence>
      {show && (
        <Backdrop onClick={() => hideModal()}>
          <motion.div
            className={
              className ? `${className} ${styles["modal"]}` : styles["modal"]
            }
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={modalContentVariant}>{children}</motion.div>
            <Button
              className={styles["closeBtn"]}
              onClick={() => hideModal()}
              text={closingButtonText}
            />
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

export default Modal;
