import { useState, useEffect } from "react";
import FOOTER_SECTION from "../constants/content/footer.json";
import { FooterSection, FooterLink } from "../types/components/Footer.types";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaGithub, FaXTwitter, FaDiscord, FaLinkedin } from "react-icons/fa6";

const CustomFooter: React.FC = () => {
  const year = new Date().getFullYear();
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to manage mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      id="footer"
      className="bg-darkBlue text-white px-8 pt-12 pb-5 space-y-8"
    >
      <div className="flex flex-wrap justify-between items-start gap-8">
        {/* Left Section: Logo, Description, and Join Button */}
        <div className="space-y-4">
          <a href="https://www.accordproject.org" target="_blank">
            <img
              src="/logo.png"
              alt="Template Playground"
              className="h-9 w-auto"
            />
          </a>
          <p className="text-gray-400 text-sm">
            The open-source smart legal contract stack
          </p>
          <a
            href="mailto:admin@accordproject.org"
            className="text-teal-400 font-semibold text-sm"
          >
            admin@accordproject.org
          </a>
          <a
            href="https://discord.com/invite/Zm99SKhhtA"
            target="_blank"
            className="bg-teal-400 text-darkBlue px-6 py-2 rounded hover:bg-teal-300 transition"
          >
            Join
          </a>
        </div>

        {/* Link Sections */}
        <div className="w-full md:w-auto">
          {isMobile ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-white text-lg mb-2 md:hidden flex items-center gap-1 focus:outline-none focus:ring focus:ring-teal-400"
              aria-expanded={expanded}
            >
              {expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}{" "}
              Other Links
            </button>
          ) : null}

          <div
            className={`${
              expanded || !isMobile ? "block" : "hidden"
            } grid grid-cols-2 md:grid-cols-4 gap-4`}
          >
            {FOOTER_SECTION.sections.map((section: FooterSection) => (
              <div key={section.title} className="space-y-2">
                <h4 className="text-xs uppercase text-gray-400">
                  {section.title}
                </h4>
                {section.links.map((link: FooterLink) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-white text-sm hover:text-teal-400 focus:outline-none focus:ring focus:ring-teal-400"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-600 pt-4 text-sm space-y-4 md:space-y-0">
        <p className="text-gray-400 text-center md:text-left">
          © {year} Accord Project ·{" "}
          <a
            href="https://accordproject.org/privacy"
            target="_blank"
            className="text-teal-400 hover:underline focus:outline-none focus:ring focus:ring-teal-400"
          >
            Trademark Policy
          </a>{" "}
          ·{" "}
          <a
            href="https://accordproject.org/brand-assets"
            target="_blank"
            className="text-teal-400 hover:underline focus:outline-none focus:ring focus:ring-teal-400"
          >
            Brand Assets
          </a>
        </p>

        {/* Social Links */}
        <div className="flex space-x-4 text-white">
          {[
            {
              href: "https://github.com/accordproject",
              icon: <FaGithub />,
            },
            {
              href: "https://twitter.com/AccordHQ",
              icon: <FaXTwitter />,
            },
            {
              href: "https://discord.com/invite/Zm99SKhhtA",
              icon: <FaDiscord />,
            },
            {
              href: "https://www.linkedin.com/company/accordproject/",
              icon: <FaLinkedin />,
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              className="text-xl hover:text-teal-400 focus:outline-none focus:ring focus:ring-teal-400"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
