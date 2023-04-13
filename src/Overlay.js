import { motion } from "framer-motion"
import React, { useEffect } from "react"

export default function Overlay() {
  const handleMouseDown = () => {
    window.document.body.style.cursor = "grabbing"
  }

  const handleMouseUp = () => {
    window.document.body.style.cursor = "grab"
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="container">
      <div className="crosshair">
        <img src="/focus.svg" alt="focus" />
      </div>
      <motion.header
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 6,
          delay: 6
        }}
      >
        <h3
          onClick={() => {
            window.open("https://andersonmancini.dev", "tab")
          }}
        >
          ANDERSONMANCINI.DEV
        </h3>
        <motion.button
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-120%", opacity: 0 }}
          transition={{
            delay: 2.6
          }}
          className="ctaButton contact"
          onClick={() => {
            window.open("https://andersonmancini.dev", "tab")
          }}
        >
          GET IN TOUCH
        </motion.button>
      </motion.header>
      <section className="overlay">
        <motion.h1
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-100%", opacity: 0 }}
          transition={{
            duration: 1.8,
            delay: 2.5
          }}
        >
          Autofocus Depth of field component for react three fiber
        </motion.h1>
        <motion.p
          className="support"
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-100%", opacity: 0 }}
          transition={{
            duration: 1.8,
            delay: 2.5
          }}
        >
          This component scans all objects on the canvas looking for points in the center of the screen to focus the camera on, passing the focus distance as a real camera would. See how the focus changes according to the object's distance from the center of the screen.
        </motion.p>
        <motion.div
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-120%", opacity: 0 }}
          transition={{
            delay: 2.6
          }}
          className="buttons-container"
        >
          <button
            animate={{ translateX: "0%", opacity: 1 }}
            initial={{ translateX: "-120%", opacity: 0 }}
            transition={{
              delay: 2.6
            }}
            className="ctaButton"
            onClick={() => {
              window.open("https://andersonmancini.dev", "tab")
            }}
          >
            GET THE COMPONENT
          </button>
        </motion.div>
      </section>
      <footer>
        Created by Anderson Mancini. Model credits:{" "}
        <a href="https://skfb.ly/6SHOU" target="_blank" rel="noreferrer">
          Hutt in Forest Lowpoly Diorama
        </a>{" "}
        by Felix.Barthel is licensed under Creative Commons Attribution .
      </footer>
    </div>
  )
}
