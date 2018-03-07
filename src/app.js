// IMPORTS
const fetch    = require('node-fetch'),
      settings = require('./settings');

// CONFIGURATION
const general  = settings.general,
      standard = general.useStandard;
      search   = standard ? settings.standard : settings.custom,
      subs     = search.subs,
      regEx    = search.regEx,
      isDev    = general.devMode;

// SPEED VARIABLES
const cleanMS   = general.cleanMS,
      refreshMS = general.refreshMS,
      limit     = general.postLimit;

// STORAGE
let cache = new Set();

// INIT PROGRAM
(function () {
  setInterval(() => { getData() }, refreshMS);
  setInterval(() => { cleanCache() }, cleanMS);
})();

// HARVEST DATA
function getData() {
  fetch(`https://reddit.com/r/${subs}/comments.json?limit=${limit}`)
    .then(res => res.json())
    .then(json => processData(json.data));
};

// PROCESS DATA
function processData(json) {
  const allPosts  = json.children;
  let newOutput = true;

  for (let i = limit-1; i >= 0 ; i--) {
    const post      = allPosts[i].data,
          postMatch = post.body.match(regEx),
          link      = postMatch ? postMatch.input.match('http') : true,
          postID    = post.id;

    if (isDev && cache.has(postID)) console.info(`${postID} already shown!`);
    if (!link && !cache.has(postID)) {
      const author  = addColor(post.author, 91),
            permalink = addColor(post.permalink, 90),
            phrase    = postMatch[0],
            context   = postMatch.input.replace(phrase, addColor(phrase, 32)),
            subreddit = addColor(post.subreddit_name_prefixed, 91);

      cache.add(postID);

      if (newOutput) (console.log(addColor(' --> New', 33)), newOutput = false);  
      console.log(`${addColor(phrase, 92)}|${subreddit}|${author}\n${permalink}\n${context}\n`);
    }
  };
};

// COLOR STRINGS
function addColor(words, color) {
  const useColor = general.useColor;
  return useColor ? `\x1b[${color}m${words}\x1b[0m` : words;
}

// CLEAN CACHE
function cleanCache() {
  if (isDev) console.info("Checking cache!")
  if (cache.size > limit) cache.clear();
}