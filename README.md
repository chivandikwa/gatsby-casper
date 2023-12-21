| Feature      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CI           | [![Netlify Status](https://api.netlify.com/api/v1/badges/77978775-9dcc-4470-9b7a-03549c2fcd6f/deploy-status)](https://app.netlify.com/sites/hardcore-wozniak-f0f942/deploys) [![CodeFactor](https://www.codefactor.io/repository/github/chivandikwa/gatsby-casper/badge)](https://www.codefactor.io/repository/github/chivandikwa/gatsby-casper/badge)                                                                                                                                                                                                                               |
| Bots         | [![Mergify Status](https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/chivandikwa/gatsby-casper)](https://mergify.io) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=chivandikwa/gatsby-casper)](https://dependabot.com)                                                                                                                                                                                                                                                                                                          |
| Repo Details | ![GitHub last commit](https://img.shields.io/github/last-commit/chivandikwa/gatsby-casper.svg?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/chivandikwa/gatsby-casper.svg?style=for-the-badge) ![GitHub top language](https://img.shields.io/github/languages/top/chivandikwa/gatsby-casper.svg?style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/chivandikwa/gatsby-casper.svg?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/chivandikwa/gatsby-casper.svg?style=for-the-badge) |
| Social       | ![Twitter Follow](https://img.shields.io/twitter/follow/thulanidotnet.svg?style=social) ![GitHub followers](https://img.shields.io/github/followers/chivandikwa.svg?style=social) ![GitHub stars](https://img.shields.io/github/stars/chivandikwa/gatsby-casper.svg?style=social) ![GitHub watchers](https://img.shields.io/github/watchers/chivandikwa/gatsby-casper.svg?style=social) ![GitHub forks](https://img.shields.io/github/forks/chivandikwa/gatsby-casper.svg?style=social)                                                                                              |
| Live Edit    | [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/chivandikwa/gatsby-casper)                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### [VISIT BLOG](http://www.drunkonmonads.com/)

This is the repository for my blog found [here](http://www.drunkonmonads.com/).

My blog is powered by [Gatsby](https://www.gatsbyjs.org/),a free and open source framework based on ReactGatsby is a free and open source framework based on React and by [Netlify](https://www.netlify.com/), everything you need to build fast, modern websites: continuous deployment, serverless functions, and so much more.

The blog is a customized version of the gatbsy-casper [template](https://gatsby-casper.netlify.com/https://gatsby-casper.netlify.com/) a port of [Casper](https://github.com/TryGhost/Casper) v2 a theme from [Ghost](https://ghost.org/) for [GatsbyJS](https://www.gatsbyjs.org/) using [TypeScript](https://www.typescriptlang.org/).

# gatsby-casper

This is a static blog generator and starter gatsby repo. A port of [Casper](https://github.com/TryGhost/Casper) v3 a theme from [Ghost](https://ghost.org/) for [GatsbyJS](https://www.gatsbyjs.org/) using [TypeScript](https://www.typescriptlang.org/).

## Getting Started

Clone the parent repo.

```
git clone https://github.com/scttcper/gatsby-casper.git --depth=1
```

Remove .git folder and setup a new one

```
rm -rf .git && git init
```

Edit website-config.ts with your website settings.
Either disable subscribe or setup a mailchimp list and add the form action and hidden field input name.

Now push to whatever repo you want!

```
npm install

# If you have issues with sharp, run the following command
npm install sharp
npm rebuild sharp --force

npm run dev
```

### Progress

- [x] emotion / component styles
- [x] home page
- [x] tag page
- [x] author page
- [x] blog page
  - [x] subscribe form - using [mailchimp](https://mailchimp.com)
  - [ ] full width images in markdown? - not sure if possible
  - [x] multiple post authors
- [x] 404 page
- [x] subscribe modal/overlay
- [x] rss feed (on production build)
- [ ] polish ✨
  - [x] meta tags
  - [x] page titles
  - [ ] pagination

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/scttcper/gatsby-casper)

## How to configure Google Analytics

Edit `gatsby-config.js` and add your tracking ID

```javascript
{
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // Here goes your tracking ID
      trackingId: 'UA-XXXX-Y',
      // Puts tracking script in the head instead of the body
      head: true,
      // IP anonymization for GDPR compliance
      anonymize: true,
      // Disable analytics for users with `Do Not Track` enabled
      respectDNT: true,
      // Avoids sending pageview hits from custom paths
      exclude: ['/preview/**'],
      // Specifies what percentage of users should be tracked
      sampleRate: 100,
      // Determines how often site speed tracking beacons will be sent
      siteSpeedSampleRate: 10,
    },
},
```

## How to edit your site title and description

Edit `gatsby-config.js` section `siteMetadata`

```javascript
 siteMetadata: {
    title: 'My awesome site name',
    description: 'This is a description for my site',
    siteUrl: 'https://mysite.com', // full path to blog - no ending slash
  },
```

## How to adjust pagination

In `gatsby-node.js`, edit the `postsPerPage` constant. The default value is
six posts per page.
