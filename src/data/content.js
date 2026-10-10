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
  "I'm a senior frontend developer at Summit Trade & Resources, building web products with Next.js, React and TypeScript. On the side I build Baiki, my own workshop management app for Malaysian car and motorcycle workshops.",
  "Before that I spent a year and a half at SNSoft building web and React Native mobile apps and setting up product analytics with PostHog. Earlier I optimised WordPress sites for SEO and built React and Tailwind apps with cross-functional teams. I care about interfaces that feel fast, look sharp and work for everyone.",
]

export const highlights = [
  { value: '2022', label: 'Shipping production code since' },
  { value: '5', label: 'Companies worked with' },
  { value: 'Web + Mobile', label: 'React and React Native' },
]

// Scrolling strip under the hero.
export const marquee = ['Next.js', 'React', 'TypeScript', 'React Native', 'Tailwind CSS', 'Supabase', 'Postgres', 'Node.js', 'three.js', 'PostHog', 'shadcn/ui', 'Vite']

export const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Summit Trade & Resources',
    logo: '/logos/summit.png',
    date: 'Aug 2026 – Present',
    points: [
      'Leading frontend development of web products with Next.js, React and TypeScript.',
    ],
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    title: 'Frontend Developer',
    company: 'SNSoft Sdn Bhd',
    logo: '/logos/snsoft.jpg',
    date: 'Jan 2025 – Aug 2026',
    points: [
      'Built and maintained web and mobile apps with React, TypeScript and React Native.',
      'Integrated PostHog to track click and page-view events across the product.',
      'Extended PostHog with XHR-based event tracking for more accurate, flexible analytics.',
      'Debugged and fixed issues across web and mobile to keep the experience smooth and fast.',
    ],
    tags: ['React', 'React Native', 'TypeScript', 'PostHog'],
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
    name: 'Baiki',
    kind: 'Own product · SaaS',
    description:
      'A mobile-first workshop management app for Malaysian car and motorcycle workshops. It covers customers, vehicles, service history, quotations and invoices with PDF export, parts stock, a job board for cars in the bay, and WhatsApp service reminders. It supports staff accounts on Lite, Pro and Max plans, in English, Bahasa Malaysia and Chinese.',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
    image: '/projects/baiki.png',
    links: [
      { label: 'Live app', url: 'https://baikiapp.vercel.app/' },
      { label: 'Landing page', url: 'https://baiki-landing.vercel.app/' },
    ],
  },
  {
    name: 'Landing Page Builder',
    kind: 'Own product · Web app',
    description:
      'A no-code builder for client landing pages. Pick a template, edit sections and theme, preview on desktop, tablet or mobile, then publish to its own link. Contact forms on live pages save each lead and open a WhatsApp chat with the business.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Postgres', 'Auth.js'],
    image: '/projects/landing-builder.png',
    links: [{ label: 'Live app', url: 'https://landing-page-builder-xi-weld.vercel.app/' }],
  },
  {
    name: 'Pocketbook',
    kind: 'Own product · PWA',
    description:
      'A personal money tracker you can install on your phone. It tracks income and expenses, shows a safe-to-spend amount with a 50/30/20 money plan, and charts spending by day and category. It works offline, with data kept on the device and CSV export and backup.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Dexie', 'Recharts'],
    image: '/projects/pocketbook.png',
    links: [],
  },
  {
    name: 'YOOM',
    kind: 'Video meetings',
    description:
      'A Zoom-style video meeting app, using Stream for real-time video and Clerk for authentication.',
    tags: ['Next.js', 'TypeScript', 'Stream', 'Clerk'],
    image: '',
    links: [{ label: 'GitHub', url: 'https://github.com/Jevonzz/meeting-web-app' }],
    hue: 'from-fuchsia-500/30 to-violet-500/30',
  },
]

export const learningProjects = [
  { name: 'e-Commerce Store', tags: ['Payload CMS', 'Stripe'], link: 'https://github.com/Jevonzz/e-commerce' },
  { name: 'Car Service Maintenance', tags: ['React Native', 'Firebase'], link: 'https://github.com/Jevonzz/Car-Service-Maintenance' },
  { name: 'Apple iPhone Page', tags: ['React', 'GSAP', 'three.js'], link: 'https://github.com/Jevonzz/apple-web' },
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
