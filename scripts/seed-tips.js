const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Tip = require('../models/Tip');

const DUMMY_TIPS = [
  // --- AEO (Answer Engine Optimization) ---
  {
    "content": "Outbound is most effective when you reach buyers right after a meaningful change, before competitors flood their inbox.",
    "category": "AEO",
    "authore_name": "Becc Holland"
  },
  {
    "content": "Signals provide context for outreach, but outbound only converts when the message explains why the signal matters.",
    "category": "AEO",
    "authore_name": "April Dunford"
  },
  {
    "content": "Don’t start outbound by writing copy. Start by understanding what changed for your buyer.",
    "category": "AEO",
    "authore_name": "Josh Braun"
  },
  {
    "content": "Timing beats personalization. A relevant trigger will outperform a perfectly written email.",
    "category": "AEO",
    "authore_name": "Jason Bay"
  },
  {
    "content": "Signals tell you who to contact; positioning tells you what to say when you reach out.",
    "category": "AEO",
    "authore_name": "Becc Holland"
  },
  {
    "content": "Outbound works best when sales understands buyer internal pressure, not just company metrics.",
    "category": "AEO",
    "authore_name": "April Dunford"
  },
  {
    "content": "Outbound works when sales understands buyer pressure, not vanity metrics.",
    "category": "AEO",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "Timing is the multiplier in outbound. A relevant message sent too early or too late still fails.",
    "category": "AEO",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "Cold outreach feels spammy only when it lacks context. Relevance and timing transform interruption into value.",
    "category": "AEO",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "Outbound should feel interruptive for bad timing—and helpful for good timing.",
    "category": "AEO",
    "authore_name": "Becc Holland"
  },
  {
    "content": "Outbound works when you contact buyers during moments of change, not when your quota demands activity.",
    "category": "AEO",
    "authore_name": "Josh Braun"
  },
  {
    "content": "When outbound feels spammy, it’s because context is missing.",
    "category": "AEO",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "Strong GTM starts with identifying the exact moment a buyer becomes open to change.",
    "category": "AEO",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "content": "Strong positioning simplifies outbound by making it clear who the product is for and why it’s different.",
    "category": "GTM",
    "authore_name": "Jason Bay"
  },
  {
    "content": "The fastest way to increase outbound performance is narrowing your ICP.",
    "category": "GTM",
    "authore_name": "Josh Braun"
  },
  {
    "content": "Your ICP should be defined by who buys fastest, not who looks best on a slide.",
    "category": "GTM",
    "authore_name": "Sangram Vajre"
  },
  {
    "content": "Great GTM teams align marketing signals with sales execution. Outbound without signal is just noise.",
    "category": "GTM  ",
    "authore_name": "Jason Bay"
  },
  {
    "content": "Better targeting will improve reply rates faster than rewriting your outbound copy.",
    "category": "GTM  ",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "Improving targeting will almost always deliver better results than rewriting copy or increasing volume.",
    "category": "GTM  ",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "Sales and marketing alignment becomes real when teams share signals and metrics.",
    "category": "GTM  ",
    "authore_name": "Becc Holland"
  },
  {
    "content": "If your messaging doesn’t clearly describe the buyer’s problem, personalization won’t save it.",
    "category": "GTM  ",
    "authore_name": "Jason Bay"
  },
  {
    "content": "Narrow ICPs close faster because relevance increases trust.",
    "category": "GTM",
    "authore_name": "Dave Gerhardt"
  },
  {
    "content": "Clear ICP definition reduces friction across every GTM motion.",
    "category": "GTM",
    "authore_name": "Chris Walker"
  },
  {
    "content": "If you can’t explain your value in one sentence, outbound will amplify that confusion.",
    "category": "GTM",
    "authore_name": "Sam Nelson"
  },
  {
    "content": "Outbound becomes easier when your category is clear and painful.",
    "category": "GTM",
    "authore_name": "Mark Kosoglow"
  },
  {
    "content": "Clear positioning reduces outbound friction within the first two sentences.",
    "category": "GTM",
    "authore_name": "Harrison Rose"
  },
  {
    "content": "Outbound becomes scalable only after messaging resonates with a tight audience.",
    "category": "GTM  ",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "content": "Strong GTM teams spend more time deciding who not to target.",
    "category": "GTM",
    "authore_name": "Morgan J. Ingram"
  },
  {
    "content": "Sales and marketing alignment becomes real when both teams operate from shared signals and metrics.",
    "category": "GTM",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "Outbound fails when it’s treated as a volume game. It wins when it’s treated as relevance.",
    "category": "Outbound",
    "authore_name": "Josh Braun"
  },
  {
    "content": "High-performing GTM teams treat outbound as an experimentation engine.",
    "category": "Outbound",
    "authore_name": "Jason Bay"
  },
  {
    "content": "The best outbound teams obsess over learning loops.",
    "category": "Outbound",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "High-performing outbound teams optimize for learning speed.",
    "category": "Outbound",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "Outbound fails when teams chase volume instead of relevance.",
    "category": "Outbound",
    "authore_name": "Becc Holland"
  },
  {
    "content": "Outbound improves fastest when teams treat objections as insights.",
    "category": "Outbound",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "content": "Great outbound systems are built on repeatable learning loops.",
    "category": "Outbound",
    "authore_name": "Dave Gerhardt"
  },
  {
    "content": "Outbound works best when you lead with the problem your buyer is already aware of.",
    "category": "Outbound ",
    "authore_name": "Becc Holland"
  },
  {
    "content": "Your outbound message should sound like a peer trying to help—not a vendor trying to close.",
    "category": "Outbound ",
    "authore_name": "Josh Braun"
  },
  {
    "content": "Consistency beats cleverness in outbound. Simple, relevant messages outperform complex campaigns.",
    "category": "Outbound ",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "content": "Buyers reply when outreach helps them make sense of an existing problem.",
    "category": "Outbound ",
    "authore_name": "Dave Gerhardt"
  },
  {
    "content": "Outbound performance improves fastest when teams review replies weekly.",
    "category": "Outbound ",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "The goal of outbound is helping buyers recognize whether change is worth exploring.",
    "category": "Outbound ",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "The best SDR teams think like researchers, not spammers.",
    "category": "Outbound ",
    "authore_name": "Becc Holland"
  },
  {
    "content": "Every outbound reply contains insight influencing targeting and messaging.",
    "category": "Outbound ",
    "authore_name": "Dave Gerhardt"
  },
  {
    "content": "Teams that win with outbound invest heavily in message testing.",
    "category": "Outbound ",
    "authore_name": "Chris Walker"
  },
  {
    "content": "If your outbound isn’t creating learning every week, it’s not a system.",
    "category": "Outbound",
    "authore_name": "April Dunford"
  },
  {
    "content": "Outbound becomes predictable when designed as a system of signals, messaging, and feedback loops.",
    "category": "Outbound",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "Outbound doesn’t scale by sending more—it scales by getting clearer.",
    "category": "Outbound",
    "authore_name": "Becc Holland"
  },
  {
    "content": "If your cold emails aren’t getting replies, your targeting is broken.",
    "category": "Email Marketing",
    "authore_name": "April Dunford"
  },
  {
    "content": "Cold email is not dead. Bad cold email is dead.",
    "category": "Email Marketing",
    "authore_name": "Josh Braun"
  },
  {
    "content": "If prospects don’t recognize themselves in your message, they won’t reply.",
    "category": "Email Marketing",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "Outbound messaging should create curiosity, not explain the entire solution.",
    "category": "Email Marketing",
    "authore_name": "Josh Braun"
  },
  {
    "content": "Short emails outperform long ones because buyers scan for relevance.",
    "category": "Email Marketing",
    "authore_name": "Jason Bay"
  },
  {
    "content": "Short, focused emails respect the buyer’s time.",
    "category": "Email Marketing",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "The best outbound emails don’t sound impressive; they sound accurate.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "Great outbound copy removes friction instead of adding excitement.",
    "category": "Email Marketing",
    "authore_name": "Dave Gerhardt"
  },
  {
    "content": "Great outbound copy focuses on clarity and relevance.",
    "category": "Email Marketing",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "Outbound messages should be written to start conversations.",
    "category": "Email Marketing",
    "authore_name": "Josh Braun"
  },
  {
    "content": "Outbound messaging should clearly state why you’re reaching out now.",
    "category": "Email Marketing",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "Outbound messaging should create curiosity, not explain everything.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "The best outbound sequences change angles, not subject lines.",
    "category": "Email Marketing",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "content": "Follow-ups should introduce new insights, not repeat the same pitch.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "content": "Personalisation only works when it connects directly to a real business priority the buyer already cares about.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "content": "Buyers don’t respond to product descriptions. They respond to messages reflecting current priorities.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "content": "High reply rates come from narrow focus, clear problems, and simple asks.",
    "category": "Email Marketing",
    "authore_name": "Trish Bertuzzi"
  },
  {
    "content": "Effective outbound messaging clearly states why you’re reaching out now.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "Outbound sequences should guide buyers through a new perspective.",
    "category": "Email Marketing",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "Great outbound copy removes friction instead of adding excitement.",
    "category": "Email Marketing",
    "authore_name": "Jason Bay"
  },
  {
    "content": "The best outbound sequences guide buyers to rethink a problem.",
    "category": "Email Marketing",
    "authore_name": "Chris Walker"
  },
  {
    "content": "Personalization isn’t about mentioning the company name. It’s about showing you understand their current priority.",
    "category": "Email Marketing",
    "authore_name": "April Dunford"
  },
  {
    "content": "LinkedIn is not a pitching channel. It’s a credibility channel.",
    "category": "LinkedIn Outreach",
    "authore_name": "Becc Holland"
  },
  {
    "content": "LinkedIn outreach succeeds when you earn attention through value.",
    "category": "LinkedIn Outreach",
    "authore_name": "Jason Bay"
  },
  {
    "content": "LinkedIn works as an outbound channel when sellers show expertise first.",
    "category": "LinkedIn Outreach",
    "authore_name": "Dave Gerhardt"
  },
  {
    "content": "LinkedIn outreach works when you show up consistently, not when you drop links.",
    "category": "LinkedIn Outreach",
    "authore_name": "Josh Braun"
  },
  {
    "content": "LinkedIn works best when sellers share insight consistently.",
    "category": "LinkedIn Outreach",
    "authore_name": "Pete Kazanjy"
  },
  {
    "content": "LinkedIn outreach works when you show up consistently.",
    "category": "LinkedIn Outreach",
    "authore_name": "Josh Braun"
  },
  {
    "content": "LinkedIn is most effective when sellers educate publicly and sell privately.",
    "category": "LinkedIn Outreach",
    "authore_name": "Kyle Coleman"
  },
  {
    "content": "Your outbound message should sound like a peer, not a vendor.",
    "category": "LinkedIn Outreach",
    "authore_name": "Jacco van der Kooij"
  },
  {
    "content": "Great outbound feels like timely advice from a peer.",
    "category": "LinkedIn Outreach",
    "authore_name": "Trish Bertuzzi"
  },
  {
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

const getTitle = (content) => {
  const words = content.split(' ');
  if (words.length <= 6) return content;
  return words.slice(0, 6).join(' ') + '...';
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
      title: getTitle(tip.content)
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