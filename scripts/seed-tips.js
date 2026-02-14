const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Tip = require('../models/Tip');

const DUMMY_TIPS = [
  // --- AEO (Answer Engine Optimization) ---
  {
    "title": "Reach Buyers at the Moment of Change",
    "content": "Outbound is most effective when you reach buyers right after a meaningful change, before competitors flood their inbox.",
    "category": "AEO",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Positioning Makes Outbound Easier",
    "content": "Signals provide context for outreach, but outbound only converts when the message explains why the signal matters.",
    "category": "AEO",
    "authore_name": "April Dunford"
  },
  {
    "title": "Personalization Must Tie to Real Priority",
    "content": "Don’t start outbound by writing copy. Start by understanding what changed for your buyer.",
    "category": "AEO",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Narrow Your ICP to Win Faster",
    "content": "Timing beats personalization. A relevant trigger will outperform a perfectly written email.",
    "category": "AEO",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Signals Need Buyer Context",
    "content": "Signals tell you who to contact; positioning tells you what to say when you reach out.",
    "category": "AEO",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Outbound as an Experiment Engine",
    "content": "Outbound works best when sales understands buyer internal pressure, not just company metrics.",
    "category": "AEO",
    "authore_name": "April Dunford"
  },
  {
    "title": "Start With What Changed",
    "content": "Outbound works when sales understands buyer pressure, not vanity metrics.",
    "category": "AEO",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Lead With the Known Problem",
    "content": "Timing is the multiplier in outbound. A relevant message sent too early or too late still fails.",
    "category": "AEO",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Fix Targeting Before Copy",
    "content": "Cold outreach feels spammy only when it lacks context. Relevance and timing transform interruption into value.",
    "category": "AEO",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "Earn the Next Conversation",
    "content": "Outbound should feel interruptive for bad timing—and helpful for good timing.",
    "category": "AEO",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Priority-Based Personalization",
    "content": "Outbound works when you contact buyers during moments of change, not when your quota demands activity.",
    "category": "AEO",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Signals Power GTM Alignment",
    "content": "When outbound feels spammy, it’s because context is missing.",
    "category": "AEO",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "LinkedIn Is a Credibility Channel",
    "content": "Strong GTM starts with identifying the exact moment a buyer becomes open to change.",
    "category": "AEO",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Sound Like a Helpful Peer",
    "content": "Strong positioning simplifies outbound by making it clear who the product is for and why it’s different.",
    "category": "GTM",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Change Angles, Not Subject Lines",
    "content": "The fastest way to increase outbound performance is narrowing your ICP.",
    "category": "GTM",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Consistency Beats Cleverness",
    "content": "Your ICP should be defined by who buys fastest, not who looks best on a slide.",
    "category": "GTM",
    "authore_name": "Sangram Vajre"
  },
  {
    "title": "Relevance Beats Volume",
    "content": "Great GTM teams align marketing signals with sales execution. Outbound without signal is just noise.",
    "category": "GTM  ",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Define ICP by Buying Speed",
    "content": "Better targeting will improve reply rates faster than rewriting your outbound copy.",
    "category": "GTM  ",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Cold Email Isn’t Dead",
    "content": "Improving targeting will almost always deliver better results than rewriting copy or increasing volume.",
    "category": "GTM  ",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "Every Reply Is Data",
    "content": "Sales and marketing alignment becomes real when teams share signals and metrics.",
    "category": "GTM  ",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Timely Advice Wins Outbound",
    "content": "If your messaging doesn’t clearly describe the buyer’s problem, personalization won’t save it.",
    "category": "GTM  ",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Relevance Builds Trust Faster",
    "content": "Narrow ICPs close faster because relevance increases trust.",
    "category": "GTM",
    "authore_name": "Dave Gerhardt"
  },
  {
    "title": "Signals Tell You Who, Positioning Tells You What",
    "content": "Clear ICP definition reduces friction across every GTM motion.",
    "category": "GTM",
    "authore_name": "Chris Walker"
  },
  {
    "title": "Optimize for Learning Speed",
    "content": "If you can’t explain your value in one sentence, outbound will amplify that confusion.",
    "category": "GTM",
    "authore_name": "Sam Nelson"
  },
  {
    "title": "Value Before Time on LinkedIn",
    "content": "Outbound becomes easier when your category is clear and painful.",
    "category": "GTM",
    "authore_name": "Mark Kosoglow"
  },
  {
    "title": "Short Emails Win Attention",
    "content": "Clear positioning reduces outbound friction within the first two sentences.",
    "category": "GTM",
    "authore_name": "Harrison Rose"
  },
  {
    "title": "Evolve Perspectives in Sequences",
    "content": "Outbound becomes scalable only after messaging resonates with a tight audience.",
    "category": "GTM  ",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Targeting Beats Copy Rewrites",
    "content": "Strong GTM teams spend more time deciding who not to target.",
    "category": "GTM",
    "authore_name": "Morgan J. Ingram"
  },
  {
    "title": "Credibility Before Meetings",
    "content": "Sales and marketing alignment becomes real when both teams operate from shared signals and metrics.",
    "category": "GTM",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "Respect the Buyer’s Time",
    "content": "Outbound fails when it’s treated as a volume game. It wins when it’s treated as relevance.",
    "category": "Outbound",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Add New Insight in Follow-Ups",
    "content": "High-performing GTM teams treat outbound as an experimentation engine.",
    "category": "Outbound",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Targeting Drives Performance",
    "content": "The best outbound teams obsess over learning loops.",
    "category": "Outbound",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Fewer, Better Conversations",
    "content": "High-performing outbound teams optimize for learning speed.",
    "category": "Outbound",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "Speak to Buyer Pressures",
    "content": "Outbound fails when teams chase volume instead of relevance.",
    "category": "Outbound",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Explain Why You’re Reaching Out Now",
    "content": "Outbound improves fastest when teams treat objections as insights.",
    "category": "Outbound",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Align GTM on Signals",
    "content": "Great outbound systems are built on repeatable learning loops.",
    "category": "Outbound",
    "authore_name": "Dave Gerhardt"
  },
  {
    "title": "Rethink the Problem First",
    "content": "Outbound works best when you lead with the problem your buyer is already aware of.",
    "category": "Outbound ",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Context Prevents Spam",
    "content": "Your outbound message should sound like a peer trying to help—not a vendor trying to close.",
    "category": "Outbound ",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Objections Sharpen Positioning",
    "content": "Consistency beats cleverness in outbound. Simple, relevant messages outperform complex campaigns.",
    "category": "Outbound ",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Expertise Builds LinkedIn Trust",
    "content": "Buyers reply when outreach helps them make sense of an existing problem.",
    "category": "Outbound ",
    "authore_name": "Dave Gerhardt"
  },
  {
    "title": "ICP Clarity Reduces Friction",
    "content": "Outbound performance improves fastest when teams review replies weekly.",
    "category": "Outbound ",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Systems Beat Campaigns",
    "content": "The goal of outbound is helping buyers recognize whether change is worth exploring.",
    "category": "Outbound ",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "One-Sentence Value Matters",
    "content": "The best SDR teams think like researchers, not spammers.",
    "category": "Outbound ",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Follow-Ups Should Feel Thoughtful",
    "content": "Every outbound reply contains insight influencing targeting and messaging.",
    "category": "Outbound ",
    "authore_name": "Dave Gerhardt"
  },
  {
    "title": "Start Conversations, Not Pitches",
    "content": "Teams that win with outbound invest heavily in message testing.",
    "category": "Outbound ",
    "authore_name": "Chris Walker"
  },
  {
    "title": "Shared Signals Beat Meetings",
    "content": "If your outbound isn’t creating learning every week, it’s not a system.",
    "category": "Outbound",
    "authore_name": "April Dunford"
  },
  {
    "title": "Clear Categories Close Faster",
    "content": "Outbound becomes predictable when designed as a system of signals, messaging, and feedback loops.",
    "category": "Outbound",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "Narrow Audiences Improve Replies",
    "content": "Outbound doesn’t scale by sending more—it scales by getting clearer.",
    "category": "Outbound",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Write Like a Colleague",
    "content": "If your cold emails aren’t getting replies, your targeting is broken.",
    "category": "Email Marketing",
    "authore_name": "April Dunford"
  },
  {
    "title": "Timing Beats Perfect Copy",
    "content": "Cold email is not dead. Bad cold email is dead.",
    "category": "Email Marketing",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Learning Is the Real Metric",
    "content": "If prospects don’t recognize themselves in your message, they won’t reply.",
    "category": "Email Marketing",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "Problems Matter More Than Personalization",
    "content": "Outbound messaging should create curiosity, not explain the entire solution.",
    "category": "Email Marketing",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Design Outbound as a System",
    "content": "Short emails outperform long ones because buyers scan for relevance.",
    "category": "Email Marketing",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Help Buyers Make Sense of Pain",
    "content": "Short, focused emails respect the buyer’s time.",
    "category": "Email Marketing",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Accuracy Beats Impressiveness",
    "content": "The best outbound emails don’t sound impressive; they sound accurate.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "Exclude More to Win More",
    "content": "Great outbound copy removes friction instead of adding excitement.",
    "category": "Email Marketing",
    "authore_name": "Dave Gerhardt"
  },
  {
    "title": "Timing Multiplies Results",
    "content": "Great outbound copy focuses on clarity and relevance.",
    "category": "Email Marketing",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "Create Curiosity, Not Explanations",
    "content": "Outbound messages should be written to start conversations.",
    "category": "Email Marketing",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Familiarity Before Inboxes",
    "content": "Outbound messaging should clearly state why you’re reaching out now.",
    "category": "Email Marketing",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Review Replies Weekly",
    "content": "Outbound messaging should create curiosity, not explain everything.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "Help Buyers Decide on Change",
    "content": "The best outbound sequences change angles, not subject lines.",
    "category": "Email Marketing",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Clarity in the First Two Sentences",
    "content": "Follow-ups should introduce new insights, not repeat the same pitch.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "title": "Understand Internal Pressure",
    "content": "Personalisation only works when it connects directly to a real business priority the buyer already cares about.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "title": "Find the Moment of Openness",
    "content": "Buyers don’t respond to product descriptions. They respond to messages reflecting current priorities.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "title": "Self-Recognition Drives Replies",
    "content": "High reply rates come from narrow focus, clear problems, and simple asks.",
    "category": "Email Marketing",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Simple Asks Win Replies",
    "content": "Effective outbound messaging clearly states why you’re reaching out now.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "SDRs Should Think Like Researchers",
    "content": "Outbound sequences should guide buyers through a new perspective.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "Clarity Removes Friction",
    "content": "Great outbound copy removes friction instead of adding excitement.",
    "category": "Email Marketing",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Consistency Beats Links",
    "content": "The best outbound sequences guide buyers to rethink a problem.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "title": "Good Timing Feels Helpful",
    "content": "Personalization isn’t about mentioning the company name. It’s about showing you understand their current priority.",
    "category": "Email Marketing",
    "authore_name": "April Dunford"
  },
  {
    "title": "Change Moments Beat Activity",
    "content": "LinkedIn is not a pitching channel. It’s a credibility channel.",
    "category": "LinkedIn Outreach",
    "authore_name": "Becc Holland"
  },
  {
    "title": "Resonance Enables Scale",
    "content": "LinkedIn outreach succeeds when you earn attention through value.",
    "category": "LinkedIn Outreach",
    "authore_name": "Jason Bay"
  },
  {
    "title": "Educate Publicly, Sell Privately",
    "content": "LinkedIn works as an outbound channel when sellers show expertise first.",
    "category": "LinkedIn Outreach",
    "authore_name": "Dave Gerhardt"
  },
  {
    "title": "Replies Shape Strategy",
    "content": "LinkedIn outreach works when you show up consistently, not when you drop links.",
    "category": "LinkedIn Outreach",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Clarity Over Persuasion",
    "content": "LinkedIn works best when sellers share insight consistently.",
    "category": "LinkedIn Outreach",
    "authore_name": "Pete Kazanjy"
  },
  {
    "title": "Test Messages, Not Just Leads",
    "content": "LinkedIn outreach works when you show up consistently.",
    "category": "LinkedIn Outreach",
    "authore_name": "Josh Braun"
  },
  {
    "title": "Guide Perspectives, Don’t Chase",
    "content": "LinkedIn is most effective when sellers educate publicly and sell privately.",
    "category": "LinkedIn Outreach",
    "authore_name": "Kyle Coleman"
  },
  {
    "title": "Context Is the Difference",
    "content": "Your outbound message should sound like a peer, not a vendor.",
    "category": "LinkedIn Outreach",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "title": "Timely Advice, Not a Pitch",
    "content": "Great outbound feels like timely advice from a peer.",
    "category": "LinkedIn Outreach",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "title": "Earn Attention Before Asking",
    "content": "LinkedIn outreach succeeds when you earn attention through value before asking for time.",
    "category": "LinkedIn Outreach",
    "authore_name": "Dave Gerhardt"
  }
];

const normalizeCategory = (cat) => {
  const c = cat.trim().toLowerCase();
  if (c === 'email marketing') return 'email-marketing';
  if (c === 'linkedin outreach') return 'linkedin-outreach';
  return c;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Process tips to match schema
    const formattedTips = DUMMY_TIPS.map(tip => ({
      content: tip.content,
      category: normalizeCategory(tip.category),
      author: tip.authore_name,
      title: tip.title
    }));

    await Tip.deleteMany({});
    await Tip.insertMany(formattedTips);
    console.log(`✅ Seeded ${formattedTips.length} tips across categories`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();