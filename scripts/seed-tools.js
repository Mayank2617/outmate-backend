const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Import 'path' module
const Tool = require('../models/Tool'); 

// ✅ Load Env Variables using path.join to target 'Backend/.env' correctly
dotenv.config({ path: path.join(__dirname, '../.env') });

// --- 1. DEFINE CATEGORIES ---
const CATEGORIES = [
  "CRM", 
  "Sales Intelligence", 
  "Cold Email", 
  "AI Sales Agents", 
  "Intent Data", 
  "LinkedIn Automation", 
  "Video Prospecting", 
  "Meeting Scheduler", 
  "Revenue Operations", 
  "PLG Tools",
  "Email Verification",
  "Dialers"
];

// --- 2. DEFINE DUMMY TOOLS ---
const TOOLS = [
  // === CRM ===
  {
    name: "Salesforce Sales Cloud",
    slug: "salesforce-sales-cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    categories: ["CRM", "Revenue Operations"],
    isFeatured: true,
    websiteLink: "https://www.salesforce.com",
    linkedinLink: "https://www.linkedin.com/company/salesforce",
    shortDescription: "The world's #1 CRM. Manage leads, close deals, and automate processes with the most robust ecosystem in the market.",
    fullDescription: "Salesforce Sales Cloud is a fully customizable CRM that grows with your business. It offers advanced pipeline management, AI-driven insights (Einstein), and thousands of integrations.",
    idealCustomerProfile: "Enterprise and Mid-Market companies needing deep customization.",
    pricingModel: "Per User / Month",
    organizationType: "Mid-Market, Enterprise",
    complexity: 85,
    keyFeatures: ["Pipeline Management", "Einstein AI", "AppExchange Ecosystem", "Workflow Automation"],
    faqs: [
      { question: "Is Salesforce suitable for startups?", answer: "It can be, but it often requires a dedicated admin to manage effectively." }
    ]
  },
  {
    name: "HubSpot Sales Hub",
    slug: "hubspot-sales-hub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/HubSpot_Logo.png",
    categories: ["CRM", "Meeting Scheduler", "Email Verification"],
    isFeatured: true,
    websiteLink: "https://www.hubspot.com",
    shortDescription: "A powerful, easy-to-use CRM that connects sales, marketing, and service teams in one platform.",
    fullDescription: "HubSpot is known for its user-friendly interface and 'freemium' model. It scales from a simple contact database to a complex enterprise solution without the steep learning curve of Salesforce.",
    idealCustomerProfile: "Startups to Mid-Market, PLG companies.",
    pricingModel: "Freemium / Tiered",
    organizationType: "Startup, SMBs, Mid-Market",
    complexity: 40,
    keyFeatures: ["Free CRM", "Email Tracking", "Meeting Scheduling", "Deal Pipelines"],
    faqs: [
      { question: "Is the free version enough?", answer: "For very small teams, yes. But automation features require paid plans." }
    ]
  },
  {
    name: "Pipedrive",
    slug: "pipedrive",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pipedrive_Logo.svg",
    categories: ["CRM"],
    isFeatured: false,
    websiteLink: "https://www.pipedrive.com",
    shortDescription: "A sales-focused CRM designed by salespeople, for salespeople. Focuses heavily on visual pipeline management.",
    fullDescription: "Pipedrive forces you to focus on actions that close deals. It's less about data entry and more about moving deals from stage to stage.",
    idealCustomerProfile: "Small sales teams focused on outbound/direct sales.",
    pricingModel: "Per User / Month",
    organizationType: "SMBs",
    complexity: 30,
    keyFeatures: ["Visual Pipeline", "Activity Reminders", "Email Integration"],
    faqs: []
  },

  // === SALES INTELLIGENCE ===
  {
    name: "Apollo.io",
    slug: "apollo-io",
    logo: "https://mma.prnewswire.com/media/1760395/Apollo_io_Logo.jpg", // Placeholder link
    categories: ["Sales Intelligence", "Cold Email", "Intent Data"],
    isFeatured: true,
    websiteLink: "https://www.apollo.io",
    shortDescription: "The all-in-one go-to-market platform. Find verified emails, call numbers, and automate sequences.",
    fullDescription: "Apollo has disrupted the market by offering a massive B2B database combined with engagement tools (email sequences) at a fraction of the cost of legacy competitors.",
    idealCustomerProfile: "Founders, SDRs, and Growth Teams.",
    pricingModel: "Freemium",
    organizationType: "Startup, SMBs, Mid-Market",
    complexity: 50,
    keyFeatures: ["250M+ Contacts", "Email Sequencing", "Chrome Extension", "Intent Data"],
    faqs: [
      { question: "How accurate is the data?", answer: "Apollo claims high accuracy, but like all databases, it varies by industry." }
    ]
  },
  {
    name: "ZoomInfo",
    slug: "zoominfo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/ZoomInfo_Logo.png",
    categories: ["Sales Intelligence", "Intent Data"],
    isFeatured: true,
    websiteLink: "https://www.zoominfo.com",
    shortDescription: "The gold standard for B2B contact data and organizational charts.",
    fullDescription: "ZoomInfo provides the most accurate mobile numbers and direct dials in the industry. It is the go-to choice for enterprise sales teams.",
    idealCustomerProfile: "Enterprise Sales Teams.",
    pricingModel: "Contract (Annual)",
    organizationType: "Mid-Market, Enterprise",
    complexity: 70,
    keyFeatures: ["Direct Dials", "Org Charts", "Intent Signals", "WebSights"],
    faqs: []
  },
  {
    name: "Lusha",
    slug: "lusha",
    logo: "https://assets-global.website-files.com/6218de96317b08497e411136/6225e36f1e8c9567952309e3_Lusha_Logo.svg",
    categories: ["Sales Intelligence"],
    isFeatured: false,
    websiteLink: "https://www.lusha.com",
    shortDescription: "The easiest way to find B2B contact information with a simple Chrome extension.",
    fullDescription: "Lusha focuses on ease of use and privacy compliance (GDPR). It is a favorite among recruiters and individual sales reps.",
    idealCustomerProfile: "Recruiters and Individual Contributors.",
    pricingModel: "Freemium",
    organizationType: "SMBs",
    complexity: 20,
    keyFeatures: ["Browser Extension", "Phone Numbers", "Email Finder"],
    faqs: []
  },

  // === COLD EMAIL ===
  {
    name: "SmartLead",
    slug: "smartlead",
    logo: "https://framerusercontent.com/images/15L2wX9tX9X5r5l5X.png", // Use a generic or hosted image
    categories: ["Cold Email", "AI Sales Agents"],
    isFeatured: true,
    websiteLink: "https://www.smartlead.ai",
    shortDescription: "Scale your cold email outreach with unlimited mailboxes and AI warmups.",
    fullDescription: "SmartLead allows you to connect unlimited email accounts to rotate senders, ensuring high deliverability. It's the engine behind many modern lead gen agencies.",
    idealCustomerProfile: "Lead Gen Agencies, High-Volume Outbound Teams.",
    pricingModel: "Monthly Subscription",
    organizationType: "Startup, Agency",
    complexity: 60,
    keyFeatures: ["Unlimited Mailboxes", "AI Warmup", "Master Inbox", "API Access"],
    faqs: []
  },
  {
    name: "Instantly.ai",
    slug: "instantly-ai",
    logo: "https://instantly.ai/favicon.ico", 
    categories: ["Cold Email", "Email Verification"],
    isFeatured: false,
    websiteLink: "https://www.instantly.ai",
    shortDescription: "Automate your cold outreach and improve deliverability with AI.",
    fullDescription: "Instantly provides a massive warmup pool to keep your emails out of spam. It's a direct competitor to SmartLead with a focus on ease of use.",
    idealCustomerProfile: "Founders and Growth Hackers.",
    pricingModel: "Monthly Subscription",
    organizationType: "Startup, SMBs",
    complexity: 50,
    keyFeatures: ["Warmup Pool", "Campaign Analytics", "Lead Database"],
    faqs: []
  },
  {
    name: "Lemlist",
    slug: "lemlist",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Lemlist_logo.svg/2560px-Lemlist_logo.svg.png",
    categories: ["Cold Email"],
    isFeatured: false,
    websiteLink: "https://www.lemlist.com",
    shortDescription: "Personalize cold emails with dynamic images and videos.",
    fullDescription: "Lemlist stands out by allowing you to embed personalized images (like a whiteboard with the prospect's name) directly into emails.",
    idealCustomerProfile: "Creative Sales Teams.",
    pricingModel: "Per User / Month",
    organizationType: "SMBs",
    complexity: 40,
    keyFeatures: ["Image Personalization", "LinkedIn Steps", "Lemwarm"],
    faqs: []
  },

  // === AI SALES AGENTS & AUTOMATION ===
  {
    name: "Clay",
    slug: "clay",
    logo: "https://mma.prnewswire.com/media/2388656/Clay_Logo.jpg",
    categories: ["AI Sales Agents", "Sales Intelligence"],
    isFeatured: true,
    websiteLink: "https://www.clay.com",
    shortDescription: "The spreadsheet that fills itself. Automate manual research with 50+ data providers.",
    fullDescription: "Clay is a revolutionary tool that combines the interface of a spreadsheet with the power of AI. You can scrape websites, find emails, and write personalized AI lines in bulk.",
    idealCustomerProfile: "Growth Engineers, RevOps.",
    pricingModel: "Usage Based",
    organizationType: "Startup, Scaleup",
    complexity: 90,
    keyFeatures: ["Waterfall Enrichment", "GPT-4 Integration", "Web Scraping"],
    faqs: []
  },
  {
    name: "Regie.ai",
    slug: "regie-ai",
    logo: "https://assets-global.website-files.com/62266850d540050893a05959/6226687f8f90642353163353_regie-ai-logo.svg",
    categories: ["AI Sales Agents", "Cold Email"],
    isFeatured: false,
    websiteLink: "https://www.regie.ai",
    shortDescription: "Generative AI for sales teams. Auto-write sequences and personalize emails.",
    fullDescription: "Regie uses LLMs to instantly generate cold email copy based on best practices and persona data.",
    idealCustomerProfile: "SDR Teams.",
    pricingModel: "Per User",
    organizationType: "Mid-Market",
    complexity: 40,
    keyFeatures: ["AI Copywriting", "CMS Integration", "Chrome Extension"],
    faqs: []
  },

  // === LINKEDIN AUTOMATION ===
  {
    name: "Taplio",
    slug: "taplio",
    logo: "https://taplio.com/images/logo.png",
    categories: ["LinkedIn Automation"],
    isFeatured: false,
    websiteLink: "https://www.taplio.com",
    shortDescription: "The all-in-one tool for building a personal brand on LinkedIn.",
    fullDescription: "Taplio helps you create content with AI, schedule posts, and engage with specific lead lists automatically.",
    idealCustomerProfile: "Founders, Consultants.",
    pricingModel: "Monthly",
    organizationType: "Individual, SMBs",
    complexity: 20,
    keyFeatures: ["Content Generation", "Post Scheduling", "Lead Database"],
    faqs: []
  },
  {
    name: "Dripify",
    slug: "dripify",
    logo: "https://dripify.io/wp-content/uploads/2021/05/dripify-logo.svg",
    categories: ["LinkedIn Automation"],
    isFeatured: false,
    websiteLink: "https://dripify.io",
    shortDescription: "Advanced LinkedIn automation software for closing deals.",
    fullDescription: "Dripify allows you to create complex 'if/then' scenarios for LinkedIn outreach. E.g., 'If they accept request, wait 2 days, then send message'.",
    idealCustomerProfile: "Growth Marketers.",
    pricingModel: "Monthly",
    organizationType: "SMBs",
    complexity: 60,
    keyFeatures: ["Drip Campaigns", "Safety Limits", "Team Management"],
    faqs: []
  },

  // === INTENT DATA ===
  {
    name: "6sense",
    slug: "6sense",
    logo: "https://6sense.com/wp-content/uploads/2022/05/6sense-logo.svg",
    categories: ["Intent Data", "Revenue Operations"],
    isFeatured: true,
    websiteLink: "https://www.6sense.com",
    shortDescription: "Uncover hidden demand. Know who is in-market before they even contact you.",
    fullDescription: "6sense uses 'Dark Funnel' data to identify accounts that are researching your solution anonymously.",
    idealCustomerProfile: "Enterprise ABM Teams.",
    pricingModel: "Contract",
    organizationType: "Enterprise",
    complexity: 90,
    keyFeatures: ["Dark Funnel Tracking", "ABM Orchestration", "Predictive Analytics"],
    faqs: []
  },
  {
    name: "Demandbase",
    slug: "demandbase",
    logo: "https://www.demandbase.com/wp-content/uploads/2020/06/Demandbase-Logo-No-Tagline.svg",
    categories: ["Intent Data"],
    isFeatured: false,
    websiteLink: "https://www.demandbase.com",
    shortDescription: "Go-to-market smarter with Account-Based Marketing software.",
    fullDescription: "Demandbase is a pioneer in ABM, allowing you to personalize ads and website experiences for target accounts.",
    idealCustomerProfile: "B2B Marketing Teams.",
    pricingModel: "Contract",
    organizationType: "Mid-Market, Enterprise",
    complexity: 80,
    keyFeatures: ["Account Identification", "B2B Advertising", "Sales Insights"],
    faqs: []
  },

  // === DIALERS & VIDEO ===
  {
    name: "Orum",
    slug: "orum",
    logo: "https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/5f3c19f18169b6574d0bf3d2_Orum%20Logo.svg",
    categories: ["Dialers", "AI Sales Agents"],
    isFeatured: true,
    websiteLink: "https://www.orum.com",
    shortDescription: "AI-powered live conversation platform. Dial multiple numbers at once.",
    fullDescription: "Orum allows reps to call up to 10 prospects simultaneously. The AI detects voicemails and navigates trees, only connecting the rep when a human answers.",
    idealCustomerProfile: "High-Volume Sales Teams.",
    pricingModel: "Per User / Month",
    organizationType: "Scaleup, Enterprise",
    complexity: 60,
    keyFeatures: ["Parallel Dialing", "AI Voicemail Drop", "CRM Sync"],
    faqs: []
  },
  {
    name: "Loom",
    slug: "loom",
    logo: "https://cdn.worldvectorlogo.com/logos/loom-logo.svg",
    categories: ["Video Prospecting"],
    isFeatured: false,
    websiteLink: "https://www.loom.com",
    shortDescription: "Async video messaging for work.",
    fullDescription: "Loom is essential for modern prospecting. Sending a 60-second personalized video often gets 3x higher response rates than text emails.",
    idealCustomerProfile: "Everyone.",
    pricingModel: "Freemium",
    organizationType: "All",
    complexity: 10,
    keyFeatures: ["Screen Recording", "Instant Sharing", "Viewer Analytics"],
    faqs: []
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