# 🍲 Red Soup

*Reddit: Scoop Out User Posts!*

Red Soup is a comment scraper that plucks out keywords from comments in selected subreddits. Right now the functionality is minimal, but pulls what it's asked to pull. Users can customize their choices in the settings file.

## 🍲 Guide

### Installing

At the moment, Red Soup requires you to have NodeJS and npm. Clone the repo, run `npm install`, and then start the program with default settings by running `npm start`. You can change the variables in `settings.js` to suit your needs. Exit with `Ctrl + C` twice.

### Settings

* cleanMS - (0-Infinity) Number of MS to clear the cache (1000 = 1 Second | 30000 recommended).
* devMode - (true|false) Output development data (not recommended).
* postLimit - (0-100) Number of posts to show.
* refreshMS - (0-Infinity) Number of MS to show new posts (1000 = 1 Second).
* useColor - (true|false) Display colors in output (recommended).
* useStandard - (true|false) Switch between "standard" and "custom" settings.

### Examples

*Note: `/\w+/i` is a [regular expression](https://regexr.com/) search; the `i` indicates case-insensitive searching.*

###### Find the word "adorable" in comments from r/aww, r/blep, and r/sploot.

```JS
  custom: {
    'subs': 'aww+blep+sploot',
    'regEx': /adorable/i
  }
```

###### Find the words "sorry, but" in r/all.

```JS
  custom: {
    'subs': 'all',
    'regEx': /(sorry(,?) but/i
  }
```

## 🍲 Plans

* More scraping features.
* More modular engine.
* Explore GUI possibilities.
