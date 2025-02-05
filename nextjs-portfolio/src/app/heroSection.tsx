import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const TypewriterText: React.FC = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Innovator",
  ];

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < words[wordIndex].length) {
        currentText += words[wordIndex][currentIndex];
        setText(currentText);
        currentIndex++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setText("");
        }, 2000);
      }
    };

    typeWriter();
  }, [wordIndex]);

  return (
    <span className="text-blue-400">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 glassmorphism rounded-full text-blue-400 hover:text-blue-300 transition-colors"
    title={label}
  >
    {icon}
  </motion.a>
);

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-12 md:py-24 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            Hi, I'm Akash T K
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
          I'm a <TypewriterText />
        </h2>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          B.Tech graduate in Information Technology, passionate about building
          innovative solutions and transforming ideas into reality through
          elegant code.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <SocialLink
            href="https://github.com/akash-tk"
            icon={<Github />}
            label="GitHub"
          />
          <SocialLink
            href="https://in.linkedin.com/in/akash-tk"
            icon={<Linkedin />}
            label="LinkedIn"
          />
          <SocialLink
            href="mailto:akash.tk333@gmail.com"
            icon={<Mail />}
            label="Email"
          />
          <SocialLink
            href="https://twitter.com/akash_tk"
            icon={<Twitter />}
            label="Twitter"
          />
          <SocialLink
            href="https://www.instagram.com/imakashtk"
            icon={<Instagram />}
            label="Instagram"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-green-500 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            View My Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-6 py-3 text-sm sm:text-base border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all"
          >
            Contact Me
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
