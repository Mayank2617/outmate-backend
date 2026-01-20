const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Prompt = require('../models/Prompt');

const DUMMY_PROMPTS = [
  {
    title: "The 30-60-90 Day GTM Launch Plan",
    categorySlug: "gtm-strategy",
    tags: ["Strategy", "Executive", "Planning"],
    views: 1240,
    description: "This prompt acts as a strategic consultant, helping you build a comprehensive Go-To-Market execution roadmap. It breaks down the launch into three critical phases: Learning (30), Building (60), and Scaling (90), ensuring alignment between Sales, Marketing, and Product.",
    tips: [
      "Be specific about your funding stage (Series A/B) for better context.",
      "Upload your current product one-pager if you are using ChatGPT Plus/Claude.",
      "Ask the AI to output the result in a Markdown Table for easy copying into Notion."
    ],
    instructions: [
      "Copy the prompt below.",
      "Paste it into ChatGPT (GPT-4 recommended) or Claude 3.5 Sonnet.",
      "Fill in the [bracketed] placeholders with your specific company details.",
      "Hit enter and refine the output by asking for specific KPI expansion."
    ],
    content: `Act as a VP of Marketing & Sales with 15 years of experience in B2B SaaS.
    
I need a comprehensive 30-60-90 day Go-To-Market launch plan for [Product Name], which helps [Target Audience] solve [Main Problem].

Please structure the plan as follows:

PHASE 1: DAYS 1-30 (The Learning Phase)
- Focus: Customer Interviews, Funnel Audit, and Messaging Refinement.
- Key Deliverables: Defined ICP, Competitor Battlecards, and Initial Content Seeding.
- KPIs: Number of interviews conducted, CAC benchmark established.

PHASE 2: DAYS 31-60 (The Building Phase)
- Focus: Outbound Sales Activation and Paid Channel Testing.
- Key Deliverables: Cold Email Sequences, LinkedIn Ads setup, and Sales Deck finalization.
- KPIs: MQL generation, Pipeline velocity.

PHASE 3: DAYS 61-90 (The Scaling Phase)
- Focus: Optimization and Channel Doubling.
- Key Deliverables: Case Study publication, Webinar launch, and Referral program.
- KPIs: Closed Won deals, MoM growth rate.

For each phase, provide a bulleted checklist of tactical actions and the specific stakeholders required (e.g., SDR, PMM, CS). Ends with a table summarizing the "Definition of Success" for the entire quarter.`
  },
  {
    title: "Cold Email Sequence Generator (PAS Framework)",
    categorySlug: "cold-outreach",
    tags: ["Sales", "Copywriting", "Email"],
    views: 890,
    description: "Leverages the Problem-Agitation-Solution (PAS) framework to write high-conversion cold emails. This prompt forces the AI to focus on the prospect's pain points rather than just listing your product features.",
    tips: [
      "Provide a specific 'pain point' your customers face to get the best results.",
      "Ask for 3 different tone variations: Professional, Casual, and Bold.",
      "Ensure you manually check the subject lines to keep them under 4 words."
    ],
    instructions: [
      "Copy the prompt to your clipboard.",
      "Paste into your AI tool.",
      "Replace [My Product] and [Target Persona] with your data.",
      "Use the output as a base for your outreach campaign."
    ],
    content: `Write a 4-step cold email sequence targeting [Target Job Title] at [Industry] companies using the PAS (Problem-Agitation-Solution) framework.

My Product: [Product Name]
Value Proposition: [Main Benefit, e.g., reduces churn by 20%]

Email 1 Guidelines:
- Subject line: Max 4 words, lower case.
- Opening: Mention a specific industry struggle (The Problem).
- Body: Agitate the pain of not solving this problem (lost revenue, wasted time).
- Closing: Soft Call to Action (e.g., "Worth a chat?").

Email 2, 3, 4 Guidelines:
- Focus on social proof, handling objections, and a final breakup email.
- Tone: Conversational, succinct, and not salesy.

Output the result with Subject Lines included.`
  }
];

const seedPrompts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    await Prompt.deleteMany({});
    await Prompt.insertMany(DUMMY_PROMPTS);
    console.log(`✅ Seeded ${DUMMY_PROMPTS.length} detailed prompts`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

seedPrompts();