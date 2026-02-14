const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Tool = require('../models/Tool');

// ✅ Load Env Variables using path.join to target 'Backend/.env' correctly
dotenv.config({ path: path.join(__dirname, '../.env') });

// --- 1. DEFINE CATEGORIES ---
const CATEGORIES = [
  "Digital Sales Rooms",
  "Email Finder",
  "CRM",
  "Note Taker",
  "Collaboration"
];

// --- 2. DEFINE DUMMY TOOLS ---
const TOOLS = [
  {
    "name": "Aligned",
    "slug": "aligned",
    "logo": "",
    "categories": [
      "Digital Sales Rooms"
    ],
    "isFeatured": false,
    "websiteLink": "https://www.aligned.u",
    "shortDescription": "Aligned is a collaborative customer workspace that eliminates communication chaos by centralizing deal information, resources, and mutual action plans in one shared link. It provides transparency between buyers and sellers, ensuring both parties stay synchronized throughout the sales and onboarding lifecycle. The platform utilizes advanced analytics to detect stakeholder engagement patterns, helping sales teams spot potential risks and improve overall deal velocity.",
    "fullDescription": "Aligned is a comprehensive collaborative customer workspace platform designed to eliminate the inherent \"email chaos\" that often plagues complex B2B sales cycles. By centralizing deal information, shared resources, and mutual action plans into a single, professional link, Aligned ensures that both buyers and sellers remain perfectly synchronized from the initial pitch through the final onboarding stages. The platform utilizes sophisticated AI-powered intelligence to reveal buyer behavior that traditional tracking tools often miss, such as identifying when a new stakeholder enters the deal room or which specific contract sections are being reviewed most frequently. This visibility eliminates the \"black box\" of the sales cycle, allowing account executives to spot potential deal risks early and address them proactively. With features like task tracking and shared timelines, Aligned fosters a sense of accountability and transparency that builds trust with prospects. For enterprise teams in 2026, Aligned is the essential bridge that standardizes the buying process and ensures a seamless experience for every stakeholder.",
    "idealCustomerProfile": "Aligned is recommended for B2B sales teams managing complex, multi-stakeholder deals who need a shared workspace to host mutual action plans and keep buyers accountable during the sales process. It is built for account executives who struggle with \"email chaos\" and want to centralize all deal-related content, videos, and tasks in one collaborative location. The tool is perfect for revenue teams that want to identify hidden stakeholders by tracking who else is being invited into the deal room.\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    "pricingModel": "STARTER",
    "plans": [
      {
        "planName": "STARTER",
        "price": "Free",
        "billing": "Per User, Per Month",
        "features": [
          "4 rooms per seat",
          "Room analytics",
          "Personal domain",
          "Secured room share",
          "Email & password protected",
          "Free forever"
        ]
      },
      {
        "planName": "BASIC",
        "price": "$29.00",
        "billing": "Per User, Per Month",
        "features": [
          "Includes Starter features",
          "Unlimited rooms & templates",
          "Task manager",
          "1 TB content storage",
          "Content management system",
          "Individuals & small teams"
        ]
      },
      {
        "planName": "PRO",
        "price": "$49.00",
        "billing": "Per User, Per Month",
        "features": [
          "Includes Basic features",
          "AI content generator",
          "Gong integration",
          "Section templates",
          "PandaDoc integration",
          "Secured tabs"
        ]
      },
      {
        "planName": "ENTERPRISE",
        "price": "Contact Sales",
        "billing": "",
        "features": [
          "Includes Pro features",
          "Bi-directional CRM integration",
          "AI client assist",
          "Internal comments",
          "Custom domain",
          "Dedicated customer success"
        ]
      }
    ],
    "organizationType": [
      "Startups",
      "SMBs",
      "Mid-market"
    ],
    "complexity": 30,
    "keyFeatures": [
      "Mutual action plans",
      "Deal alignment",
      "Stakeholder mapping",
      "Sales workflows",
      "Progress tracking",
      "Revenue visibility"
    ],
    "faqs": [
      {
        "question": "What is Aligned and what problem does it solve?",
        "answer": "Aligned is a buyer-seller collaboration platform for managing deals. It solves misalignment during complex sales cycles. Shared plans replace scattered communication. Buyers know exactly what’s next. Sellers stay organized. Deals progress with clarity and structure."
      },
      {
        "question": "How does Aligned help manage complex B2B deals?",
        "answer": "Aligned provides shared deal workspaces. Timelines, tasks, and documents stay centralized. Stakeholders remain aligned. Confusion is reduced. Accountability improves. Sales cycles become more predictable."
      },
      {
        "question": "Why do buyers like using Aligned?",
        "answer": "Buyers see clear steps and responsibilities. No guessing about next actions. Information is easy to access. Transparency builds confidence. Collaboration feels professional. Decision-making becomes easier."
      },
      {
        "question": "How does Aligned improve internal sales coordination?",
        "answer": "Sales reps follow a structured plan. Managers see deal status clearly. Enablement teams standardize processes. Communication improves across teams. Execution becomes more consistent. Fewer deals stall unexpectedly."
      },
      {
        "question": "Is Aligned suitable for enterprise sales teams?",
        "answer": "Yes, Aligned is well-suited for enterprise deals. It handles long sales cycles well. Multiple stakeholders collaborate easily. Complexity is managed effectively. Visibility improves decision control. Enterprise teams benefit strongly."
      },
      {
        "question": "Can Aligned reduce deal slippage?",
        "answer": "Aligned helps prevent stalled deals. Clear milestones keep momentum. Shared accountability drives progress. Buyers remain engaged. Sellers follow structured plans. Slippage decreases over time."
      },
      {
        "question": "How customizable are Aligned deal workspaces?",
        "answer": "Workspaces can be tailored per deal. Templates adapt to sales motions. Content changes by buyer needs. Flexibility is built in. Personalization improves relevance. Deals feel more tailored."
      },
      {
        "question": "Does Aligned integrate with CRM tools?",
        "answer": "Aligned integrates with CRM systems. Deal updates sync automatically. Data remains accurate. Reporting becomes easier. Sales teams avoid duplicate entry. Workflow efficiency improves."
      },
      {
        "question": "What makes Aligned different from sales enablement tools?",
        "answer": "Aligned focuses on deal execution, not just content. It connects strategy to action. Buyers actively participate. Collaboration drives progress. Execution is the main focus. This sets it apart."
      },
      {
        "question": "Why do teams adopt Aligned long term?",
        "answer": "Teams adopt Aligned for better deal control. Sales cycles improve consistently. Buyer trust increases. Processes become repeatable. Results become predictable. It becomes core to selling."
      }
    ],
    "linkedInLink": "https://www.linkedin.com/company/aligned-up/",
    "youTubeChannelLink": "https://www.youtube.com/@aligned_up",
    "ytVideoLink": "https://www.youtube.com/watch?v=8Vf0X_i4vA0",
    "founderLinkedinId": "https://www.linkedin.com/in/niklas-eldh/",
    "cta": [
      "Visit Aligned Website",
      "Subtext:",
      "Explore features, pricing, and integrations."
    ],
    "proTips": [
      "1. Use 'Mutual Action Plans' to align with buyers on every step of the evaluation process.",
      "2. Enable 'Buyer Notifications' to alert prospects when you complete a task in the portal.",
      "3. Use 'Collaborative Spaces' to store all meeting recordings, decks, and contracts in one place.",
      "4. Integrate with 'HubSpot/Salesforce' to keep your deal stages synced with portal activity.",
      "5. Use 'Stakeholder Mapping' to identify and engage every decision-maker in the deal.",
      "6. Leverage 'In-portal Chat' to answer buyer questions quickly and reduce email clutter.",
      "7. Monitor 'Deal Sentiment' based on how frequently and deeply buyers engage with your portal.",
      "8. Use 'Templates' to launch professional, standardized digital sales rooms for every lead."
    ],
    "learnMore": [
      {
        "heading": "What Is a Collaborative Customer Workspace & Why It Matters",
        "description": "Understand how Aligned replaces scattered email threads with a shared buyer–seller workspace that centralizes deal context, timelines, and accountability in one place.",
        "link": "https://www.aligned.u"
      },
      {
        "heading": "Mutual Action Plans for Deal Alignment",
        "description": "Learn how Aligned’s Mutual Action Plans help sellers and buyers stay aligned on responsibilities, milestones, and decision timelines—reducing deal slippage.",
        "link": "https://www.aligned.u/product"
      },
      {
        "heading": "Stakeholder Mapping & Hidden Buyer Signals",
        "description": "See how Aligned detects new stakeholders entering the deal, tracks engagement patterns, and highlights risk signals that traditional sales tools miss.",
        "link": "https://www.aligned.u/features"
      },
      {
        "heading": "Managing Complex, Multi-Stakeholder B2B Deals",
        "description": "Explore how enterprise and mid-market teams use Aligned to manage long sales cycles, onboarding workflows, and post-sale handoffs with full transparency.",
        "link": "https://www.aligned.u/customers"
      },
      {
        "heading": "Aligned Pricing, Integrations & Enterprise Capabilities",
        "description": "Review Aligned’s pricing plans, CRM integrations, security features, and enterprise options to see how it fits into modern revenue stacks.",
        "link": "https://www.aligned.u/pricing"
      }
    ]
  },
  {
    "name": "ContactOut",
    "slug": "contactout",
    "logo": "",
    "categories": [
      "Email Finder"
    ],
    "isFeatured": false,
    "websiteLink": "https://contactout.com",
    "shortDescription": "ContactOut is a high-accuracy lead intelligence platform providing verified personal and business contact details for over 300 million professionals. Its Chrome extension works with LinkedIn to uncover hidden email addresses and phone numbers instantly. The tool features a search portal for building high-volume prospect lists and an automated email engine to help sales teams initiate outreach and bypass traditional gatekeepers effectively.",
    "fullDescription": "ContactOut is a premier recruitment and sales intelligence platform that has established itself as the gold standard for finding verified personal contact information. By maintaining a massive database of over 300 million professional profiles, it provides users with accurate personal email addresses and direct phone numbers that are typically unavailable through standard corporate directories or LinkedIn alone. The platform is primarily utilized via a lightweight Chrome extension that overlays critical contact data directly onto professional social profiles, allowing for instant lead identification. Beyond simple data retrieval, ContactOut offers a robust Search Portal for building targeted lead lists at scale and an automated email campaign feature with AI-driven personalization to increase open rates. For high-performing sales teams and headhunters in 2026, the tool is an essential asset for bypassing traditional gatekeepers and reaching high-level decision-makers directly. Its reputation for high data accuracy and extensive coverage across Western markets makes it a critical foundation for any modern outbound prospecting strategy or executive search workflow.",
    "idealCustomerProfile": "ContactOut is recommended for corporate recruiters, headhunters, and executive search professionals who need a reliable way to find personal contact information and verified mobile numbers for high-level talent acquisition. It is built for teams that require a database covering 75% of Western professionals to reach candidates who are otherwise unreachable through standard LinkedIn channels. It is the premier choice for recruiting firms that prioritize speed and accuracy in candidate outreach.\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    "pricingModel": "FREE",
    "plans": [
      {
        "planName": "FREE",
        "price": "Free",
        "billing": "Per User, Per Month",
        "features": [
          "5 emails/day",
          "5 phones/day",
          "5 exports/day",
          "Browser extension",
          "Search portal",
          "Trial premium features"
        ]
      },
      {
        "planName": "EMAIL",
        "price": "$49.00",
        "billing": "Per User, Per Month",
        "features": [
          "Unlimited emails",
          "300 exports/month",
          "Email campaigns",
          "List builder",
          "Includes Free plan",
          "Single user limit"
        ]
      },
      {
        "planName": "EMAIL + PHONE",
        "price": "$99.00",
        "billing": "Per User, Per Month",
        "features": [
          "Unlimited emails",
          "Unlimited phones",
          "600 exports/month",
          "Data enrichment",
          "AI Email Writer",
          "Includes Email plan"
        ]
      },
      {
        "planName": "TEAM / API",
        "price": "Contact Us",
        "billing": "",
        "features": [
          "Team plan",
          "API access",
          "20% more data",
          "700M+ profiles",
          "Salesforce + ATS",
          "Dedicated manager"
        ]
      }
    ],
    "organizationType": [
      "Startups",
      "SMBs",
      "Mid-market"
    ],
    "complexity": 15,
    "keyFeatures": [
      "Email finder",
      "Phone lookup",
      "LinkedIn sourcing",
      "Contact enrichment",
      "CRM sync",
      "Bulk export"
    ],
    "faqs": [
      {
        "question": "What is ContactOut and why do sales and recruiting teams use it?",
        "answer": "ContactOut is a contact discovery platform used to find verified work emails and phone numbers. Sales teams use it to reach decision-makers faster. Recruiters rely on it to contact candidates directly. It reduces time spent on manual research. Outreach becomes more targeted and efficient. Teams see better response rates. It fits well into outbound and sourcing workflows."
      },
      {
        "question": "How does ContactOut find email addresses and phone numbers?",
        "answer": "ContactOut sources data from multiple public and proprietary databases. It verifies contact information before presenting it to users. This helps reduce bounce rates and failed calls. The platform focuses on accuracy over volume. Users can trust the data for outreach. Verification improves deliverability. This saves teams from wasting outreach efforts."
      },
      {
        "question": "Is ContactOut mainly for recruiters or sales professionals?",
        "answer": "ContactOut is used by both recruiters and sales teams. Recruiters use it to source and contact candidates directly. Sales professionals use it for prospecting and outbound outreach. The platform supports both use cases equally. Data coverage works across industries. It adapts well to hiring and revenue teams. This makes it versatile."
      },
      {
        "question": "How does ContactOut integrate into daily workflows?",
        "answer": "ContactOut is commonly used alongside LinkedIn and CRMs. Users search profiles and extract contact details quickly. Data can be added to outreach tools or CRM systems. This reduces context switching. Workflows become faster and cleaner. Teams spend more time selling or recruiting. Productivity increases naturally."
      },
      {
        "question": "How accurate is the data provided by ContactOut?",
        "answer": "ContactOut emphasizes verified and regularly updated data. Accuracy is prioritized to reduce bounce rates. Not every record is guaranteed, but reliability is high. Users report fewer invalid emails compared to generic databases. This protects sender reputation. Outreach results improve. Data quality is a key reason teams choose it."
      },
      {
        "question": "Can ContactOut be used for cold outreach campaigns?",
        "answer": "Yes, ContactOut is widely used for cold email and calling campaigns. Sales teams build prospect lists using verified data. Recruiters reach out to passive candidates. Better data improves reply and connect rates. Campaign performance becomes more predictable. It supports scalable outbound efforts. Teams rely on it for consistent results."
      },
      {
        "question": "How does ContactOut compare to traditional lead databases?",
        "answer": "Unlike static databases, ContactOut focuses on real-time discovery. Users search specific people rather than bulk lists only. This improves relevance. Data freshness is higher. Outreach feels more personalized. Teams avoid outdated contacts. It fits modern outbound strategies better."
      },
      {
        "question": "Is ContactOut suitable for small teams or enterprises?",
        "answer": "ContactOut works for both small teams and large organizations. Startups use it for early outbound and hiring. Enterprises use it at scale across teams. Usage can grow with team size. It fits different outbound volumes. Flexibility makes it widely adopted. Team needs are well supported."
      },
      {
        "question": "What industries benefit most from using ContactOut?",
        "answer": "ContactOut is popular in SaaS, tech, staffing, and consulting. Any industry relying on outbound communication benefits. Recruiters sourcing niche talent find it useful. Sales teams targeting B2B buyers rely on it. Industry coverage is broad. Use cases remain consistent. It supports many verticals."
      },
      {
        "question": "Why do teams continue using ContactOut long term?",
        "answer": "Teams continue using ContactOut because it saves time and improves outreach quality. Manual research is reduced significantly. Data reliability builds trust. Campaign results improve over time. Recruiters and sales reps become more efficient. It becomes part of daily workflows. Long-term value stays consistent."
      }
    ],
    "linkedInLink": "https://www.linkedin.com/company/contactout/",
    "youTubeChannelLink": "https://www.youtube.com/@contactout",
    "ytVideoLink": "https://www.youtube.com/watch?v=N6N2Q8yY4z8",
    "founderLinkedinId": "https://www.linkedin.com/in/manu-matta/",
    "cta": [
      "Visit ContactOut Website",
      "Subtext:",
      "Explore features, pricing, and integrations."
    ],
    "proTips": [
      "1. Use 'Search Filters' on the platform to find prospects based on job title, location, and industry.",
      "2. Enable the 'Chrome Extension' to reveal phone numbers and emails on LinkedIn and GitHub.",
      "3. Use 'Personal Email' discovery to reach candidates and prospects in their private inboxes.",
      "4. Leverage 'Company Intelligence' to see firmographic data and recent company news.",
      "5. Use 'Direct Dials' to increase your cold calling success by reaching mobile lines.",
      "6. Set up 'Folder Management' to organize your leads for different sales or hiring campaigns.",
      "7. Use 'Email Campaigns' within ContactOut to send automated outreach to your lists.",
      "8. Integrate with 'LinkedIn Sales Navigator' to enrich leads from your saved searches."
    ],
    "learnMore": [
      {
        "heading": "How ContactOut Finds Verified Emails & Phone Numbers",
        "description": "Learn how ContactOut uncovers verified personal and work emails along with direct phone numbers for professionals using its 300M+ profile database and real-time verification layers.",
        "link": "https://contactout.com/how-it-works"
      },
      {
        "heading": "Using ContactOut’s Chrome Extension with LinkedIn",
        "description": "See how recruiters and sales teams use the ContactOut Chrome extension to instantly reveal hidden contact details directly on LinkedIn, GitHub, and other professional profiles.",
        "link": "https://contactout.com/extension"
      },
      {
        "heading": "Building Lead Lists with ContactOut Search Portal",
        "description": "Explore how teams use ContactOut’s Search Portal to build high-volume, targeted prospect and candidate lists using filters like role, location, industry, and company size.",
        "link": "https://contactout.com/search"
      },
      {
        "heading": "ContactOut Email Campaigns & CRM Integrations",
        "description": "Understand how ContactOut supports outbound workflows with built-in email campaigns and seamless CRM/ATS integrations for sales and recruiting teams.",
        "link": "https://contactout.com/integrations"
      },
      {
        "heading": "ContactOut Pricing, Plans & API Access",
        "description": "Review ContactOut’s pricing tiers, export limits, and team/API options to choose the right plan for individual users, recruiters, or large outbound teams.",
        "link": "https://contactout.com/pricing"
      }
    ]
  },
  {
    "name": "Findymail",
    "slug": "findymail",
    "logo": "",
    "categories": [
      "Email Finder"
    ],
    "isFeatured": false,
    "websiteLink": "https://findymail.com",
    "shortDescription": "Findymail is a B2B email finder and verifier that helps salespeople build high-quality lead lists from LinkedIn and other platforms while prioritizing deliverability. It provides only valid B2B emails, effectively maintaining a guaranteed bounce rate of less than 5% to protect domain health. Users can export leads from Sales Navigator and Apollo directly into their CRM with one-click integrations, making it a favorite for agencies focusing on simple, reliable outreach.",
    "fullDescription": "Findymail is a high-performance email discovery and verification tool designed for sales hackers and outbound specialists who prioritize speed and deliverability. The platform focuses on providing a \"no-fluff\" experience, specializing in finding verified business email addresses from various sources, including LinkedIn, Twitter/X, and niche professional directories. Findymail is famous for its proprietary verification algorithm that cleans data in real-time, ensuring that every email exported is ready for a cold outreach campaign without further processing. In 2026, it is particularly popular for its deep integration with popular sales engagement platforms like Instantly and Lemlist, allowing for a seamless \"scrape-to-send\" workflow. The tool offers a Chrome extension for individual prospecting and a robust API for bulk operations. By removing the technical hurdles of email discovery and verification, Findymail allows sales teams to build massive, high-accuracy lead lists in a fraction of the time. It is a cost-effective and reliable solution for anyone looking to scale their outbound prospecting while maintaining a low bounce rate.",
    "idealCustomerProfile": "Findymail is recommended for sales professionals and outbound agencies who prioritize high deliverability and simplicity above all else. It is designed for those who need an AI-powered tool to find verified B2B emails with a guaranteed low bounce rate of less than 5%, ensuring domain health is never compromised. Findymail is the perfect match for users who want a streamlined Chrome extension and API that works across any website to pull verified data without the complexity of a massive CRM suite.\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    "pricingModel": "TRIAL",
    "plans": [
      {
        "planName": "TRIAL",
        "price": "Free",
        "billing": "Per User, Per Month",
        "features": [
          "10 finder credits",
          "10 email verifications",
          "10 emails or 1 phone",
          "1 email = 1 credit",
          "1 phone = 10 credits",
          "API access included"
        ]
      },
      {
        "planName": "BASIC",
        "price": "$49.00",
        "billing": "Per User, Per Month",
        "features": [
          "1,000 finder credits",
          "1,000 email verifications",
          "1,000 emails or 100 phones",
          "1 email = 1 credit",
          "1 phone = 10 credits",
          "API access included"
        ]
      },
      {
        "planName": "STARTER",
        "price": "$99.00",
        "billing": "Per User, Per Month",
        "features": [
          "5,000 finder credits",
          "5,000 email verifications",
          "5,000 emails or 500 phones",
          "1 email = 1 credit",
          "1 phone = 10 credits",
          "API access included"
        ]
      },
      {
        "planName": "BUSINESS",
        "price": "$249.00",
        "billing": "Per User, Per Month",
        "features": [
          "15,000 finder credits",
          "15,000 email verifications",
          "15,000 emails or 1,500 phones",
          "1 email = 1 credit",
          "1 phone = 10 credits",
          "API access included"
        ]
      },
      {
        "planName": "ENTERPRISE",
        "price": "Contact us",
        "billing": "",
        "features": [
          "Dedicated manager",
          "Automatic refill",
          "Scalable credits",
          "Custom pricing",
          "API access included",
          "Contact for details"
        ]
      }
    ],
    "organizationType": [
      "Startups",
      "SMBs",
      "Mid-market"
    ],
    "complexity": 30,
    "keyFeatures": [
      "Sales Nav scraping",
      "Email verification",
      "Bulk export"
    ],
    "faqs": [
      {
        "question": "What is Findymail and what is it primarily used for?",
        "answer": "Findymail is a B2B email finding and verification tool designed for sales teams. It helps users discover professional email addresses at scale. The platform focuses on high accuracy for cold outreach. Prospecting workflows become faster. Manual searching is reduced significantly. Lead lists become campaign-ready. Deliverability improves with verification. SDR productivity increases. Outreach scales efficiently."
      },
      {
        "question": "How does Findymail find and verify emails?",
        "answer": "Findymail analyzes company domains and employee data. Email patterns are intelligently tested. Verification checks filter out invalid addresses. Only deliverable emails are returned. Accuracy is prioritized. Results are delivered quickly. Bounce risk is reduced. Outreach confidence increases."
      },
      {
        "question": "How do sales teams use Findymail?",
        "answer": "Sales teams use Findymail to enrich lead lists with emails. Missing contact data is filled efficiently. Outreach setup time decreases. SDRs focus on messaging rather than research. Campaigns launch faster. Productivity increases. Pipelines grow more consistently. Efficiency improves across teams."
      },
      {
        "question": "Is Findymail suitable for cold email campaigns?",
        "answer": "Findymail is well suited for cold email outreach. Verified emails improve inbox placement. Spam risk is reduced. Campaign reliability increases. Best practices are supported. Cold outreach becomes more predictable. Risk is controlled. Deliverability improves over time."
      },
      {
        "question": "Does Findymail support bulk email discovery?",
        "answer": "Findymail supports bulk email discovery and enrichment. Users upload lists easily. Processing is fast and scalable. Results are downloadable instantly. Time savings are significant. Prospecting scales smoothly. Manual effort is eliminated. Workflow efficiency improves."
      },
      {
        "question": "How accurate is Findymail’s data?",
        "answer": "Findymail focuses heavily on accuracy and verification. Bounce rates are kept low."
      }
    ],
    "linkedInLink": "https://www.linkedin.com/company/findymail/",
    "youTubeChannelLink": "https://www.youtube.com/@Findymail",
    "ytVideoLink": "https://www.youtube.com/watch?v=sI91O792_yM",
    "founderLinkedinId": "https://www.linkedin.com/in/valentin-caen/",
    "cta": [
      "Visit Findymail Website",
      "Subtext:",
      "Explore features, pricing, and integrations."
    ],
    "proTips": [
      "1. Use 'Scrape Sales Navigator' to turn a search URL into a verified email list in minutes.",
      "2. Enable 'Email Verification' to clean existing lists and remove risky emails before sending.",
      "3. Use 'Apollo Export' to unlock contact data from Apollo without using Apollo credits.",
      "4. Leverage 'API Integration' to automate email finding directly inside your custom CRM or app.",
      "5. Use 'Chrome Extension' to find emails one-by-one while browsing LinkedIn profiles.",
      "6. Export to 'CSV/CRM' to sync verified leads instantly with your outreach tools.",
      "7. Use 'Domain Search' to find the best contact pattern for a specific company URL.",
      "8. Monitor 'Credit Usage' to optimize your plan and avoid running out during large scrapes."
    ],
    "learnMore": [
      {
        "heading": "How Findymail Finds Verified B2B Emails",
        "description": "Learn how Findymail automatically finds and verifies professional email addresses from LinkedIn and other sources, ensuring high deliverability for sales teams.",
        "link": "https://findymail.com"
      },
      {
        "heading": "Scraping Sales Navigator & Apollo with Findymail",
        "description": "Discover how to export thousands of leads from Sales Navigator and Apollo into a clean CSV file or CRM without manual data entry.",
        "link": "https://findymail.com/features"
      },
      {
        "heading": "Findymail API for Automated Email Discovery",
        "description": "Explore Findymail’s API documentation to see how developers and growth teams integrate email finding directly into their custom applications and workflows.",
        "link": "https://findymail.com/api"
      },
      {
        "heading": "Optimizing Deliverability for Cold Email Campaigns",
        "description": "Read best practices on how using verified emails from Findymail reduces bounce rates and protects your sender reputation during large outreach campaigns.",
        "link": "https://findymail.com/blog"
      },
      {
        "heading": "Findymail Pricing & Credit Plans",
        "description": "Review Findymail’s simple pricing structure, credit rollover policy, and enterprise options to choose the right plan for your prospecting needs.",
        "link": "https://findymail.com/pricing"
      }
    ]
  },
  {
    "name": "Folk",
    "slug": "folk",
    "logo": "",
    "categories": [
      "CRM"
    ],
    "isFeatured": false,
    "websiteLink": "https://www.folk.app",
    "shortDescription": "Folk is a next-generation CRM designed for modern teams who need a flexible, Notion-like interface to manage relationships. It allows users to centralize contacts from LinkedIn, Gmail, and other sources into a single, collaborative workspace. With features like AI-powered enrichment, bulk messaging, and custom pipelines, Folk transforms chaotic contact lists into actionable networks for sales, recruiting, and partnerships.",
    "fullDescription": "Folk is an innovative \"all-in-one\" CRM that reimagines relationship management by combining the flexibility of a spreadsheet with the power of a modern contact database. Often described as the \"Notion of CRMs,\" it allows users to build highly customizable workspaces for managing sales pipelines, recruiting pools, PR lists, and partnership networks. Folk excels at centralizing data, enabling users to import contacts seamlessly from Gmail, Google Calendar, and LinkedIn via a powerful Chrome extension. Once contacts are in the system, its proprietary \"Magic Field\" feature uses AI to automatically enrich profiles with missing details like job titles, emails, and social links. In 2026, Folk is widely adopted by startups and creators for its intuitive \"Mail Merge\" feature, which allows for personalized bulk emailing directly from the user's own domain. By stripping away the clunky complexity of legacy CRMs, Folk provides a lightweight, design-forward solution that adapts to the unique workflows of modern, relationship-driven businesses.",
    "idealCustomerProfile": "Folk is recommended for startups, agencies, and creators who need a flexible, lightweight CRM to manage diverse relationships beyond just sales. It is built for teams that find traditional CRMs like Salesforce too rigid and prefer a Notion-style interface for organizing contacts, investors, and talent. It is the ideal choice for users who want to centralize their network from LinkedIn and Gmail and send personalized bulk emails without complex setup.\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    "pricingModel": "STANDARD",
    "plans": [
      {
        "planName": "STANDARD",
        "price": "$20.00",
        "billing": "Per User, Per Month",
        "features": [
          "Unlimited contacts",
          "Unlimited messages",
          "100 enrichments/mo",
          "Chrome extension",
          "Magic fields",
          "Migration help"
        ]
      },
      {
        "planName": "PREMIUM",
        "price": "$40.00",
        "billing": "Per User, Per Month",
        "features": [
          "Unlimited contacts",
          "Unlimited messages",
          "500 enrichments/mo",
          "Priority support",
          "2,000 messages/mo",
          "Dedicate IP option"
        ]
      },
      {
        "planName": "CUSTOM",
        "price": "Contact Sales",
        "billing": "",
        "features": [
          "Unlimited everything",
          "Custom limits",
          "Dedicated success manager",
          "Custom onboarding",
          "SSO + Advanced security",
          "API access"
        ]
      }
    ],
    "organizationType": [
      "Startups",
      "SMBs",
      "Mid-market"
    ],
    "complexity": 25,
    "keyFeatures": [
      "Contact centralization",
      "Pipeline management",
      "AI enrichment",
      "Bulk email",
      "Chrome extension",
      "Collaborative workspace"
    ],
    "faqs": [
      {
        "question": "What is Folk and how does it differ from traditional CRMs?",
        "answer": "Folk is a modern, flexible CRM designed for managing relationships. It differs from traditional CRMs by offering a Notion-like, customizable interface. Users can manage sales, recruiting, and partnerships in one place. It feels like a spreadsheet but acts like a database. The learning curve is much flatter. It prioritizes design and usability. Teams find it more intuitive to use daily."
      },
      {
        "question": "How does Folk help centralize contact information?",
        "answer": "Folk imports contacts from Gmail, Calendar, and LinkedIn automatically. It merges duplicates and cleans up data. Users have a single source of truth for all relationships. Manual data entry is minimized. The database stays updated in real-time. Collaboration becomes easier. Teams stop losing track of important connections."
      },
      {
        "question": "Can I send bulk emails using Folk?",
        "answer": "Yes, Folk includes a powerful \"Mail Merge\" feature for bulk emailing. Users can send personalized messages to groups of contacts. Variables like name and company can be inserted automatically. Emails are sent from your own domain, not a generic server. Deliverability is higher. It replaces separate email marketing tools for many users."
      },
      {
        "question": "What is the \"Magic Field\" feature in Folk?",
        "answer": "Magic Field is Folk’s AI-powered enrichment tool. It automatically finds missing contact details like emails and job titles. Users can generate personalized icebreakers using AI. It saves time on manual research. Profiles become more complete instantly. Outreach becomes more effective. It adds intelligence to your contact list."
      },
      {
        "question": "Is Folk suitable for recruiting and fundraising?",
        "answer": "Folk is widely used for recruiting and fundraising. Users can create custom pipelines for candidates and investors. Notes and files can be attached to profiles. The flexible structure adapts to any workflow. It is not limited to sales processes. Founders and recruiters love its versatility. It manages any type of relationship."
      },
      {
        "question": "Does Folk integrate with other tools?",
        "answer": "Folk integrates with Zapier, allowing connections to thousands of apps. It syncs with Gmail and Outlook for email tracking. The Chrome extension connects LinkedIn to the CRM. Data flows smoothly between tools. Automation possibilities are vast. It fits well into modern tech stacks."
      },
      {
        "question": "How collaborative is Folk for teams?",
        "answer": "Folk is built for collaboration. Teams can share lists and pipelines easily. Comments and notes keep everyone aligned. Permissions can be managed for data security. It functions like a multiplayer workspace. Remote teams stay in sync. Relationship management becomes a team effort."
      },
      {
        "question": "Is Folk secure and GDPR compliant?",
        "answer": "Yes, Folk is GDPR compliant and prioritizes data security. Data is encrypted and stored securely. Users have control over their data privacy. It is trusted by European and global companies. Compliance features are built-in. Teams can use it with confidence. Security is a core focus."
      },
      {
        "question": "What industries use Folk the most?",
        "answer": "Folk is popular among startups, agencies, and venture capital firms. Creators and freelancers also use it for network management. Consulting firms use it for client relationships. Its flexibility appeals to many sectors. Any team managing diverse networks benefits. It is industry-agnostic by design."
      },
      {
        "question": "Why do users choose Folk over Salesforce or HubSpot?",
        "answer": "Users choose Folk for its simplicity and flexibility. It lacks the bloat and complexity of enterprise CRMs. Setup takes minutes, not months. The interface is enjoyable to use. It costs significantly less for small teams. It focuses on relationships, not just transactions. It feels more human-centric."
      }
    ],
    "linkedInLink": "https://www.linkedin.com/company/folk-app/",
    "youTubeChannelLink": "https://www.youtube.com/@folk-app",
    "ytVideoLink": "https://www.youtube.com/watch?v=Fj2FOnwbX24",
    "founderLinkedinId": "https://www.linkedin.com/in/simona-popovici/",
    "cta": [
      "Visit Folk Website",
      "Subtext:",
      "Explore features, pricing, and integrations."
    ],
    "proTips": [
      "1. Use 'Magic Fields' to automatically enrich contact lists with missing emails and job titles.",
      "2. Install the 'Chrome Extension' to add LinkedIn profiles to your CRM in one click.",
      "3. Use 'Mail Merge' to send personalized bulk emails directly from your own Gmail account.",
      "4. Create 'Smart Groups' to auto-categorize contacts based on tags, location, or industry.",
      "5. Use 'Pipeline View' to track deal stages, hiring candidates, or fundraising progress visually.",
      "6. Sync your 'Google Calendar' to see interaction history and upcoming meetings on contact profiles.",
      "7. Use 'Comments' to tag team members and collaborate on specific contacts or deals.",
      "8. Leverage 'Zapier Integration' to connect Folk with Typeform, Slack, or other tools."
    ],
    "learnMore": [
      {
        "heading": "Centralizing Contacts with Folk CRM",
        "description": "Learn how Folk consolidates contacts from LinkedIn, Gmail, and spreadsheets into one actionable workspace, removing duplicates and chaos.",
        "link": "https://www.folk.app/product"
      },
      {
        "heading": "Using Folk for Sales, Recruiting & Fundraising",
        "description": "See how startups and agencies customize Folk pipelines to manage deal flow, candidate tracking, and investor relationships in a single tool.",
        "link": "https://www.folk.app/solutions"
      },
      {
        "heading": "Folk’s AI Enrichment & Magic Fields",
        "description": "Discover how Folk’s “Magic Fields” automatically enrich contact profiles with emails, social links, and icebreakers using AI.",
        "link": "https://www.folk.app/features"
      },
      {
        "heading": "Sending Personalized Bulk Emails with Folk",
        "description": "Understand how to use Folk’s “Mail Merge” feature to send ultra-personalized email campaigns from your own domain to hundreds of contacts at once.",
        "link": "https://www.folk.app/mail-merge"
      },
      {
        "heading": "Folk Pricing & Team Plans",
        "description": "Review Folk’s pricing tiers, contact limits, and team collaboration features to find the best plan for your growing network.",
        "link": "https://www.folk.app/pricing"
      }
    ]
  },
  {
    "name": "Fathom",
    "slug": "fathom",
    "logo": "",
    "categories": [
      "Note Taker"
    ],
    "isFeatured": false,
    "websiteLink": "https://fathom.video",
    "shortDescription": "Fathom is a free AI meeting assistant that records, transcribes, and highlights key moments from your Zoom, Google Meet, and Microsoft Teams calls. It allows users to focus on the conversation rather than taking notes, automatically generating summaries and action items that can be synced to CRMs like HubSpot and Salesforce. Fathom is widely celebrated for its ease of use and completely free core functionality for individuals.",
    "fullDescription": "Fathom is a revolutionary AI meeting assistant that has transformed how professionals document and recall their virtual conversations. Designed to work seamlessly with Zoom, Google Meet, and Microsoft Teams, Fathom joins calls as a silent participant to record, transcribe, and summarize discussions in real-time. Its standout feature is the ability for users to click a button during a call to mark a \"highlight,\" which the AI then summarizes and timestamps for easy review later. This eliminates the distraction of manual note-taking, allowing users to remain fully present in the conversation. In 2026, Fathom remains a top choice for sales teams and customer success managers because of its robust integration capabilities; it can automatically push call summaries and action items directly into HubSpot, Salesforce, or Slack. Unlike many competitors, Fathom offers a generous free version that includes unlimited recording and transcription, making it accessible to freelancers and enterprise teams alike who want to streamline their post-meeting workflows.",
    "idealCustomerProfile": "Fathom is recommended for sales reps, customer success managers, and consultants who spend hours on calls and need accurate, automated notes without distraction. It is built for individuals and teams who want to sync meeting highlights and action items directly to CRMs like HubSpot and Salesforce. It is the best choice for users seeking a high-quality, free AI note-taker that supports Zoom, Google Meet, and Microsoft Teams seamlessly.\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    "pricingModel": "FREE",
    "plans": [
      {
        "planName": "FREE",
        "price": "Free",
        "billing": "Per User, Per Month",
        "features": [
          "Unlimited recording",
          "Unlimited transcription",
          "CRM sync (HubSpot/Salesforce)",
          "Zoom/Teams/Meet support",
          "Email summaries",
          "7-day storage"
        ]
      },
      {
        "planName": "STANDARD",
        "price": "$24.00",
        "billing": "Per User, Per Month",
        "features": [
          "Unlimited storage",
          "AI action items",
          "Search across meetings",
          "Zapier integration",
          "Advanced sharing controls",
          "Priority support"
        ]
      },
      {
        "planName": "PRO",
        "price": "$29.00",
        "billing": "Per User, Per Month",
        "features": [
          "Deal intelligence",
          "Team coaching insights",
          "Keyword alerts",
          "Custom vocabulary",
          "SSO / Admin controls",
          "Dedicated success manager"
        ]
      },
      {
        "planName": "TEAM",
        "price": "Contact Sales",
        "billing": "",
        "features": [
          "Volume discounts",
          "Enterprise security",
          "Custom onboarding",
          "API access",
          "Data retention policies",
          "Workspace analytics"
        ]
      }
    ],
    "organizationType": [
      "Startups",
      "SMBs",
      "Mid-market"
    ],
    "complexity": 20,
    "keyFeatures": [
      "AI transcription",
      "Meeting recording",
      "Automated summaries",
      "CRM sync",
      "Highlight clipping",
      "Multi-platform support"
    ],
    "faqs": [
      {
        "question": "What is Fathom and how does it help with meetings?",
        "answer": "Fathom is an AI meeting assistant that records and transcribes calls. It works with Zoom, Google Meet, and Microsoft Teams. It helps users focus on the conversation instead of taking notes. Summaries are generated automatically. Key moments are highlighted. It saves time on post-meeting work. Productivity improves instantly."
      },
      {
        "question": "Is Fathom really free to use?",
        "answer": "Yes, Fathom offers a powerful free version. Users get unlimited recording and transcription. There are no caps on call duration. Basic CRM sync is also included. This makes it unique in the market. Many individuals use it without ever paying. It is highly accessible."
      },
      {
        "question": "Which video conferencing platforms does Fathom support?",
        "answer": "Fathom supports Zoom, Google Meet, and Microsoft Teams. It integrates seamlessly into these platforms. No complex setup is required. It joins calls automatically or manually. Users can switch between platforms easily. It covers the vast majority of business calls."
      },
      {
        "question": "Can Fathom sync notes to my CRM?",
        "answer": "Yes, Fathom syncs notes to HubSpot, Salesforce, and Close. Summaries and highlights are pushed automatically. Data entry is eliminated. Sales teams keep records updated effortlessly. Managers have visibility into deal progress. The integration is reliable and fast."
      },
      {
        "question": "How does Fathom handle data privacy and security?",
        "answer": "Fathom prioritizes security and is SOC 2 Type II compliant. Recordings are private by default. Users control who sees the data. Access can be shared via secure links. Enterprise-grade encryption is used. Teams can trust it with sensitive discussions. Privacy is a core feature."
      },
      {
        "question": "What is the \"Highlight\" feature in Fathom?",
        "answer": "The Highlight feature allows users to mark key moments during a call. Clicking a button bookmarks that section. Fathom summarizes that specific part later. It makes reviewing long calls efficient. Users don’t have to re-watch the whole video. It saves hours of review time."
      },
      {
        "question": "Does Fathom generate action items automatically?",
        "answer": "Yes, Fathom’s AI detects and lists action items from the conversation. Tasks are clearly organized in the summary. Users can copy them to task managers. Follow-up becomes easier. Accountability improves. Nothing slips through the cracks."
      },
      {
        "question": "Can I share Fathom recordings with people who don't use it?",
        "answer": "Yes, recordings can be shared via a public link. Recipients do not need a Fathom account. They can view the video and transcript easily. Highlights are visible to them. Collaboration is seamless. It is great for sharing updates with clients."
      },
      {
        "question": "How does Fathom compare to Fireflies or Otter.ai?",
        "answer": "Fathom is often preferred for its generous free plan and ease of use. It focuses heavily on CRM integration for sales. The interface is cleaner for many users. Video playback is intuitive. It feels less like a tool and more like an assistant. User satisfaction is consistently high."
      },
      {
        "question": "Is Fathom suitable for non-sales teams?",
        "answer": "Yes, Fathom is great for product, engineering, and HR teams. Anyone who has meetings benefits. User research sessions are easily documented. Hiring interviews are recorded for review. Internal stand-ups are summarized. It is a universal productivity tool."
      }
    ],
    "linkedInLink": "https://www.linkedin.com/company/fathom-video/",
    "youTubeChannelLink": "https://www.youtube.com/@fathomvideo",
    "ytVideoLink": "https://www.youtube.com/watch?v=vxWwLfv-MZA",
    "founderLinkedinId": "https://www.linkedin.com/in/richardwwhite/",
    "cta": [
      "Visit Fathom Website",
      "Subtext:",
      "Explore features, pricing, and integrations."
    ],
    "proTips": [
      "1. Use 'Highlight Button' during calls to bookmark key moments for instant review later.",
      "2. Integrate with 'HubSpot/Salesforce' to auto-sync call summaries and tasks to deal records.",
      "3. Use 'Copy to Slack' to instantly share meeting summaries with your team after a call.",
      "4. Enable 'Auto-Record' so you never forget to capture an important client conversation.",
      "5. Use 'Search' to find specific keywords or topics mentioned across all your past meetings.",
      "6. Share 'Clips' of customer feedback directly with product teams instead of writing long notes.",
      "7. Use 'Action Items' to quickly generate a follow-up email based on the call's next steps.",
      "8. Review 'Talk Time' analytics to ensure you are listening more than speaking during sales calls."
    ],
    "learnMore": [
      {
        "heading": "Fathom AI Note Taker & Meeting Assistant",
        "description": "See how Fathom records, transcribes, and summarizes meetings for Zoom, Google Meet, and Teams, allowing you to focus on the conversation.",
        "link": "https://fathom.video"
      },
      {
        "heading": "Syncing Meeting Notes to HubSpot & Salesforce",
        "description": "Learn how to integrate Fathom with your CRM to automatically push call summaries, highlights, and action items into your deal records.",
        "link": "https://fathom.video/crm"
      },
      {
        "heading": "Fathom for Sales & Customer Success Teams",
        "description": "Discover why sales teams use Fathom to eliminate manual data entry, improve coaching, and share voice-of-customer insights instantly.",
        "link": "https://fathom.video/teams"
      },
      {
        "heading": "Fathom Security, Privacy & SOC 2 Compliance",
        "description": "Review Fathom’s enterprise-grade security protocols, including end-to-end encryption and SOC 2 Type II compliance, to ensure your meeting data is safe.",
        "link": "https://fathom.video/security"
      },
      {
        "heading": "Fathom Pricing & Free Plan Details",
        "description": "Check out Fathom’s generous free plan and premium team features to understand why it’s the top-rated AI meeting assistant on G2.",
        "link": "https://fathom.video/pricing"
      }
    ]
  },
  {
    "name": "Gamestorming",
    "slug": "gamestorming",
    "logo": "",
    "categories": [
      "Collaboration"
    ],
    "isFeatured": false,
    "websiteLink": "https://gamestorming.com",
    "shortDescription": "Gamestorming is a creative collaboration toolkit that provides facilitators and teams with visual game-based activities to solve problems and generate ideas. It offers a vast library of exercises designed to break down silos, encourage participation, and clarify complex strategies. The platform is a go-to resource for workshop leaders looking to foster innovation and alignment through structured play.",
    "fullDescription": "Gamestorming is a unique collaboration methodology and digital toolkit that helps teams solve complex problems through visual thinking and game-based activities. Born from the best-selling book by Dave Gray, the platform offers a comprehensive library of \"games\"—structured exercises designed to foster innovation, improve communication, and break down organizational silos. Unlike traditional brainstorming, Gamestorming provides clear rules and goals for every session, ensuring that meetings result in actionable outcomes rather than aimless discussion. The toolkit covers everything from strategic planning and product discovery to team building and conflict resolution. In 2026, Gamestorming is widely used by agile coaches, design thinkers, and product managers who need to facilitate high-energy, productive workshops. By turning abstract business challenges into tangible, visual games, it empowers teams to co-create solutions and align on a shared vision faster and more effectively.",
    "idealCustomerProfile": "Gamestorming is recommended for agile coaches, product managers, and workshop facilitators who need structured activities to drive team innovation and problem-solving. It is built for leaders who want to move beyond boring meetings and use visual games to clarify strategy and improve collaboration. It is the perfect resource for design thinking teams looking for proven exercises to brainstorm, prioritize, and align on complex projects.\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    "pricingModel": "FREE RESOURCES",
    "plans": [
      {
        "planName": "FREE RESOURCES",
        "price": "Free",
        "billing": "Online Access",
        "features": [
          "Access to game library",
          "Visual templates",
          "Facilitation guides",
          "Community examples",
          "Blog articles",
          "Newsletter tips"
        ]
      },
      {
        "planName": "BOOK / EBOOK",
        "price": "~$30.00",
        "billing": "One-time Purchase",
        "features": [
          "Full methodology",
          "80+ games detailed",
          "Case studies",
          "Facilitation tips",
          "Kindle / Paperback",
          "Lifetime reference"
        ]
      },
      {
        "planName": "TRAINING",
        "price": "Contact Us",
        "billing": "Per Workshop",
        "features": [
          "Live certification",
          "Custom workshops",
          "Team coaching",
          "Advanced techniques",
          "Expert facilitators",
          "Digital materials"
        ]
      },
      {
        "planName": "ENTERPRISE",
        "price": "Custom",
        "billing": "Consulting",
        "features": [
          "Organizational rollout",
          "Custom game design",
          "Executive alignment",
          "Scaled agile support",
          "Innovation labs",
          "Ongoing support"
        ]
      }
    ],
    "organizationType": [
      "Startups",
      "SMBs",
      "Mid-market"
    ],
    "complexity": 25,
    "keyFeatures": [
      "Visual templates",
      "Facilitation guides",
      "Innovation games",
      "Team alignment",
      "Problem-solving tools",
      "Workshop resources"
    ],
    "faqs": [
      {
        "question": "What is Gamestorming and who is it for?",
        "answer": "Gamestorming is a set of co-creation tools and games for business. It is for facilitators, managers, and teams who want to innovate. It helps solve problems through visual thinking. Meetings become more interactive and productive. It breaks down barriers to communication. Creativity is unlocked in structured ways."
      },
      {
        "question": "Is Gamestorming a software or a methodology?",
        "answer": "Gamestorming is primarily a methodology and a collection of exercises. It is not a SaaS tool, but a toolkit for facilitation. The resources are available online and in book form. Teams use whiteboards (physical or digital) to play. It adapts to any collaboration software like Miro. It is a framework for thinking."
      },
      {
        "question": "How do Gamestorming games help teams?",
        "answer": "Games provide structure to unstructured problems. They encourage equal participation from all members. Visualizing ideas makes them concrete. Conflict is resolved through play. Strategies become clearer. Teams align on goals faster. It turns work into a creative process."
      },
      {
        "question": "Can Gamestorming be used remotely?",
        "answer": "Yes, Gamestorming works perfectly for remote teams. Exercises can be run on digital whiteboards like Mural or Miro. The principles of engagement remain the same. Remote meetings become less draining. Visual collaboration keeps everyone focused. It bridges the gap of physical distance."
      },
      {
        "question": "Do I need to be an artist to use Gamestorming?",
        "answer": "No, you do not need drawing skills. Stick figures and simple shapes"
      }
    ],
    "linkedInLink": "",
    "youTubeChannelLink": "",
    "ytVideoLink": "",
    "founderLinkedinId": "",
    "cta": [],
    "proTips": [],
    "learnMore": []
  }
];

// --- 3. SEED FUNCTION ---
const seedTools = async () => {
  try {
    // 1. Connect
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 2. Clear Existing Tools (Optional - remove if you want to append)
    await Tool.deleteMany({});
    console.log('🗑️  Existing tools cleared.');

    // 3. Insert Tools
    // Note: We are using a loop to ensure 'categories' match the schema format
    const docs = await Tool.insertMany(TOOLS);

    console.log(`🚀 Successfully seeded ${docs.length} tools!`);
    console.log('✨ Categories used:', CATEGORIES.join(', '));

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding tools:', error);
    process.exit(1);
  }
};

// Run the seed
seedTools();