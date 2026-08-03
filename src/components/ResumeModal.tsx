import React, { useRef } from 'react';
import { X, Download, Printer, FileText, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#a855f7', '#ec4899', '#38bdf8'],
    });
    window.print();
  };

  const handleDownloadHtml = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#a855f7', '#ec4899', '#38bdf8'],
    });

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ujala Maurya — Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap');
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111;
      line-height: 1.45;
      margin: 0;
      padding: 40px;
      background-color: #fff;
    }
    .resume-container {
      max-w: 800px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    .contact-info {
      text-align: center;
      font-size: 13px;
      margin-bottom: 20px;
    }
    .contact-info a {
      color: #0056b3;
      text-decoration: none;
    }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1px solid #222;
      padding-bottom: 2px;
      margin-top: 18px;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    p, li {
      font-size: 13px;
    }
    ul {
      margin: 4px 0 10px 20px;
      padding: 0;
    }
    li {
      margin-bottom: 4px;
    }
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .job-title {
      font-style: italic;
    }
    .bold {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <h1>Ujala Maurya</h1>
    <div class="contact-info">
      8468018202 · <a href="mailto:ujalamaurya202@gmail.com">ujalamaurya202@gmail.com</a><br>
      <a href="https://github.com/ujala54321">github.com/ujala54321</a> · 
      <a href="https://linkedin.com/in/ujala-maurya-136b2532a/">linkedin.com/in/ujala-maurya-136b2532a/</a> · 
      <a href="https://leetcode.com/u/ujala_maurya02/">leetcode.com/u/ujala_maurya02/</a>
    </div>

    <div class="section-title">Professional Summary</div>
    <p>Results-oriented Software Engineer with a Master of Computer Application and hands-on experience developing robust web applications using the .NET ecosystem. Proficient in C#, ASP.NET Core, and modern web technologies, with a strong foundation in MVC architecture, database design, and object-oriented programming. Adept at building user-centric solutions from backend API development to frontend integration. Seeking to leverage technical expertise to deliver scalable and efficient software solutions.</p>

    <div class="section-title">Skills</div>
    <ul>
      <li><span class="bold">Languages:</span> C#, Python, TypeScript, JavaScript, SQL</li>
      <li><span class="bold">Technologies & Frameworks:</span> ASP.NET Core (.NET 8 / .NET 6), .NET Framework 4.5, Angular, Entity Framework Core, LINQ, REST APIs, MVC</li>
      <li><span class="bold">Frontend:</span> HTML5, CSS3, Bootstrap, Responsive Design</li>
      <li><span class="bold">Tools & DevOps:</span> Git, GitHub, Visual Studio, Postman, SQL Server, MySQL, Gen AI, Copilot</li>
      <li><span class="bold">Core Competencies:</span> Object-Oriented Programming (OOP), Data Structures, Database Design, Debugging, Application Maintenance</li>
      <li><span class="bold">Additional Skills:</span> Content Writing & Blogging</li>
    </ul>

    <div class="section-title">Work Experience</div>
    <div class="flex-between">
      <span class="bold">Zebra TechnoSys</span>
      <span class="job-title">Lucknow, India</span>
    </div>
    <div class="flex-between" style="margin-bottom: 6px;">
      <span class="job-title">Software Engineer</span>
      <span>Nov 2024 – Present</span>
    </div>
    <ul>
      <li><span class="bold">Digital Awareness Web Application:</span> Engineered a comprehensive content management platform using C#, ASP.NET Core, and SQL Server, enabling administrators to efficiently distribute and manage digital awareness resources to a wide user base.</li>
      <li><span class="bold">Chaudhary Finance Platform:</span> Developed frontend features for a financial services web application using JavaScript, HTML5, and CSS3, improving user engagement for mutual fund investments and insurance support services.</li>
      <li><span class="bold">Application Maintenance & Enhancement:</span> Conducted regular code reviews, debugging, and system optimizations across multiple web applications, successfully reducing technical debt and improving overall application performance and stability.</li>
      <li><span class="bold">Content Writing:</span> Wrote blogs and articles for Upgrate Infotech, an associated client project, contributing to their technical content and online presence alongside core development work.</li>
    </ul>

    <div class="section-title">Project Work</div>
    <div class="bold">Book Shop E-commerce Application</div>
    <div style="font-style: italic; font-size: 12px; margin-bottom: 6px;">Technologies: ASP.NET Core MVC, C# Web API, Entity Framework Core, SQL Server, HTML5, CSS3</div>
    <ul>
      <li>Architected and deployed a fully functional online bookstore utilizing ASP.NET Core MVC and SQL Server.</li>
      <li>Implemented secure user authentication, shopping cart functionality, and a seamless checkout flow, ensuring a secure and user-friendly experience.</li>
      <li>Developed a comprehensive administrative dashboard for efficient management of book inventory, product categories, and order processing.</li>
      <li>Utilized the Repository pattern and LINQ queries for optimized data access, ensuring clean, maintainable, and scalable code architecture.</li>
    </ul>

    <div class="section-title">Education</div>
    <div class="flex-between">
      <span class="bold">Master of Computer Application (MCA)</span>
      <span>Aug 2023 – Jun 2025</span>
    </div>
    <div style="margin-bottom: 4px;">IISE, Lucknow — <span class="bold">CGPA: 7.8/10</span></div>
    <ul>
      <li><span class="bold">Relevant Coursework:</span> Object Oriented Programming, Databases, Discrete Maths, Data Structures and Algorithms, Operating Systems, Computer Networks, Machine Learning, Data Mining, Advance Data Structures and Algorithms, Cyber Security, IOT, TOC.</li>
    </ul>

    <div class="flex-between" style="margin-top: 8px;">
      <span class="bold">B.Sc. in Mathematics</span>
      <span>Aug 2020 – Jun 2023</span>
    </div>
    <div>RHS Mahavidyalaya</div>

    <div class="section-title">Certifications & Achievements</div>
    <ul>
      <li><span class="bold">micro1 AI Interview Certification</span> — Recognized for Outstanding Performance in a live AI-driven technical interview assessment (June 2026)</li>
      <li><span class="bold">Microsoft Learn, C# Programming & .NET Fundamentals</span> — Completed certified modules covering C# classes and objects, .NET Class Library methods, decision logic, arrays, and clean code conventions (11 badges, 3 trophies earned, Level 5, 2026)</li>
      <li><span class="bold">Microsoft Learn, Get Started with AI Agent Development on Azure</span> (2026)</li>
    </ul>

    <div class="section-title">Awards and Strengths</div>
    <ul>
      <li><span class="bold">Award:</span> Awarded a certificate for presenting research on "Data Cleaning and Pre-Processing."</li>
      <li><span class="bold">Strengths:</span> Highly adaptable, eager to relocate globally, and an enthusiastic learner committed to assimilating new technologies to solve complex challenges.</li>
    </ul>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ujala_Maurya_Software_Engineer_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto backdrop-blur-2xl bg-slate-950/90 print:p-0 print:bg-white print:static">
        
        {/* CSS for print mode */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #resume-print-area, #resume-print-area * {
              visibility: visible;
            }
            #resume-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 20px;
              background-color: white !important;
              color: black !important;
              font-family: 'Times New Roman', Times, serif !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[95vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:bg-white print:my-0"
        >
          {/* Top Control Bar (Hidden on print) */}
          <div className="flex flex-wrap items-center justify-between p-4 sm:p-6 bg-slate-950 border-b border-slate-800 gap-4 no-print">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">Curriculum Vitae</h3>
                <p className="text-xs text-purple-400 font-semibold">Ujala Maurya — Exact Uploaded Format</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md flex items-center gap-2 cursor-pointer transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={handleDownloadHtml}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-md flex items-center gap-2 cursor-pointer transition-all"
                title="Download HTML Document"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download HTML</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document View (Exact match to uploaded PDF) */}
          <div className="p-4 sm:p-10 overflow-y-auto bg-slate-900 flex justify-center print:p-0 print:bg-white">
            <div
              id="resume-print-area"
              ref={printableRef}
              className="w-full max-w-[800px] bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm font-serif text-sm leading-relaxed border border-slate-200 print:shadow-none print:border-none print:p-0"
            >
              {/* Name & Contact Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-serif mb-1">
                  Ujala Maurya
                </h1>
                <p className="text-xs sm:text-sm text-slate-800 space-x-1">
                  <span>8468018202</span>
                  <span>·</span>
                  <a href="mailto:ujalamaurya202@gmail.com" className="text-blue-700 hover:underline">
                    ujalamaurya202@gmail.com
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-slate-800 space-x-2 mt-1">
                  <a href="https://github.com/ujala54321" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                    github.com/ujala54321
                  </a>
                  <span>·</span>
                  <a href="https://linkedin.com/in/ujala-maurya-136b2532a/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                    linkedin.com/in/ujala-maurya-136b2532a/
                  </a>
                  <span>·</span>
                  <a href="https://leetcode.com/u/ujala_maurya02/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                    leetcode.com/u/ujala_maurya02/
                  </a>
                </p>
              </div>

              {/* PROFESSIONAL SUMMARY */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                  Results-oriented Software Engineer with a Master of Computer Application and hands-on experience developing robust web applications using the .NET ecosystem. Proficient in C#, ASP.NET Core, and modern web technologies, with a strong foundation in MVC architecture, database design, and object-oriented programming. Adept at building user-centric solutions from backend API development to frontend integration. Seeking to leverage technical expertise to deliver scalable and efficient software solutions.
                </p>
              </div>

              {/* SKILLS */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  SKILLS
                </h2>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1">
                  <li><span className="font-bold">Languages:</span> C#, Python, TypeScript, JavaScript, SQL</li>
                  <li><span className="font-bold">Technologies & Frameworks:</span> ASP.NET Core (.NET 8 / .NET 6), .NET Framework 4.5, Angular, Entity Framework Core, LINQ, REST APIs, MVC</li>
                  <li><span className="font-bold">Frontend:</span> HTML5, CSS3, Bootstrap, Responsive Design</li>
                  <li><span className="font-bold">Tools & DevOps:</span> Git, GitHub, Visual Studio, Postman, SQL Server, MySQL, Gen AI, Copilot</li>
                  <li><span className="font-bold">Core Competencies:</span> Object-Oriented Programming (OOP), Data Structures, Database Design, Debugging, Application Maintenance</li>
                  <li><span className="font-bold">Additional Skills:</span> Content Writing & Blogging</li>
                </ul>
              </div>

              {/* WORK EXPERIENCE */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  WORK EXPERIENCE
                </h2>
                <div>
                  <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-slate-950">
                    <span>Zebra TechnoSys</span>
                    <span className="italic font-normal">Lucknow, India</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs sm:text-sm text-slate-800 mb-1.5 italic">
                    <span>Software Engineer</span>
                    <span className="not-italic">Nov 2024 – Present</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1">
                    <li><span className="font-bold">Digital Awareness Web Application:</span> Engineered a comprehensive content management platform using C#, ASP.NET Core, and SQL Server, enabling administrators to efficiently distribute and manage digital awareness resources to a wide user base.</li>
                    <li><span className="font-bold">Chaudhary Finance Platform:</span> Developed frontend features for a financial services web application using JavaScript, HTML5, and CSS3, improving user engagement for mutual fund investments and insurance support services.</li>
                    <li><span className="font-bold">Application Maintenance & Enhancement:</span> Conducted regular code reviews, debugging, and system optimizations across multiple web applications, successfully reducing technical debt and improving overall application performance and stability.</li>
                    <li><span className="font-bold">Content Writing:</span> Wrote blogs and articles for Upgrate Infotech, an associated client project, contributing to their technical content and online presence alongside core development work.</li>
                  </ul>
                </div>
              </div>

              {/* PROJECT WORK */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  PROJECT WORK
                </h2>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-950">Book Shop E-commerce Application</div>
                  <div className="italic text-xs text-slate-700 mb-1.5">
                    Technologies: ASP.NET Core MVC, C# Web API, Entity Framework Core, SQL Server, HTML5, CSS3
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1">
                    <li>Architected and deployed a fully functional online bookstore utilizing ASP.NET Core MVC and SQL Server.</li>
                    <li>Implemented secure user authentication, shopping cart functionality, and a seamless checkout flow, ensuring a secure and user-friendly experience.</li>
                    <li>Developed a comprehensive administrative dashboard for efficient management of book inventory, product categories, and order processing.</li>
                    <li>Utilized the Repository pattern and LINQ queries for optimized data access, ensuring clean, maintainable, and scalable code architecture.</li>
                  </ul>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  EDUCATION
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-slate-950">
                      <span>Master of Computer Application (MCA)</span>
                      <span className="font-normal">Aug 2023 – Jun 2025</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 mb-1">
                      IISE, Lucknow — <span className="font-bold">CGPA: 7.8/10</span>
                    </div>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800">
                      <li><span className="font-bold">Relevant Coursework:</span> Object Oriented Programming, Databases, Discrete Maths, Data Structures and Algorithms, Operating Systems, Computer Networks, Machine Learning, Data Mining, Advance Data Structures and Algorithms, Cyber Security, IOT, TOC.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-slate-950">
                      <span>B.Sc. in Mathematics</span>
                      <span className="font-normal">Aug 2020 – Jun 2023</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800">
                      RHS Mahavidyalaya
                    </div>
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS & ACHIEVEMENTS */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  CERTIFICATIONS & ACHIEVEMENTS
                </h2>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1">
                  <li><span className="font-bold">micro1 AI Interview Certification</span> — Recognized for Outstanding Performance in a live AI-driven technical interview assessment (June 2026)</li>
                  <li><span class="font-bold">Microsoft Learn, C# Programming & .NET Fundamentals</span> — Completed certified modules covering C# classes and objects, .NET Class Library methods, decision logic, arrays, and clean code conventions (11 badges, 3 trophies earned, Level 5, 2026)</li>
                  <li><span className="font-bold">Microsoft Learn, Get Started with AI Agent Development on Azure</span> (2026)</li>
                </ul>
              </div>

              {/* AWARDS AND STRENGTHS */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-sans">
                  AWARDS AND STRENGTHS
                </h2>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1">
                  <li><span className="font-bold">Award:</span> Awarded a certificate for presenting research on "Data Cleaning and Pre-Processing."</li>
                  <li><span className="font-bold">Strengths:</span> Highly adaptable, eager to relocate globally, and an enthusiastic learner committed to assimilating new technologies to solve complex challenges.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Footer controls (Hidden on print) */}
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between no-print">
            <span className="text-xs text-slate-400">
              Verified Candidate: <strong className="text-purple-400">Ujala Maurya</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Save as PDF
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
