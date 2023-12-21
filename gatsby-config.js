/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Drunk on Monads: Great place to navigate the dev landscape',
    description: 'Explore insightful and practical guides on software development and industry best practices. Join me for engaging and informative content tailored for you!',
    siteUrl: 'http://www.drunkonmonads.com/',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml.name',
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
    'gatsby-plugin-image',
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
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [
            "Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';",
            "X-Frame-Options: DENY",
            "X-Content-Type-Options: nosniff",
            "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
            "X-XSS-Protection: 1; mode=block",
            "Referrer-Policy: no-referrer-when-downgrade",
            "Content-Security-Policy: default-src 'none'; script-src 'self' https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; img-src 'self' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
            "Permissions-Policy: geolocation=(), microphone=()",
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.drunkonmonads.com',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`,
                guid: `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })),
            query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { draft: { ne: true } } }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Drunk on Monads RSS Feed',
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-JXKC1BH4DB'],
        pluginConfig: {
        // Puts tracking script in the head instead of the body
        head: true,
          // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
          // exclude: [],
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
        },
      },
    },
  ],
};
