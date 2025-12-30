const mongoose = require('mongoose');

const GtmTweetSchema = new mongoose.Schema({
  tweetId: { 
    type: String, 
    required: true, 
    unique: true // 🛑 ENSURES NO DUPLICATES
  },
  text: { type: String, required: true },
  category: { type: String, default: 'Strategy' },
  
  // Author Details
  author: {
    name: String,
    handle: String,
    avatar: String,
    verified: Boolean
  },

  // Engagement Metrics
  metrics: {
    likes: Number,
    retweets: Number,
    replies: Number,
    views: Number
  },

  // Media (Images/Videos)
  media: [{
    type: { type: String }, // 'photo' or 'video'
    url: String,
    width: Number,
    height: Number
  }],

  originalUrl: String,
  
  // 🕒 TIME CONTROL
  postedAt: { type: Date, required: true }, // When it was posted on Twitter
  fetchedAt: { type: Date, default: Date.now } // When we saved it
});

// 🔥 THE MAGIC: Auto-delete documents 3 days (259200 seconds) after 'postedAt'
GtmTweetSchema.index({ postedAt: 1 }, { expireAfterSeconds: 259200 });

module.exports = mongoose.model('GtmTweet', GtmTweetSchema);