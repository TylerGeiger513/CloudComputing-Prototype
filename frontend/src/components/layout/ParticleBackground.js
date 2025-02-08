// frontend/src/components/layout/ParticleBackground.js
import React, { useCallback, useContext, useLayoutEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ThemeContext } from "../../context/themeContext";

const ParticleBackground = () => {
  const { theme } = useContext(ThemeContext);

  const getParticleOptions = useCallback(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    // Read the updated CSS variable values for particle colors.
    const primaryColor = rootStyles.getPropertyValue('--primary-a30').trim() || "#975cce";
    const surfaceColor = rootStyles.getPropertyValue('--surface-a0').trim() || "#ffffff";

    return {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: surfaceColor } },
      particles: {
        number: { value: 120, density: { enable: true, area: 800 } },
        color: { value: primaryColor },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: { min: 2, max: 4 }, random: true },
        move: { enable: true, speed: 3, direction: "none", random: true },
        links: {
          enable: true,
          distance: 120,
          color: primaryColor,
          opacity: 0.4,
          width: 1.2,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 150, lineLinked: { opacity: 0.7 } },
          push: { quantity: 5 },
        },
      },
      detectRetina: true,
    };
  }, []);

  // Initialize state with the computed options.
  const [particleOptions, setParticleOptions] = useState(getParticleOptions);

  // Delay the update so that the CSS variables have time to update.
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setParticleOptions(getParticleOptions());
    }, 0);
    return () => clearTimeout(timer);
  }, [theme, getParticleOptions]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      key={theme}  // Remount on theme change.
      id="tsparticles"
      init={particlesInit}
      options={particleOptions}
    />
  );
};

export default ParticleBackground;
