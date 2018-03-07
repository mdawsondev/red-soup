// IMPORTS
const fetch    = require('node-fetch'),
      settings = require('./settings');

// CONFIGURATION
const general  = settings.general,
      standard = general.useStandard;
      search   = standard ? settings.standard : settings.custom,
      subs     = search.subs,
      regEx    = search.regEx;

// SPEED VARIABLES
const refreshMS = general.refreshMS,
      limit     = general.postLimit;

// INIT PROGRAM
(function () {
  setInterval(() => { getData() }, refreshMS);
})();

// HARVEST DATA
function getData() {
  fetch(`https://reddit.com/r/${subs}/comments.json?limit=${limit}`)
    .then(res => res.json())
    .then(json => processData(json.data));
};

// PROCESS DATA
function processData(json) {
  const allPosts = json.children;
  for (let i = limit-1; i >= 0 ; i--) {
    const post      = allPosts[i].data,
          postMatch = post.body.match(regEx),
          link      = postMatch ? postMatch.input.match('http') : true;

    if (!link) {
      const author  = addColor(post.author, 91),
          permalink = addColor(post.permalink, 90),
          phrase    = postMatch[0],
          context   = postMatch.input.replace(phrase, addColor(phrase, 32)),
          subreddit = addColor(post.subreddit_name_prefixed, 91);

      console.log(`${addColor(phrase, 92)}|${subreddit}|${author}\n${permalink}\n${context}\n`);
    }
  };
};

// COLOR STRINGS
function addColor(words, color) {
  const useColor = general.useColor;
  return useColor ? `\x1b[${color}m${words}\x1b[0m` : words;
}