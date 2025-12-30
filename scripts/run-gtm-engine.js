// const path = require('path');
// // 1. Load Environment Variables
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// const mongoose = require('mongoose');
// const GtmTweet = require('../models/GtmTweet');

// // DEBUG: Ensure DB Connection
// if (!process.env.MONGO_URI) {
//     console.error("❌ FATAL ERROR: MONGO_URI is undefined.");
//     process.exit(1);
// }

// // ==========================================
// // 1. CONFIGURATION
// // ==========================================
// const RAPID_API_KEY = '298ea72f92mshf2e44e4e7cabc9dp1ad588jsnffd7764b0420'; 
// const RAPID_API_HOST = 'twitter241.p.rapidapi.com';

// const CATEGORIES = {
//     // 🟢 UPDATED: Broader queries to ensure GTM posts are captured
//     // We map 'GTM' queries to the 'Strategy' category so they appear in your frontend tab
//     'Strategy': '("Go To Market" OR "GTM" OR "GTM Strategy" OR "Go-to-Market")', 
    
//     // Broader Sales query to fix the "0 found" issue
//     'Sales': '("B2B Sales" OR "SaaS Sales" OR "Sales Strategy" OR "Outbound Sales")',
    
//     'PLG': '("Product Led Growth" OR "PLG")',
//     'Marketing': '("B2B Marketing" OR "Demand Gen" OR "AEO Marketing")',
//     'Cold Email': '("Cold Email" OR "Email Marketing")'
// };

// const GTM_CREATORS = [
//     'jasonlk', 'lennyrachitsky', 'kylepoyar', 'ElenaVerna', 
//     'aprildunford', 'Patticus', 'HarryStebbings'
// ];

// // ==========================================
// // 2. EXTRACTION LOGIC
// // ==========================================

// const findTweetsInRawData = (obj, tweets = []) => {
//     if (!obj || typeof obj !== 'object') return tweets;
//     if (obj.__typename === 'Tweet' && (obj.legacy || obj.note_tweet || obj.details)) {
//         tweets.push(obj);
//         return tweets;
//     }
//     if (Array.isArray(obj)) {
//         for (const item of obj) findTweetsInRawData(item, tweets);
//         return tweets;
//     }
//     for (const key in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, key)) {
//             findTweetsInRawData(obj[key], tweets);
//         }
//     }
//     return tweets;
// };

// const findMediaInTweet = (obj, media = []) => {
//     if (!obj || typeof obj !== 'object') return media;
//     if (obj.original_img_url || obj.media_url_https) {
//         const url = obj.original_img_url || obj.media_url_https;
//         if (!media.find(m => m.url === url)) {
//             let type = 'photo';
//             if (obj.__typename === 'ApiVideo' || obj.type === 'video') type = 'video';
//             if (obj.variants || obj.video_info) type = 'video';
//             media.push({ type, url, width: obj.sizes?.large?.w, height: obj.sizes?.large?.h });
//         }
//     }
//     if (Array.isArray(obj)) {
//         for (const item of obj) findMediaInTweet(item, media);
//     } else {
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 findMediaInTweet(obj[key], media);
//             }
//         }
//     }
//     return media;
// };

// // ==========================================
// // 3. ENGINE FUNCTIONS
// // ==========================================

// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// async function fetchFromApi(endpoint, params) {
//     const queryString = new URLSearchParams(params).toString();
//     const url = `https://${RAPID_API_HOST}/${endpoint}?${queryString}`;
//     const options = { method: 'GET', headers: { 'x-rapidapi-key': RAPID_API_KEY, 'x-rapidapi-host': RAPID_API_HOST } };
    
//     try {
//         const res = await fetch(url, options);
//         if (!res.ok) throw new Error(`API Error ${res.status}`);
//         return await res.json();
//     } catch (err) {
//         console.error(`❌ API Fail: ${err.message}`);
//         return null;
//     }
// }

// async function processAndSave(rawData, categoryLabel) {
//     if (!rawData) return;

//     const rawCandidates = findTweetsInRawData(rawData);
//     console.log(`   ↳ Found ${rawCandidates.length} potential tweets.`);

//     const operations = [];
//     let savedCount = 0;

//     for (const tweet of rawCandidates) {
//         try {
//             const result = tweet.note_tweet?.note_tweet_results?.result || tweet;
//             const legacy = tweet.legacy;
            
//             // --- USER EXTRACTION ---
//             const userResult = tweet.core?.user_results?.result;
//             const userCore = userResult?.core; 
//             const userLegacy = userResult?.legacy || userResult?.core || legacy?.user; 

//             const userName = userCore?.name || userLegacy?.name || "Unknown";
//             const userHandle = userCore?.screen_name || userLegacy?.screen_name || "unknown";
//             const userAvatar = userResult?.avatar?.image_url || userLegacy?.profile_image_url_https || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png";
//             const userVerified = userResult?.verification?.is_blue_verified || userLegacy?.verified || false;

//             if (!legacy) continue;
            
//             const text = result.text || legacy.full_text;
//             if (!text) continue;

//             // --- SPAM FILTER (Keep strictly for crypto junk) ---
//             const textLower = text.toLowerCase();
//             const spamKeywords = ['crypto', 'nft', 'airdrop', 'solana', 'memecoin'];
//             if (spamKeywords.some(k => textLower.includes(k))) continue;

//             // Date Fix
//             let postedDate = new Date(legacy.created_at);
//             if (isNaN(postedDate.getTime())) postedDate = new Date();

//             const metrics = {
//                 likes: legacy.favorite_count || 0,
//                 retweets: legacy.retweet_count || 0,
//                 replies: legacy.reply_count || 0,
//                 views: tweet.views?.count || 0
//             };

//             let media = findMediaInTweet(tweet);
//             media = media.filter((m, i, self) => i === self.findIndex((t) => t.url === m.url));

//             const tweetDoc = {
//                 tweetId: tweet.rest_id,
//                 text: text,
//                 category: categoryLabel,
//                 metrics: metrics,
//                 author: {
//                     name: userName,
//                     handle: userHandle,
//                     avatar: userAvatar,
//                     verified: !!userVerified
//                 },
//                 media: media,
//                 originalUrl: `https://twitter.com/${userHandle}/status/${tweet.rest_id}`,
//                 postedAt: postedDate,
//                 fetchedAt: new Date()
//             };

//             operations.push({
//                 updateOne: {
//                     filter: { tweetId: tweetDoc.tweetId },
//                     update: { $set: tweetDoc },
//                     upsert: true
//                 }
//             });
//             savedCount++;

//         } catch (e) {
//             console.error("Parse Error:", e.message);
//         }
//     }

//     if (operations.length > 0) {
//         await GtmTweet.bulkWrite(operations);
//         console.log(`   ✅ Saved ${savedCount} tweets.`);
//     } else {
//         console.log(`   ⚠️ No valid tweets found (Spam filter active).`);
//     }
// }

// // ==========================================
// // 4. MAIN RUNNER
// // ==========================================
// async function runEngine() {
//     console.log("🚀 STARTING GTM ENGINE (BROAD GTM SEARCH)...");
    
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("✅ Connected to MongoDB.");

//         // PHASE 1: KEYWORD SEARCHES
//         console.log("\n--- PHASE 1: CATEGORY SEARCH ---");
//         for (const [cat, query] of Object.entries(CATEGORIES)) {
//             console.log(`🔍 Searching: ${cat}... [Query: ${query}]`);
//             const data = await fetchFromApi('search-v3', {
//                 query: `${query} lang:en -filter:replies`,
//                 count: 40, // Increased to 40 to catch more
//                 type: 'Latest' 
//             });
//             await processAndSave(data, cat);
//             await sleep(2000); 
//         }

//         // PHASE 2: CREATOR HARVEST
//         console.log("\n--- PHASE 2: CREATOR HARVEST ---");
//         for (const handle of GTM_CREATORS) {
//             console.log(`👤 Checking Creator: @${handle}...`);
//             const data = await fetchFromApi('search-v3', {
//                 query: `from:${handle} -filter:replies`,
//                 count: 20,
//                 type: 'Latest'
//             });
//             await processAndSave(data, 'Expert Insight');
//             await sleep(2000);
//         }

//         console.log("\n✅ ENGINE FINISHED. DATABASE UPDATED.");
//         process.exit(0);

//     } catch (error) {
//         console.error("\n❌ FATAL ENGINE ERROR:", error);
//         process.exit(1);
//     }
// }

// runEngine();


// TRY 2

// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// const mongoose = require('mongoose');
// const GtmTweet = require('../models/GtmTweet');

// if (!process.env.MONGO_URI) { console.error("❌ FATAL: MONGO_URI missing."); process.exit(1); }

// // ==========================================
// // 1. CONFIGURATION
// // ==========================================
// const RAPID_API_KEY = '298ea72f92mshf2e44e4e7cabc9dp1ad588jsnffd7764b0420'; 
// const RAPID_API_HOST = 'twitter241.p.rapidapi.com';

// const CATEGORIES = {
//     'Strategy': '("Go To Market" OR "GTM" OR "GTM Strategy" OR "Go-to-Market")',
//     'Sales': '("B2B Sales" OR "SaaS Sales" OR "Sales Strategy" OR "Outbound Sales")',
//     'PLG': '("Product Led Growth" OR "PLG")',
//     'Marketing': '("B2B Marketing" OR "Demand Gen" OR "AEO Marketing")',
//     'Cold Email': '("Cold Email" OR "Email Marketing")'
// };

// // ==========================================
// // 2. EXTRACTION LOGIC
// // ==========================================
// const findTweetsInRawData = (obj, tweets = []) => {
//     if (!obj || typeof obj !== 'object') return tweets;
//     if (obj.__typename === 'Tweet' && (obj.legacy || obj.note_tweet || obj.details)) {
//         tweets.push(obj);
//         return tweets;
//     }
//     if (Array.isArray(obj)) {
//         for (const item of obj) findTweetsInRawData(item, tweets);
//         return tweets;
//     }
//     for (const key in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, key)) findTweetsInRawData(obj[key], tweets);
//     }
//     return tweets;
// };

// const findMediaInTweet = (obj, media = []) => {
//     if (!obj || typeof obj !== 'object') return media;
//     if (obj.original_img_url || obj.media_url_https) {
//         const url = obj.original_img_url || obj.media_url_https;
//         if (!media.find(m => m.url === url)) {
//             let type = 'photo';
//             if (obj.__typename === 'ApiVideo' || obj.type === 'video') type = 'video';
//             if (obj.variants || obj.video_info) type = 'video';
//             media.push({ type, url, width: obj.sizes?.large?.w, height: obj.sizes?.large?.h });
//         }
//     }
//     if (Array.isArray(obj)) {
//         for (const item of obj) findMediaInTweet(item, media);
//     } else {
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) findMediaInTweet(obj[key], media);
//         }
//     }
//     return media;
// };

// // ==========================================
// // 3. ENGINE FUNCTIONS
// // ==========================================
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// async function fetchFromApi(endpoint, params) {
//     const queryString = new URLSearchParams(params).toString();
//     const url = `https://${RAPID_API_HOST}/${endpoint}?${queryString}`;
//     const options = { method: 'GET', headers: { 'x-rapidapi-key': RAPID_API_KEY, 'x-rapidapi-host': RAPID_API_HOST } };
//     try {
//         const res = await fetch(url, options);
//         if (!res.ok) throw new Error(`API Error ${res.status}`);
//         return await res.json();
//     } catch (err) {
//         console.error(`❌ API Fail: ${err.message}`);
//         return null;
//     }
// }

// async function processAndSave(rawData, categoryLabel) {
//     if (!rawData) return;

//     const rawCandidates = findTweetsInRawData(rawData);
//     console.log(`   ↳ Found ${rawCandidates.length} raw objects.`);

//     const operations = [];
//     const seenIds = new Set(); // 🛑 PREVENTS DUPLICATES
    
//     // Debug Counters
//     let stats = { saved: 0, duplicate: 0, noText: 0, badStructure: 0 };

//     for (const tweet of rawCandidates) {
//         try {
//             // 1. DEDUPLICATION CHECK
//             if (seenIds.has(tweet.rest_id)) {
//                 stats.duplicate++;
//                 continue;
//             }
//             seenIds.add(tweet.rest_id);

//             // 2. EXTRACTION
//             const result = tweet.note_tweet?.note_tweet_results?.result || tweet;
//             const legacy = tweet.legacy || {}; // Default to empty object if missing
            
//             const userResult = tweet.core?.user_results?.result;
//             const userCore = userResult?.core; 
//             const userLegacy = userResult?.legacy || userResult?.core || legacy?.user || {}; 

//             // 3. TEXT CHECK (The only hard requirement)
//             const text = result.text || legacy.full_text;
//             if (!text) {
//                 stats.noText++; // Likely a "Tombstone" (deleted tweet)
//                 continue;
//             }

//             // 4. FORCE FILL MISSING DATA (No Skipping!)
//             const userName = userCore?.name || userLegacy?.name || "Unknown User";
//             const userHandle = userCore?.screen_name || userLegacy?.screen_name || "unknown";
//             const userAvatar = userResult?.avatar?.image_url || userLegacy?.profile_image_url_https || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png";
            
//             // Fix Dates
//             let postedDate = new Date(legacy.created_at);
//             if (isNaN(postedDate.getTime())) postedDate = new Date(); // Default to NOW if date is missing

//             const metrics = {
//                 likes: legacy.favorite_count || 0,
//                 retweets: legacy.retweet_count || 0,
//                 replies: legacy.reply_count || 0,
//                 views: tweet.views?.count || 0
//             };

//             let media = findMediaInTweet(tweet);
//             media = media.filter((m, i, self) => i === self.findIndex((t) => t.url === m.url));

//             const tweetDoc = {
//                 tweetId: tweet.rest_id,
//                 text: text,
//                 category: categoryLabel,
//                 metrics: metrics,
//                 author: { name: userName, handle: userHandle, avatar: userAvatar, verified: false },
//                 media: media,
//                 originalUrl: `https://twitter.com/${userHandle}/status/${tweet.rest_id}`,
//                 postedAt: postedDate,
//                 fetchedAt: new Date()
//             };

//             operations.push({
//                 updateOne: {
//                     filter: { tweetId: tweetDoc.tweetId },
//                     update: { $set: tweetDoc },
//                     upsert: true
//                 }
//             });
//             stats.saved++;

//         } catch (e) {
//             stats.badStructure++;
//         }
//     }

//     if (operations.length > 0) {
//         await GtmTweet.bulkWrite(operations);
//         console.log(`   ✅ RESULT: Saved ${stats.saved} | Duplicates: ${stats.duplicate} | Empty/Ads: ${stats.noText + stats.badStructure}`);
//     } else {
//         console.log(`   ⚠️ RESULT: 0 Saved. (All ${rawCandidates.length} were duplicates or empty ads)`);
//     }
// }

// // ==========================================
// // 4. MAIN RUNNER
// // ==========================================
// async function runEngine() {
//     console.log("🚀 STARTING GTM ENGINE (FORCE SAVE MODE)...");
    
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("✅ Connected to MongoDB.");

//         console.log("\n--- PHASE 1: CATEGORY SEARCH ---");
//         for (const [cat, query] of Object.entries(CATEGORIES)) {
//             console.log(`🔍 Searching: ${cat}...`);
//             const data = await fetchFromApi('search-v3', {
//                 query: `${query} lang:en -filter:replies`,
//                 count: 40, 
//                 type: 'Latest' 
//             });
//             await processAndSave(data, cat);
//             await sleep(2000); 
//         }

//         console.log("\n✅ ENGINE FINISHED. DATABASE UPDATED.");
//         process.exit(0);

//     } catch (error) {
//         console.error("\n❌ FATAL ENGINE ERROR:", error);
//         process.exit(1);
//     }
// }

// runEngine();

// Try 3

const path = require('path');
// 1. Load Environment Variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const GtmTweet = require('../models/GtmTweet');

// DEBUG: Ensure DB Connection
if (!process.env.MONGO_URI) {
    console.error("❌ FATAL ERROR: MONGO_URI is undefined.");
    process.exit(1);
}

// ==========================================
// 1. CONFIGURATION
// ==========================================
const RAPID_API_KEY = '298ea72f92mshf2e44e4e7cabc9dp1ad588jsnffd7764b0420'; 
const RAPID_API_HOST = 'twitter241.p.rapidapi.com';

const CATEGORIES = {
    'Strategy': '("Go To Market" OR "GTM" OR "GTM Strategy" OR "Go-to-Market")',
    'Sales': '("B2B Sales" OR "SaaS Sales" OR "Sales Strategy" OR "Outbound Sales")',
    'PLG': '("Product Led Growth" OR "PLG")',
    'Marketing': '("B2B Marketing" OR "Demand Gen" OR "AEO Marketing")',
    'Cold Email': '("Cold Email" OR "Email Marketing")'
};

// Restored Creator List
const GTM_CREATORS = [
    'jasonlk', 
    'lennyrachitsky', 
    'kylepoyar', 
    'ElenaVerna', 
    'aprildunford', 
    'Patticus', 
    'HarryStebbings'
];

// ==========================================
// 2. EXTRACTION LOGIC
// ==========================================
const findTweetsInRawData = (obj, tweets = []) => {
    if (!obj || typeof obj !== 'object') return tweets;
    if (obj.__typename === 'Tweet' && (obj.legacy || obj.note_tweet || obj.details)) {
        tweets.push(obj);
        return tweets;
    }
    if (Array.isArray(obj)) {
        for (const item of obj) findTweetsInRawData(item, tweets);
        return tweets;
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) findTweetsInRawData(obj[key], tweets);
    }
    return tweets;
};

const findMediaInTweet = (obj, media = []) => {
    if (!obj || typeof obj !== 'object') return media;
    if (obj.original_img_url || obj.media_url_https) {
        const url = obj.original_img_url || obj.media_url_https;
        if (!media.find(m => m.url === url)) {
            let type = 'photo';
            if (obj.__typename === 'ApiVideo' || obj.type === 'video') type = 'video';
            if (obj.variants || obj.video_info) type = 'video';
            media.push({ type, url, width: obj.sizes?.large?.w, height: obj.sizes?.large?.h });
        }
    }
    if (Array.isArray(obj)) {
        for (const item of obj) findMediaInTweet(item, media);
    } else {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) findMediaInTweet(obj[key], media);
        }
    }
    return media;
};

// ==========================================
// 3. ENGINE FUNCTIONS
// ==========================================
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchFromApi(endpoint, params) {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://${RAPID_API_HOST}/${endpoint}?${queryString}`;
    const options = { method: 'GET', headers: { 'x-rapidapi-key': RAPID_API_KEY, 'x-rapidapi-host': RAPID_API_HOST } };
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`API Error ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`❌ API Fail: ${err.message}`);
        return null;
    }
}

// ✅ NEW PARAMETER: maxSaveCount
async function processAndSave(rawData, categoryLabel, maxSaveCount = Infinity) {
    if (!rawData) return;

    const rawCandidates = findTweetsInRawData(rawData);
    console.log(`   ↳ Found ${rawCandidates.length} raw objects.`);

    const operations = [];
    const seenIds = new Set();
    
    let stats = { saved: 0, duplicate: 0, skipped: 0 };

    for (const tweet of rawCandidates) {
        // 🛑 LIMIT CHECK: If we hit the max (e.g., 1 for creators), STOP processing this batch
        if (stats.saved >= maxSaveCount) {
            break; 
        }

        try {
            if (seenIds.has(tweet.rest_id)) { stats.duplicate++; continue; }
            seenIds.add(tweet.rest_id);

            const result = tweet.note_tweet?.note_tweet_results?.result || tweet;
            const legacy = tweet.legacy || {};
            const userResult = tweet.core?.user_results?.result;
            const userCore = userResult?.core; 
            const userLegacy = userResult?.legacy || userResult?.core || legacy?.user || {}; 

            const text = result.text || legacy.full_text;
            if (!text) { stats.skipped++; continue; }

            // User Info
            const userName = userCore?.name || userLegacy?.name || "Unknown User";
            const userHandle = userCore?.screen_name || userLegacy?.screen_name || "unknown";
            const userAvatar = userResult?.avatar?.image_url || userLegacy?.profile_image_url_https || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png";
            
            // Date
            let postedDate = new Date(legacy.created_at);
            if (isNaN(postedDate.getTime())) postedDate = new Date();

            // Metrics
            const metrics = {
                likes: legacy.favorite_count || 0,
                retweets: legacy.retweet_count || 0,
                replies: legacy.reply_count || 0,
                views: tweet.views?.count || 0
            };

            // Media
            let media = findMediaInTweet(tweet);
            media = media.filter((m, i, self) => i === self.findIndex((t) => t.url === m.url));

            const tweetDoc = {
                tweetId: tweet.rest_id,
                text: text,
                category: categoryLabel,
                metrics: metrics,
                author: { name: userName, handle: userHandle, avatar: userAvatar, verified: false },
                media: media,
                originalUrl: `https://twitter.com/${userHandle}/status/${tweet.rest_id}`,
                postedAt: postedDate,
                fetchedAt: new Date()
            };

            operations.push({
                updateOne: {
                    filter: { tweetId: tweetDoc.tweetId },
                    update: { $set: tweetDoc },
                    upsert: true
                }
            });
            stats.saved++;

        } catch (e) {
            stats.skipped++;
        }
    }

    if (operations.length > 0) {
        await GtmTweet.bulkWrite(operations);
        console.log(`   ✅ Saved ${stats.saved} tweets.`);
    } else {
        console.log(`   ⚠️ No tweets saved in this batch.`);
    }
}

// ==========================================
// 4. MAIN RUNNER
// ==========================================
async function runEngine() {
    console.log("🚀 STARTING GTM ENGINE (PHASE 1 ALL + PHASE 2 SINGLE)...");
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB.");

        // PHASE 1: KEYWORD SEARCHES (Save Everything Found)
        console.log("\n--- PHASE 1: CATEGORY SEARCH ---");
        for (const [cat, query] of Object.entries(CATEGORIES)) {
            console.log(`🔍 Searching: ${cat}...`);
            const data = await fetchFromApi('search-v3', {
                query: `${query} lang:en -filter:replies`,
                count: 40, 
                type: 'Latest' 
            });
            // Pass Infinity to save ALL valid tweets
            await processAndSave(data, cat, Infinity); 
            await sleep(2000); 
        }

        // PHASE 2: CREATOR HARVEST (Save Only 1 Per Creator)
        console.log("\n--- PHASE 2: CREATOR HARVEST ---");
        for (const handle of GTM_CREATORS) {
            console.log(`👤 Checking Creator: @${handle}...`);
            const data = await fetchFromApi('search-v3', {
                query: `from:${handle} -filter:replies`,
                count: 10, // Fetch 10 to ensure we find at least 1 valid one
                type: 'Latest'
            });
            // Pass 1 to stop after saving the first valid tweet
            await processAndSave(data, 'Expert Insight', 1); 
            await sleep(2000);
        }

        console.log("\n✅ ENGINE FINISHED. DATABASE UPDATED.");
        process.exit(0);

    } catch (error) {
        console.error("\n❌ FATAL ENGINE ERROR:", error);
        process.exit(1);
    }
}

runEngine();