import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

function About() {
  return (
    <IndexLayout>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <h5>
                    A blog about technology, software engineering, and other interesting things.
                  </h5>
                  <p>Welcome to my blog, where innovation meets expertise in the vibrant world of software development. My journey is one marked by a relentless pursuit of cool and innovative solutions, guided by the principles of design and agility.</p>

                  <p>I am a passionate software developer with a special focus on the .NET Stack, complemented by a rich exposure to a variety of technologies and methodologies. My technical prowess is seamlessly integrated with outstanding communication skills, enabling me to thrive in collaborative environments and contribute effectively to my team's success.</p>

                  <p>Currently, I am delving deep into the realms of Python and .NET Core, leveraging the power of Docker and Kubernetes (K8s) to create impactful solutions. I'm also exploring the fascinating world of F# and Haskell, expanding my horizons in functional programming.</p>

                  <p>In my role as a Technical Lead, I am fortunate to work with an amazing team in the Fintech space. My experience spans a diverse range of technologies, including but not limited to:</p>

                  <ul>
                    <li>.NET 8, ASP.NET WEB API, C# 12, EF Core, AutoMapper, Fluent Validation, xUnit, and many more.</li>
                    <li>Front-end technologies like React Native and TypeScript, along with tools like Redux and SignalR.</li>
                    <li>DevOps tooling such as Azure DevOps, Jenkins, Team City, Octopus and more</li>
                    <li>Other tooling such as Visual Studio, Visual Studio Code, Postman, Chocolatey, Structurizr, NSwag.</li>
                    <li>A variety of testing and mocking frameworks to ensure robust and reliable software.</li>
                  </ul>

                  <p>I believe in continuous learning and sharing knowledge, so feel free to ask me about Functional Programming, Python, .NET Core, or any of the numerous technologies I work with.</p>

                  <p>Outside of work, I indulge in my love for photography and embark on spontaneous road trips, seeking new perspectives and experiences.</p>

                  <p>Join me on this blog as I share insights, experiences, and lessons from my journey in software development, where every challenge is an opportunity to learn, grow, and innovate. Let's explore the endless possibilities together!</p>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export default About;
