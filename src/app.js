// IMPORTS
const fetch    = require('node-fetch'),
      settings = require('./settings');

// CONFIGURATION
const general   = settings.general,
      standard  = general.useStandard;
      search    = standard ? settings.standard : settings.custom,
      subs      = search.subs,
      regEx     = search.regEx;

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
    const post       = allPosts[i].data,
          postMatch  = post.body.match(regEx),
          link       = postMatch ? postMatch.input.match('http') : true;

    if (!link) {
      const author    = post.author,
            context   = postMatch.input,
            permalink = post.permalink,
            phrase    = postMatch[0],
            subreddit = post.subreddit_name_prefixed;

      console.log(`[ ${phrase} @ ${subreddit}] (${author}) -- ${context}`);
    }
  };
};
