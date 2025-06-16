"use client";

import { useEffect, useState } from "react";
import { Github, Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import HeroSection from "./heroSection";
type SectionVisibility = {
  hero: boolean;
  about: boolean;
  projects: boolean;
  skills: boolean;
  certifications: boolean;
  contact: boolean;
};

const skills = {
  "Frontend Development": [
    "React.js",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Material UI",
  ],
  "Backend Development": [
    "Python",
    "Django",
    "Node.js",
    "Express.js",
    "PHP",
    "MongoDB",
    "MySQL",
    "gRPC",
    "Microservices",
    "REST API",
    "JWT",
  ],
  "Programming Languages": [
    "Python",
    "JavaScript",
    "PHP",
    "SQL",
    "TypeScript",
    "Java",
    "C",
    "LaTeX",
  ],
  "Tools & Technologies": [
    "Git",
    "Postman",
    "Jest",
    "OpenCV",
    "MediaPipe",
    "Figma",
    "Agora",
    "GCP (Google Cloud Platform)",
    "JIRA",
    "Backlog/Nulab",
    "Swagger",
    "LangChain",
  ],
};

const projects = [
  {
    title: "GestureX",
    description:
      "Open Source Linux Control Solution using hand gesture recognition with MediaPipe and OpenCV",
    tools: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/akash-tk/GestureX",
    image: "/images/ges.jpg",
  },
  {
    title: "PCRMS",
    description:
      "Police Crime Record Management System with secure authentication and comprehensive record management",
    tools: ["MySQL", "PHP", "HTML", "CSS"],
    github: "https://github.com/akash-tk/Police-Crime-Record-Management-System",
    image: "/images/pcrms.png",
  },
  {
    title: "Sentinel Eye",
    description:
      "Comprehensive Wireless Network Security Analysis System with automated attack detection",
    tools: ["Python", "Pushover Cloud API", "Arduino IDE"],
    github: "https://github.com/akash-tk/SentinelEye-WIDS",
    image: "/images/seye.jpg",
  },
  {
    title: "Contactflix",
    description:
      "Full-stack MERN Contact Management System with advanced filtering and organization features",
    tools: ["MongoDB", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/akash-tk/contactflix",
    image: "/images/contactflix1.png",
  },
  {
    title: "E-Commerce Analytics Platform",
    description:
      "A Django-based analytics platform for e-commerce businesses, providing insights into sales, customer behavior, and inventory management. Features include advanced data models, sales analytics, product recommendations, secure JWT-authenticated APIs, and Excel export functionality.",
    tools: ["Django", "MySQL", "JWT Authentication", "openpyxl"],
    github: "https://github.com/akash-tk/ecommerce_analytics_platform",
    image: "/images/ecom.jpg",
  },
  {
    title: "LangChain-Q-A",
    description:
      "A full-stack Q&A chatbot built with React and Django, powered by LangChain and Hugging Face’s Meta-Llama-3-8B-Instruct model.",
    tools: [
    "React",
    "Django",
    "Django REST Framework",
    "LangChain",
    "Meta-Llama-3-8B-Instruct",
    "Hugging Face",
    "Python",
    "JavaScript"
],
    github: "https://github.com/akash-tk/LangChain-Q-A",
    image: "/images/LangChain-Q-A.png",
  },
];

const certifications = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera",
    date: "2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/UD9GWT2U3QWH",
    badgeUrl:
      "https://www.credly.com/badges/4737e34c-709f-4387-aec6-1e00dd16e970",
    image:
      "https://images.credly.com/size/680x680/images/0bf0f2da-a699-4c82-82e2-56dcf1f2e1c7/image.png",
  },
  {
    title: "Google AI Essentials",
    issuer: "Coursera",
    date: "2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/JTFA323Y4XVH",
    badgeUrl:
      "https://www.credly.com/badges/79161a22-9dc1-4553-87a1-b51d58e02f85",
    image:
      "https://images.credly.com/size/340x340/images/ea3eec65-ddad-4242-9c59-1defac0fa2d9/image.png",
  },
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "2024",
    credentialUrl: "https://badgr.com/public/assertions/7xrGMz73SCem2UYrC7fy0Q",
    image:
      "https://media.badgr.com/uploads/badges/assertion-7xrGMz73SCem2UYrC7fy0Q.png?versionId=oKnASCHtJEyK1ElN8jfxGWd1FarKPcVl",
  },
  {
    title: "Elements of AI",
    issuer: "University of Helsinki, Finland",
    date: "2024",
    credentialUrl: "https://certificates.mooc.fi/validate/eb4wx4lctgk",
    image: "https://elementsofai.s3.amazonaws.com/course1-banner.svg",
  },
  {
    title: "Enterprise Design Thinking Co-Creator",
    issuer: "IBM",
    date: "2024",
    credentialUrl:
      "https://www.credly.com/badges/fee9849b-2da1-4e05-a6b3-add2c4ce7a96",
    image:
      "https://images.credly.com/size/340x340/images/2700b813-82b8-4232-9b36-5dcd5cd24584/Badges_v8-08_Co-Creator.png",
  },
  {
    title: "Enterprise Design Thinking - Team Essentials for AI",
    issuer: "IBM",
    date: "2024",
    credentialUrl:
      "https://www.credly.com/badges/7ad0cfbc-a273-4ee2-a8c4-f745b0aec11c",
    image:
      "https://images.credly.com/size/680x680/images/09f644d1-eed2-4279-bc49-1e26cddc9d3d/Team_Essentials.png",
  },
  {
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    date: "2024",
    credentialUrl:
      "https://www.credly.com/badges/131878ae-3915-4702-88c1-4237d747914a",
    image:
      "https://images.credly.com/size/680x680/images/bc08972c-3c7d-4b99-82a0-c94bcca36674/Badges_v8-07_Practitioner.png",
  },
  {
    title: "Level 3 GenAI: Prompt Engineering",
    issuer: "Google Cloud",
    date: "2024",
    credentialUrl:
      "https://www.cloudskillsboost.google/public_profiles/1a7be89f-5d8d-4111-99f0-f488855e983a/badges/5700628",
    image:
      "https://cdn.qwiklabs.com/WlxuAP5%2FfVCEXdaQuf7pGIFM8sDgjZ1Q0TSFlRpJofQ%3D",
  },
  {
    title: "Build and Secure Networks in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    credentialUrl:
      "https://www.cloudskillsboost.google/public_profiles/1a7be89f-5d8d-4111-99f0-f488855e983a/badges/5700004",
    image:
      "https://cdn.qwiklabs.com/6QsPX5Wdg0eHWFed3ZKTbX2c88yVFGgaWPlYt%2BJdp4Q%3D",
  },
];

export default function Page() {
  const [isVisible, setIsVisible] = useState<SectionVisibility>({
    hero: false,
    about: false,
    projects: false,
    skills: false,
    certifications: false,
    contact: false,
  });
  
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#03020d";
    document.body.style.backgroundColor = "#03020d";
    
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 50);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px 0px' 
      }
    );

    const sections = document.querySelectorAll(".section-fade");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [isPageLoaded]);

  useEffect(() => {
  const preloadImages = () => {
    projects.forEach(project => {
      const img = new window.Image();
      img.src = project.image;
    });
    
    certifications.forEach(cert => {
      const img = new window.Image();
      img.src = cert.image;
    });
  };
  
  if (isPageLoaded) {
    preloadImages();
  }
}, [isPageLoaded]);

  if (!isPageLoaded) {
    return (
      <div className="min-h-screen bg-[#03020d] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="space-y-20 text-white min-h-screen p-8">
      <div
        id="about"
        className={`section-fade glassmorphism p-8 rounded-xl text-center backdrop-blur-lg shadow-lg transition-all duration-700 transform hover:scale-105 ${
          isVisible.about
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          <HeroSection />
        </div>
      </div>

      <div
        id="projects"
        className={`section-fade glassmorphism p-8 rounded-xl backdrop-blur-lg shadow-lg transition-all duration-700 transform ${
          isVisible.projects
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-white">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glassmorphism rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="responsive"
                  width={500}
                  height={300}
                  className="object-contain"
                  priority={index < 2}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="skills"
        className={`section-fade glassmorphism p-8 rounded-xl backdrop-blur-lg shadow-lg transition-all duration-700 transform hover:scale-105 ${
          isVisible.skills
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-white">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillList.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="certifications"
        className={`section-fade glassmorphism p-8 rounded-xl backdrop-blur-lg shadow-lg transition-all duration-700 transform ${
          isVisible.certifications
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-white">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="glassmorphism p-6 rounded-lg transition-all duration-300 hover:scale-105 flex flex-col items-center text-center group h-full"
            >
              <div className="w-24 h-24 mb-4 relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain rounded-lg"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 rounded-lg"></div>
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-300 mb-2">{cert.issuer}</p>
              <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
              <div className="flex-grow"></div>
              <div className="flex flex-col gap-2 w-full mt-4">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 px-4 py-2 rounded-lg border border-blue-400/20 hover:border-blue-400/40"
                >
                  <Award className="w-4 h-4" />
                  View Certificate
                  <ExternalLink className="w-4 h-4" />
                </a>
                {cert.badgeUrl && (
                  <a
                    href={cert.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300 px-4 py-2 rounded-lg border border-green-400/20 hover:border-green-400/40"
                  >
                    <Award className="w-4 h-4" />
                    View Badge
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="contact"
        className={`section-fade glassmorphism p-8 rounded-xl backdrop-blur-lg shadow-lg transition-all duration-700 transform hover:scale-105 ${
          isVisible.contact
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-white">Contact</h2>
        <p className="text-gray-300">
          Feel free to reach out at{" "}
          <a
            href="mailto:akash.tk333@gmail.com"
            className="text-blue-400 hover:underline"
          >
            akash.tk333@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
