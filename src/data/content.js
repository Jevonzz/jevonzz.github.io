// All site copy lives here so it can be updated without touching components.

export const profile = {
  name: 'Jevon',
  role: 'Senior Frontend Developer',
  location: 'Malaysia',
  company: { name: 'Summit Trade & Resources' },
  github: 'https://github.com/Jevonzz',
  // Add your LinkedIn profile URL and CV path to show those buttons.
  linkedin: '',
  resume: '',
}

export const about = [
  "I'm a senior frontend developer at Summit Trade & Resources, building web and mobile products with React, TypeScript and React Native.",
  "Before that I spent a year and a half at SNSoft shipping features across web and mobile apps and building product analytics with PostHog. Earlier I optimised WordPress sites for SEO and built React and Tailwind apps with cross-functional teams. I care about interfaces that feel fast, look sharp and work for everyone.",
]

export const highlights = [
  { value: '2022', label: 'Shipping production code since' },
  { value: '5', label: 'Companies worked with' },
  { value: 'Web + Mobile', label: 'React and React Native' },
]

export const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Summit Trade & Resources',
    // Drop the company logo in public/logos/ and set its path here.
    logo: '',
    date: 'Aug 2026 – Present',
    points: [
      'Leading frontend development for web and mobile products with React, TypeScript and React Native.',
    ],
    tags: ['React', 'TypeScript', 'React Native'],
  },
  {
    title: 'Frontend Developer',
    company: 'SNSoft Sdn Bhd',
    logo: '/logos/snsoft.jpg',
    date: 'Jan 2025 – Aug 2026',
    points: [
      'Built and maintained frontend features in React, TypeScript and Flutter across web and mobile apps, including Baiki.',
      'Integrated PostHog to track click and page-view events across the product.',
      'Extended PostHog with XHR-based event tracking for more accurate, flexible analytics.',
      'Debugged and fixed issues across web and mobile to keep the experience smooth and fast.',
    ],
    tags: ['React', 'TypeScript', 'Flutter', 'PostHog'],
  },
  {
    title: 'Web Developer (SEO)',
    company: 'C&Y Information Technology',
    logo: '/logos/cy.png',
    date: 'Aug 2024 – Jan 2025',
    points: [
      'Built, customised and optimised WordPress sites for a seamless user experience.',
      'Ran keyword research in SEMrush to shape content and SEO strategy.',
      'Optimised on-page SEO with Yoast: meta tags, headings and content structure.',
      'Handled SSL, Google indexing and site security to improve visibility and trust.',
    ],
    tags: ['WordPress', 'SEO', 'SEMrush'],
  },
  {
    title: 'Software Engineer',
    company: 'Three Logic Concepts (3LC)',
    logo: '/logos/3lc.png',
    date: 'Nov 2023 – Aug 2024',
    points: [
      'Developed and maintained web applications with React and Tailwind CSS.',
      'Worked with designers, product managers and engineers to ship high-quality products.',
      'Implemented responsive layouts and cross-browser compatibility.',
      'Took part in code reviews and bug fixing alongside QA.',
    ],
    tags: ['React', 'Tailwind CSS'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Brunsfield Computer System',
    logo: '/logos/brunsfield.png',
    date: 'Oct 2022 – Jan 2023',
    points: [
      'Built five full-stack web applications from scratch.',
      'Used HTML, CSS, JavaScript, AJAX and MySQL, following the full development life cycle.',
    ],
    tags: ['JavaScript', 'MySQL'],
  },
]

export const featuredProjects = [
  {
    name: 'Car Service Maintenance',
    kind: 'Mobile app',
    description:
      'A full-stack mobile app with three roles. Car owners book services and manage their cars, crew manage appointments and bill customers, and admins manage stock, pricing and staff.',
    tags: ['React Native', 'Firebase'],
    link: 'https://github.com/Jevonzz/Car-Service-Maintenance',
    hue: 'from-sky-500/30 to-indigo-500/30',
  },
  {
    name: 'YOOM',
    kind: 'Video meetings',
    description:
      'A Zoom-style video meeting app, using Stream for real-time video and Clerk for authentication.',
    tags: ['Next.js', 'TypeScript', 'Stream', 'Clerk'],
    link: 'https://github.com/Jevonzz/meeting-web-app',
    hue: 'from-fuchsia-500/30 to-violet-500/30',
  },
  {
    name: 'e-Commerce Store',
    kind: 'Full-stack web',
    description:
      'An online store with a headless CMS, Stripe checkout and separate user and admin experiences.',
    tags: ['Payload CMS', 'TypeScript', 'Stripe', 'SCSS'],
    link: 'https://github.com/Jevonzz/e-commerce',
    hue: 'from-amber-500/30 to-rose-500/30',
  },
  {
    name: 'Apple iPhone Page',
    kind: '3D & motion',
    description:
      'A recreation of the iPhone product page with scroll-driven GSAP animation and an interactive three.js model.',
    tags: ['React', 'GSAP', 'three.js'],
    link: 'https://github.com/Jevonzz/apple-web',
    hue: 'from-emerald-500/30 to-cyan-500/30',
  },
]

export const learningProjects = [
  { name: 'Movie Web App', tags: ['React', 'REST API'], link: 'https://github.com/Jevonzz/Movie-Web-Application' },
  { name: 'HooBank', tags: ['React', 'Tailwind CSS'], link: 'https://github.com/Jevonzz/HooBank_Web_Application' },
  { name: 'Gericht Restaurant', tags: ['React', 'CSS'], link: 'https://github.com/Jevonzz/Gericht_Restaurant_Web_Application' },
  { name: 'GPT-3 Landing Page', tags: ['React', 'CSS'], link: 'https://github.com/Jevonzz/GPT3-ReactJS' },
]

export const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Next.js', icon: '/icons/nextjs.svg', invert: true },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
      { name: 'HTML', icon: '/icons/html.svg' },
      { name: 'CSS', icon: '/icons/css.svg' },
    ],
  },
  {
    title: 'Mobile',
    items: [
      { name: 'React Native', icon: '/icons/react.svg' },
      { name: 'Flutter', icon: '/icons/flutter.svg' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
      { name: 'MySQL', icon: '/icons/mysql.png' },
      { name: 'C#', icon: '/icons/csharp.png' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'PostHog', icon: '/icons/PostHog.png' },
    ],
  },
]

// EmailJS keys are public by design. Restrict allowed origins in the EmailJS dashboard.
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_i1m1auh',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_aakaa1e',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'hBR3WV0aDcPktDTk4',
}
