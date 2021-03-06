/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Thulani S. Chivandikwa',
    description: 'software development banter!',
    siteUrl: 'http://www.drunkonmonads.com/', // full path to blog - no ending slash
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    {
      resolve: 'gatsby-remark-embed-gist',
      options: {
        // Optional:

        // the github handler whose gists are to be accessed
        username: 'chivandikwa',

        // a flag indicating whether the github default gist css should be included or not
        // default: true
        includeDefaultCss: true,
      },
    },
    {
      resolve: 'gatsby-remark-emojis',
      options: {
        // Deactivate the plugin globally (default: true)
        active: true,
        // Add a custom css class
        class: 'emoji-icon',
        // Select the size (available size: 16, 24, 32, 64)
        size: 64,
        // Add custom styles
        styles: {
          display: 'inline',
          margin: '0',
          'margin-top': '1px',
          position: 'relative',
          top: '5px',
          width: '25px',
        },
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 100,
        stripMetadata: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'src', 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: 'Dark+ (default dark)', // Or install your favorite theme from GitHub
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-abbr',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              quality: 100,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-casper.netlify.com',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
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
  ],
};
