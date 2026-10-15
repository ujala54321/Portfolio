import {
  WorkExperience,
  SkillCategory,
  Project,
  Certificate,
  GalleryPhoto,
  BeyondCodingItem,
  EducationItem,
  CodeSnippet,
} from '../types';

export const PERSONAL_INFO = {
  name: 'Ujala Maurya',
  title: 'Software Engineer',
  subtitle: '.NET Full Stack Developer',
  company: 'Gyansify',
  email: 'shadesofujala@gmail.com',
  phone: '8468018202',
  location: 'Whitefield, Bengaluru, India',
  avatar: 'https://res.cloudinary.com/njy2bzyi/image/upload/f_auto,q_auto/IMG_3210',
  status: 'Software Engineer @ Gyansify',
  github: 'https://github.com/ujala54321',
  linkedin: 'https://linkedin.com/in/ujala-maurya-136b2532a/',
  leetcode: 'https://leetcode.com/u/ujala_maurya02/',
  summary: `Results-oriented Software Engineer with a Master of Computer Application, currently engineering scalable applications at Gyansify in Bengaluru. Hands-on experience developing robust web applications using the .NET ecosystem, C#, ASP.NET Core, and modern web frameworks with a track record of building production systems at Upgrate Infotech and Gyansify.`,
  typingRoles: [
    'Software Engineer',
    'ASP.NET Core Developer',
    'C# & .NET Developer',
    'Full Stack Web Developer',
    'REST API Specialist',
    'Problem Solver',
  ],
};

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'csharp-controller',
    filename: 'BookShopController.cs',
    language: 'csharp',
    badge: '.NET 8 / C# 12',
    description: 'REST API Controller built with ASP.NET Core 8 with Dependency Injection and EF Core async queries.',
    code: `namespace BookShop.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly ILogger<BooksController> _logger;

        public BooksController(IBookRepository bookRepo, ILogger<BooksController> logger)
        {
            _bookRepository = bookRepo;
            _logger = logger;
        }

        [HttpGet("featured")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetFeaturedBooks([FromQuery] int count = 10)
        {
            _logger.LogInformation("Fetching top {Count} featured books...", count);
            var books = await _bookRepository.GetFeaturedBooksAsync(count);
            return Ok(books);
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> ProcessCheckout([FromBody] OrderRequestDto request)
        {
            var result = await _bookRepository.ProcessOrderAsync(request);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessage);
        }
    }
}`,
  },
  {
    id: 'csharp-repository',
    filename: 'BookRepository.cs',
    language: 'csharp',
    badge: 'EF Core 8 / LINQ',
    description: 'Clean Architecture Repository implementation using Entity Framework Core and async LINQ queries.',
    code: `namespace BookShop.Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _db;

        public BookRepository(ApplicationDbContext db) => _db = db;

        public async Task<IEnumerable<BookDto>> GetFeaturedBooksAsync(int count)
        {
            return await _db.Books
                .AsNoTracking()
                .Include(b => b.Category)
                .Where(b => b.IsActive && b.StockQuantity > 0)
                .OrderByDescending(b => b.Rating)
                .Take(count)
                .Select(b => new BookDto(
                    b.Id, b.Title, b.Author, b.Price, b.Category.Name
                ))
                .ToListAsync();
        }
    }
}`,
  },
  {
    id: 'angular-component',
    filename: 'finance-dashboard.component.ts',
    language: 'typescript',
    badge: 'Angular 17 / Signals',
    description: 'Angular full-stack frontend module connecting to ASP.NET Core REST API backend.',
    code: `import { Component, inject, signal, OnInit } from '@angular/core';
import { FinanceService } from '../services/finance.service';
import { Transaction } from '../models/finance.model';

@Component({
  selector: 'app-finance-dashboard',
  standalone: true,
  templateUrl: './finance-dashboard.component.html'
})
export class FinanceDashboardComponent implements OnInit {
  private financeService = inject(FinanceService);
  
  transactions = signal<Transaction[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.financeService.getPlatformOverview().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.isLoading.set(false);
      },
      error: (err) => console.error('API Error:', err)
    });
  }
}`,
  },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'gyansify',
    role: 'Software Engineer',
    company: 'Gyansify',
    period: 'Aug 2026 – Present',
    location: 'Whitefield, Bengaluru, India',
    type: 'Full-time',
    summary: 'Architecting and developing full-stack .NET enterprise solutions, RESTful API services, and high-performance web applications at Gyansify.',
    highlights: [
      'Enterprise .NET Core & Cloud Engineering: Architecting scalable RESTful web APIs and enterprise backend services using C#, ASP.NET Core (.NET 8), and SQL Server.',
      'Full-Stack Feature Integration: Developing dynamic, responsive user interfaces integrated seamlessly with backend APIs, ensuring high performance and intuitive UX.',
      'Database Optimization & Clean Architecture: Implementing Entity Framework Core repositories, optimized LINQ queries, and structured design patterns to guarantee reliable data persistence and rapid response times.',
      'Agile Collaboration & Code Quality: Actively participating in sprint planning, automated testing, peer code reviews, and CI/CD deployment pipelines on Azure.'
    ],
    techStack: [
      'ASP.NET Core',
      'C#',
      '.NET 8',
      'Entity Framework Core',
      'SQL Server',
      'REST APIs',
      'Azure',
      'React.js',
      'TypeScript',
      'Git',
    ],
  },
  {
    id: 'upgrate-infotech',
    role: 'Software Engineer',
    company: 'Upgrate Infotech',
    period: 'May 2025 – Aug 2026',
    location: 'Lucknow, India',
    type: 'Full-time',
    summary: 'Developed robust web applications using C#, ASP.NET Core, SQL Server, and modern web technologies across digital awareness and financial platforms.',
    highlights: [
      'Digital Awareness Web Application: Engineered a comprehensive content management platform using C#, ASP.NET Core, and SQL Server, enabling administrators to efficiently distribute and manage digital awareness resources to a wide user base.',
      'Chaudhary Finance Platform: Developed frontend features for a financial services web application using JavaScript, HTML5, and CSS3, improving user engagement for mutual fund investments and insurance support services.',
      'Application Maintenance & Enhancement: Conducted regular code reviews, debugging, and system optimizations across multiple web applications, successfully reducing technical debt and improving overall application performance and stability.',
    ],
    techStack: [
      'ASP.NET Core',
      '.NET 8 / .NET 6',
      '.NET Framework 4.5',
      'C#',
      'React.js',
      'Angular',
      'Entity Framework Core',
      'SQL Server',
      'REST APIs',
      'MVC',
      'Azure',
      'Git',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'Server',
    skills: [
      { name: 'ASP.NET Core', level: 94, description: '.NET 8 / .NET 6 Web APIs & MVC' },
      { name: 'C#', level: 95, description: 'C# Object-Oriented Architecture' },
      { name: 'Entity Framework Core', level: 90, description: 'ORM, Migrations & Performance Tuning' },
      { name: 'REST APIs & LINQ', level: 94, description: 'API Design, Complex Data Querying' },
      { name: '.NET Framework 4.5 & MVC', level: 88, description: 'Model-View-Controller Enterprise Architecture' },
      { name: 'Python', level: 82, description: 'Scripting & Algorithmic Problem Solving' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 88, description: 'Modern React Components, Hooks & State' },
      { name: 'Angular', level: 86, description: 'Angular Components, RxJS & Services' },
      { name: 'TypeScript & JavaScript', level: 90, description: 'Typed Client Code, ES6+ Async/Await' },
      { name: 'HTML5 & CSS3', level: 94, description: 'Semantic Markup & Modern Styling' },
      { name: 'Bootstrap & Responsive Design', level: 92, description: 'Mobile-first Grid & Adaptive Layouts' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'Azure App Services', level: 88, description: 'Cloud Web Hosting & Serverless Deployment' },
      { name: 'Azure Resource Governance', level: 86, description: 'Resource Groups, Access Control & Policies' },
      { name: 'Azure DevOps & CI/CD', level: 88, description: 'Build & Release Deployment Pipelines' },
      { name: 'Git & GitHub', level: 92, description: 'Version Control, Branching & Pull Requests' },
    ],
  },
  {
    id: 'database',
    title: 'Database & Storage',
    icon: 'Database',
    skills: [
      { name: 'SQL Server', level: 92, description: 'Stored Procedures, Indexing & Views' },
      { name: 'MySQL', level: 85, description: 'Relational Database Design & Queries' },
      { name: 'Database Design', level: 88, description: 'Normalization, ER Modeling & Integrity' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & AI Copilots',
    icon: 'Wrench',
    skills: [
      { name: 'Visual Studio & VS Code', level: 95, description: 'Primary IDE, Debugging & Profiling' },
      { name: 'Postman', level: 92, description: 'REST API Testing, Mocking & Collections' },
      { name: 'Gen AI & Copilot', level: 90, description: 'AI-assisted Development & Prompt Engineering' },
      { name: 'Azure Cloud Platform', level: 88, description: 'Cloud Services & Deployment' },
    ],
  },
  {
    id: 'core',
    title: 'Core Competencies',
    icon: 'Cpu',
    skills: [
      { name: 'Object-Oriented Programming (OOP)', level: 96, description: 'Encapsulation, Inheritance, Polymorphism & SOLID' },
      { name: 'Data Structures & Algorithms', level: 88, description: 'Algorithmic Efficiency & Problem Solving' },
      { name: 'Debugging & Optimization', level: 92, description: 'Root-cause Analysis & System Performance' },
      { name: 'Application Maintenance', level: 90, description: 'Refactoring, Optimization & Technical Debt Reduction' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'book-shop-ecommerce',
    title: 'Book Shop E-Commerce Application',
    subtitle: 'Full Stack .NET 8 & Angular / MVC E-Commerce Platform',
    description: 'A comprehensive full-stack e-commerce solution featuring secure user authentication, interactive shopping cart, checkout workflow, admin management panel, and book catalog with EF Core repository pattern.',
    longDescription: 'Engineered a enterprise-grade e-commerce application for books. Built with ASP.NET Core (.NET 8), SQL Server, and Entity Framework Core utilizing the Repository Pattern and Dependency Injection. Features end-to-end user journeys including secure JWT/Cookie authentication, role-based access control (Admin/Customer), real-time inventory management, advanced book filtering with LINQ, checkout workflow, and responsive UI.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000',
    tags: ['ASP.NET Core .NET 8', 'C#', 'Entity Framework Core', 'SQL Server', 'LINQ', 'Repository Pattern', 'REST API', 'Angular/Bootstrap'],
    features: [
      'Role-based User Authentication & Registration (ASP.NET Core Identity)',
      'Dynamic Book Catalog with LINQ Search, Filter & Pagination',
      'Persistent Shopping Cart & Secure Checkout Flow',
      'Comprehensive Admin Panel for Book & Category Management (CRUD)',
      'Clean Architecture with Repository & Unit of Work Patterns',
      'SQL Server Stored Procedures & Indexing for high-speed queries',
      'Fully Responsive UI with glassmorphism design accents',
    ],
    architecture: [
      'Domain-Driven Architecture: API Layer, Business Logic Layer, Data Access Layer',
      'Repository Pattern isolating SQL queries and EF Core DbContext',
      'Swagger OpenAPI Documentation for client integration',
      'Automated Data Seeders for initial book catalog',
    ],
    liveDemoUrl: 'https://bookshop-demo.ujalamaurya.dev',
    githubUrl: 'https://github.com/ujalamaurya/BookShop-ECommerce-DotNet8',
    featured: true,
  },
  {
    id: 'digital-awareness-web-app',
    title: 'Digital Awareness Web Application',
    subtitle: 'ASP.NET Core & SQL Server Enterprise Awareness Platform',
    description: 'Developed during tenure at Upgrate Infotech. A security awareness and educational portal with interactive progress tracking, role-based modules, and audit analytics.',
    longDescription: 'Created a digital awareness application to educate users on cybersecurity best practices, workplace safety, and digital hygiene. Powered by ASP.NET Core and SQL Server, the app delivers customized learning modules, quiz assessments, and real-time tracking for managers.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'REST APIs', 'Security', 'Upgrate Infotech'],
    features: [
      'Interactive Learning Modules & Video Embeds',
      'Automated Quiz Engine & Certificate Generation',
      'SQL Server Database with Relational ER Diagrams',
      'Admin Monitoring Dashboard & Exportable Reports',
    ],
    architecture: [
      'ASP.NET Core Web API with JWT Token Validation',
      'SQL Server Database with Stored Procedures for performance',
    ],
    githubUrl: 'https://github.com/ujalamaurya/DigitalAwarenessPortal',
    featured: true,
  },
  {
    id: 'chaudhary-finance-platform',
    title: 'Chaudhary Finance Platform',
    subtitle: 'Angular & REST API Enterprise Financial Platform',
    description: 'Frontend and REST service integration for finance management, loan tracking, and account ledger management built at Upgrate Infotech.',
    longDescription: 'Engineered frontend modules for Chaudhary Finance Platform utilizing Angular, TypeScript, and Reactive Forms. Integrated with backend ASP.NET Core REST APIs to process loan applications, repayment schedules, and account statements.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000',
    tags: ['Angular', 'TypeScript', 'ASP.NET Core REST API', 'Bootstrap', 'Finance', 'Upgrate Infotech'],
    features: [
      'Interactive Loan Calculator & Amortization Charts',
      'Customer Ledger Management & PDF Export',
      'Reactive Form Validation with Instant Visual Feedback',
      'Real-time API Data Synchronization',
    ],
    architecture: [
      'Modular Angular Frontend with RxJS state management',
      'C# ASP.NET Core REST API integration',
    ],
    githubUrl: 'https://github.com/ujalamaurya/ChaudharyFinanceApp',
    featured: true,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'micro1-ai-interview',
    title: 'Outstanding Performance — micro1 AI Interview',
    issuer: 'micro1 AI Evaluation Platform',
    date: '2024',
    category: 'Achievement',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    description: 'Recognized for top percentile technical performance in C#, Data Structures, Systems Design, and Object-Oriented Software Engineering during micro1 AI rigorous technical evaluation.',
    skillsLearned: ['C# Mastery', 'Object-Oriented Design', 'Data Structures', 'Algorithmic Problem Solving', 'Clean Code'],
    credentialId: 'MICRO1-PERF-9921',
  },
  {
    id: 'ms-csharp-dotnet',
    title: 'Microsoft Learn — C# Programming & .NET Fundamentals',
    issuer: 'Microsoft',
    date: '2024',
    category: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    description: 'Official Microsoft certification validating core C# syntax, object-oriented concepts, LINQ, exception handling, and .NET runtime capabilities.',
    skillsLearned: ['C# 12', '.NET 8 Framework', 'LINQ Queries', 'Exception Handling', 'Object-Oriented Design'],
    credentialId: 'MSFT-CSHARP-88201',
  },
  {
    id: 'ms-azure-ai-agent',
    title: 'Microsoft Learn — Azure AI Agent Development',
    issuer: 'Microsoft',
    date: '2024',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    description: 'Mastered building intelligent AI agents, Semantic Kernel, Azure OpenAI Service, and AI-driven automation workflows.',
    skillsLearned: ['Azure OpenAI', 'Semantic Kernel', 'AI Agents', 'Function Calling', 'Prompt Engineering'],
    credentialId: 'MSFT-AZURE-AI-77402',
  },
  {
    id: 'college-chess-winner',
    title: 'College Chess Competition Winner Certificate',
    issuer: 'Inter-College Sports & Academics Board',
    date: '2023',
    category: 'Achievement',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800',
    description: 'Awarded First Place in the Annual College Chess Tournament. Strategic decision-making, pattern recognition, and calm execution under time pressure.',
    skillsLearned: ['Strategic Thinking', 'Tactical Analysis', 'Decision Making', 'Pressure Management'],
    credentialId: 'CHESS-CHAMP-2023',
  },
  {
    id: 'research-data-cleaning',
    title: 'Research Presentation Certificate — Data Cleaning & Pre-processing',
    issuer: 'Academic Research Symposium',
    date: '2023',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Presented research on data pre-processing algorithms, handling missing values, outlier detection, and data normalization techniques.',
    skillsLearned: ['Data Science', 'Data Normalization', 'Python/SQL Analytics', 'Research Presentation'],
    credentialId: 'RESEARCH-DATA-2023',
  },
  {
    id: 'mca-degree-certificate',
    title: 'Master of Computer Application (MCA) Degree Certificate',
    issuer: 'University Degree Board',
    date: '2024',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    description: 'Postgraduate degree in Computer Applications, specializing in Software Engineering, Advanced Database Systems, Web Technologies, and Data Structures.',
    skillsLearned: ['Software Engineering', 'Advanced SQL', 'Web Application Development', 'Computer Networks'],
    credentialId: 'MCA-DEGREE-2024-UM',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Software Engineer Workstation (Office Portrait)',
    category: 'Office',
    image: 'https://res.cloudinary.com/njy2bzyi/image/upload/f_auto,q_auto/IMG_3210',
    description: 'Ujala Maurya at Upgrate Infotech tech workstation, engineering ASP.NET Core APIs, C# services, and reviewing system architecture.',
    date: 'Office Workstation',
  },
  {
    id: 'photo-2',
    title: 'Campus of Advanced Studies — MCA Formal Attire',
    category: 'Campus',
    image: 'https://res.cloudinary.com/njy2bzyi/image/upload/f_auto,q_auto/IMG_3208',
    description: 'Ujala Maurya in formal blue shirt and black blazer at Campus of Advanced Studies / Professional Studies Complex during her MCA program.',
    date: 'Academic Campus',
  },
  {
    id: 'photo-3',
    title: 'University Lawn Walk — MBA & MCA Department',
    category: 'Campus',
    image: 'https://res.cloudinary.com/njy2bzyi/image/upload/f_auto,q_auto/IMG_3211',
    description: 'Ujala Maurya in black top and blue jeans walking casually across the green university campus lawn in front of the MBA | MCA department building.',
    date: 'University Grounds',
  },
  {
    id: 'photo-4',
    title: 'Modern Campus Architecture & Academic Life',
    category: 'Campus',
    image: 'https://res.cloudinary.com/njy2bzyi/image/upload/f_auto,q_auto/IMG_3209',
    description: 'Ujala Maurya in white patterned top and denim jeans outdoors by modern campus brick architecture buildings.',
    date: 'Campus Life',
  },
  {
    id: 'photo-5',
    title: 'Professional Journey & Milestones',
    category: 'Corporate',
    image: 'https://res.cloudinary.com/njy2bzyi/image/upload/f_auto,q_auto/WhatsApp_Image_2024-02-08_at_11.50.55_0b41b886',
    description: 'Capturing milestones and special memories throughout university education and software engineering career.',
    date: 'Career Journey',
  },
];

export const BEYOND_CODING: BeyondCodingItem[] = [
  {
    id: 'chess',
    title: 'Chess Mastery',
    icon: 'Crown',
    badge: '🏆 Winner of College Chess Competition',
    description: 'Chess has been instrumental in honing my strategic thinking, patience, analytical reasoning, and decision-making skills. Navigating complex tactical positions on the chessboard translates directly to architecting clean software systems and evaluating trade-offs in backend code.',
    keyTakeaways: [
      'Strategic & Forward Thinking',
      'Pattern Recognition in Complex Systems',
      'Composure & Tactical Execution Under Pressure',
    ],
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/5',
  },
  {
    id: 'badminton',
    title: 'Badminton & Agility',
    icon: 'Activity',
    badge: '🏸 Active Lifestyle',
    description: 'I love playing badminton regularly to stay physically active, sharpen reflexes, and maintain high energy levels. Fast-paced rallies demand quick reactions and intense focus, keeping both mind and body agile.',
    keyTakeaways: [
      'Quick Reflexes & High Focus',
      'Stress Relief & Stamina',
      'Teamwork & Sportsmanship',
    ],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/5',
  },
  {
    id: 'fitness',
    title: 'Health & Physical Fitness',
    icon: 'HeartPulse',
    badge: '💪 Fitness Enthusiast',
    description: 'I am deeply health conscious and believe that maintaining physical fitness directly improves engineering productivity, mental clarity, and discipline. Regular workouts build resilience that transfers to solving complex code problems.',
    keyTakeaways: [
      'Enhanced Mental Clarity & Focus',
      'Disciplined Daily Workouts',
      'Sustained High Energy Levels',
    ],
    gradient: 'from-purple-500/20 via-pink-500/10 to-rose-500/5',
  },
  {
    id: 'lifestyle',
    title: 'Healthy Lifestyle & Routine',
    icon: 'Sparkles',
    badge: '🌿 Balanced Discipline',
    description: 'Maintaining a balanced daily routine with nutritious habits, adequate rest, mindfulness, and continuous self-improvement creates the foundation for long-term career growth and happiness.',
    keyTakeaways: [
      'Structured Daily Routine',
      'Mindfulness & High Discipline',
      'Continuous Personal Development',
    ],
    gradient: 'from-blue-500/20 via-indigo-500/10 to-violet-500/5',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Tech Learning',
    icon: 'BookOpen',
    badge: '💻 Tech & AI Explorer',
    description: 'Software development evolves rapidly. I spend dedicated personal time exploring the latest .NET updates, AI agents, cloud architectures, and modern software engineering best practices.',
    keyTakeaways: [
      'Exploring .NET 8 / .NET 9 Features',
      'AI Agent Development & LLM Integration',
      'Cloud Architecture & Clean Code Principles',
    ],
    gradient: 'from-sky-500/20 via-cyan-500/10 to-blue-500/5',
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Application (MCA)',
    institution: 'IISE, Lucknow',
    period: 'Jun 2023 – May 2025',
    fieldOfStudy: 'Computer Applications & Software Engineering',
    grade: 'CGPA: 7.8 / 10',
    highlights: [
      'Relevant Coursework: Object Oriented Programming, Databases, Discrete Maths, Data Structures and Algorithms, Operating Systems, Computer Networks, Machine Learning, Data Mining, Advance DSA, Cyber Security, IOT, TOC.',
      'Specialized in C#, ASP.NET Core MVC, Entity Framework Core, and SQL Server backend architectures.',
    ],
  },
  {
    id: 'bsc-math',
    degree: 'B.Sc. in Mathematics',
    institution: 'RHS Mahavidyalaya',
    period: 'Aug 2020 – Jun 2023',
    fieldOfStudy: 'Mathematics, Analytical Problem Solving & Logic',
    grade: 'Graduated',
    highlights: [
      'Strong mathematical foundation in Calculus, Linear Algebra, Statistics, and Abstract Logic.',
      'Developed analytical proofs and mathematical problem-solving mindsets applicable to algorithmic programming.',
    ],
  },
];
