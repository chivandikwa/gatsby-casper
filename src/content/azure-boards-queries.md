---
layout: post
title: Useful Azure DevOps Boards queries
image: img/unsplash/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [azure devops boards, queries, sprint planning]
draft: false
excerpt: A collection of some useful Azure DevOps Boards queries.
---

Photo by <a href="https://unsplash.com/@dawson2406?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Stephen Dawson</a> on <a href="https://unsplash.com/photos/turned-on-monitoring-screen-qwtCeJ5cLYs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


# Useful Azure DevOps Boards Queries

A collection of some useful Azure DevOps Boards queries.

# Grooming queries

You will likely want to update the filters on these query to suite your needs, for example by filtering on specific work item types, state etc. What is saved and shown here are just the barebone queries.

**View unparented items**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/1.jpg)

**View bugs parented under user stories/epics**

⚠️This is a violation of the expected Epic -> Feature -> User story/Bug -> Task hierarchy

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/2.jpg)

**View all work items in the current iteration**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/3.jpg)
You can also time travel across multiple iteration by adding `+/- count` in front of the `@CurrentIteration`


**View active work that is not assigned to the sprint**

This would likely indicate some previous work that has not been updated or has potentially fallen through the cracks.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/4.jpg)

**View work items logged in the last x day**s

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/5.jpg)

**View ill defined work items**

The default looks at items with no descriptions, or not acceptance criteria or no story points.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/6.jpg)

**View work items pending review**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/7.jpg)

**View unestimated work items**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/8.jpg)

**View blocked work items**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/9.jpg)

**View work items that may need to be broken down**
This is determined by high estimates and you can decide on the threshold.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/10.jpg)

**View stale work items**
You can decide on the time period for this to be considered stale.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/11.jpg)

**View unassigned items in the current iteration**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/12.jpg)

**View work items that are due soon**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/13.jpg)

**View overdue work items**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/14.jpg)


# Other queries

**View items assigned to me**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/15.jpg)

**View items that I am following**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/16.jpg)

**View items where I have recently been mentioned**

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/17.jpg)

Instead of constantly querying the grooming type queries, you can [assign them to a dashboard as charts ](https://learn.microsoft.com/en-us/azure/devops/report/dashboards/add-charts-to-dashboard?view=azure-devops#add-a-work-item-query-or-chart) or as tile widgets so you always have a good view.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/18.jpg)


💡 In addition to placing charts and other visualization on a dashboard, you can only place these on the query itself. For example you can create a [pivot table](https://learn.microsoft.com/en-us/azure/devops/report/dashboards/configure-chart-work-items-widget?view=azure-devops)) to visualize the data from the query.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/clean/boards/19.jpg)
Here are recommendations of some great things to visualize
- Bug trends over time
- Task burn down
- Test case pass/fail rate
## Additional tips for working with queries

- Utilize the predefined variables like `@Me`, `@Today`, `@CurrentIterations` etc to your advantage.
- Use tags wisely. These can help filter work items, but if used without disciple they can go out of hand fast. As a general rule, if you have no use case to query by a given tag, you should not be using it. This will keep your tags list clean.