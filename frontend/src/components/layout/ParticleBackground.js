import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles initialized");
    await loadSlim(engine); // Load lightweight engine for performance
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Set as background
        background: { color: "#f5f5fa" }, // Light background for modern UI
        particles: {
          number: { value: 120, density: { enable: true, area: 800 } }, // Dynamic count
          color: { value: "#6a0dad" }, // Purple particles
          shape: { type: "circle" },
          opacity: { value: 0.6, random: true },
          size: { value: { min: 2, max: 4 }, random: true },
          move: { enable: true, speed: 3, direction: "none", random: true },
          links: {
            enable: true,
            distance: 120,
            color: "#6a0dad",
            opacity: 0.4,
            width: 1.2,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" }, // Allows grabbing particles
            onClick: { enable: true, mode: "push" }, // Allows clicking to push new particles
          },
          modes: {
            grab: { distance: 150, lineLinked: { opacity: 0.7 } }, // Enhances the grab effect
            push: { quantity: 5 }, // Adds more particles on click
          },
        },
        detectRetina: true, // Ensures sharp visuals
      }}
    />
  );
};

export default ParticlesBackground;
