---
layout: post
title: NDC Oslo 2018
image: img/maastricht.jpeg
author: [Thulani S. Chivandikwa]
date: 2018-12-29T00:00:00.000Z
tags: [conference]
draft: true
excerpt: ndc oslo 2018
---

I was fortunate to be able to attend this year's NDC Oslo in the heart of Norway at Spektrum. Overall I enjoyed the line up and prospect of socializing with attendies and the various companies that had stands available. I would like to share some of my experiences there with regards mainly to the talks I attended but also other interesting things that happened outside of the auditoriums.


## Key Note - A penny for every object -Mads Torgersen

Mads Torgersen, the lead designer for the C# language gave an interesting key note titled 'A penny for every object'. He spoke about the history of object oriented programming going through all the pioneer languages and how each had a unique take that infleunced the next generation of langauges and how this evolved over time. While I like most people I had chats to afterwards found some parts of the talk to be very denses, especially on code examples in various languages the talk had a great take away message. The message being that OOP has had a great 50 years so far and it is exciting to have to see what comes in the next 50 years. Mads emphasized that while functional languages are gaining more and more attention it may not be about which one is best but the best outcome would be for the two worlds to be able to work together. Mads sentiment on the topic of functional  programming considering the changes we have been seeing in C# over the last releases that highly embrace functional programming. Unless you are truly curios for details on key languages along the evolution timeline of OOP and some of the biggest regrets along the way there is not much else to get from this talk.

## Clean Architecture in .net core - Ian Cooper

While this promised to be a great presentation it fell through the floor for me in that this was a very opionated approach to Clean Architecture making use of Brighter. Don't get me wrong, not to say brighter is not a good library. The approach makes use of the Command approach with a command dispatcher for implementing ports. This further uses the 'Russian doll' model (using brighter library) to allow a pipeline of handlers to operate on a command. This is a very interesting approach and definetely has it's merits. Furthermore brighter implements:

* Task queues allowing for offloading and handling of requests asynchornously.
* CQRS

The brighter library source code is available on Github [here](https://github.com/BrighterCommand/Brighter).

At the end of the day Brighter pretty much achieves the same as most projects at Coolblue. There is a queue receiving messages with subscriber registries in place that route to a request handler registry in place to map messages to a specific request handler. The plumbing includes an IOC container, logging and Polly for retry and circuit breaker policies. This is all done in what appears to me to be a very opinionated and rigid approach in terms of the consuming. Going through the brighter documentation was still good as they definetely touch on the major things you need to deal with when working with Clean Architecture and CQRS for microservices albeit showing their approach to these problems. You can find the complete documentation [here](https://paramore.readthedocs.io/en/latest/).

## Monitoring A-Z - Steven Simpson

This talk about monitoring was a little 101 than I expected and explains why a third of the room walked out in the first half an hour. I however appreciated the refresher course this provide. There is not much new things to share on this topic as I find Coolblue to be very mature in this regard and there is continued improvement. These are some of the key things this talk touched on in case you are interested at seeing the talk:

*Monitoring and logging terminology
*Approches to monitoring and logging
** Local files
** External servers
** Use of databases
** Structured logging and searches

There are a few things that have been at the back of my head for months already that I want to actively pursue after this talk. Some team in Coolblue may already be a step ahead in this regard:

1. Clean up our monitors to remove annoying ones that no action is required and to fill any gaps. We have already started this process.
2. Introduce event based monitors to track events of interest. The first that we identified and are already looking into is around visibility into deployment statuses.
3. Standardize messages and add more useful tags. This includes messages in logs, monitors etc. This can make it easier to track an issue and to do post mortems over time.
Improved tags for instance can allow us to see which of our Tradepartners are down the most and note trends etc.
4. Introduce better visualizations both for our overview dashboard and for more detailed dashboards.
5. Introduce reusable relationship/correlation tools for tracking issues. Currently we have correlation ids that flow through our various systems but when an issue is being tracked
this involves manual searches over the required indexes. This can be greatly improved.
6. Address truncated logs in Splunk. We had been addressing this as we notice the issue. I would like us to have a better approach to track this down possibly via a query or even
be notified when a log is truncated. It is also best to have something in our patterns and practices on how to avoid this.
7. Get a better understanding of how metrics are collated/summarized in Datadog and how it affects the information we rely on. This is a grey area and I intend to work with the
deployment team to get information about this.
8. Currently the metrics we track are all from Datadog and we only use Splunk to deepdive into issues. However I feel there is a lot of power still in Splunk, there are a lot of
'metric like' dashboards that can be created in Splunk that can be useful. I intend to find out what other teams in Coolblue may already be doing in this regards.
9. Personally I feel I do not have the whole picture around data pushed into Datadog from instrumentation, scraping of our environment, AWS Cloudwatch, Team City and
Octopus events etc. I am not show if there are already artifacts in place somewhere to see what is available in Datadog for teams to use. Access to this information can further
streamline our processes and give teams more visibility and earlier discovery of issues. I have earmarked this again as something to ask the deployment team about.
10. Review monitors that Stock Management 1 should mark as SLO and start working on playbooks.

I am excited that there are a lot of things that I shall be researching further with the Stock Management 1 team to improve how we do monitoring and logging.

## The state of C#, what have I missed - Felip Ekberg

In this talk Felip went over the iteration of the C# language, looking at the key featues of each release. In his talk he also focuses on the C# 7.1, 7.2, 8.0 and beyond. For each release and feature there were code sample on show which you can find [here](https://github.com/fekberg/What-is-New-in-CSharp). I will not list the features that he spoke of as the are in the samples repo and public knowledge. If you have not yet seen upcoming features like Ranges, Nullable references, Tuple improvements, deconstruction and recursive patterns be show to have look at the C# 7.x to 8.0 specific samples. To track C# 8 feature statuses have a look [here](https://github.com/dotnet/roslyn/blob/main/docs/Language%20Feature%20Status.md).

Aside from langauge features Felip also talks about how the benefits of Microsoft having open sourced Rosylyn are really starting to show with the number of contributers and what it has meant to the development of the language.

Felip recently made his C# book, Smorgasbord free which you can find here [PDF](https://cdn.filipekberg.se/fekberg-blog/csharp-smorgasbord-free/Filip_Ekberg-CSharp_Smorgasbord.pdf)

## C# 8 - Jon Skeet and Mads Torgersen

As one would expect with Jon Skeet giving a talk this one had a full attendance with people sitting on the corridor steps. This talk was very reassuring in showing how the C# team is really becoming more pragmatic than dogmatic. It is worth noting that some of the features discussed in this talk may not actually make it to the official C# 8 release or may be modified.

### Nullable reference types

A very interesting feature I was looking forward to seeing was the nullable reference types. While I had read the proposed feature list I had not dug into the details and it was a pleasure to get the details first hand. For more details on this feature and the ability to install the preview head over [here](https://github.com/dotnet/csharplang/wiki/Nullable-Reference-Types-Preview). Because this feature introduces a breaking change, it would be rolled out with an opt in flag.

### Pattern matching

Pattern matching is getting new improvements to the switch statements extending on pattern matching released in C#7. This one warrants a details explanation, you can find details of the proposal [here](https://github.com/dotnet/roslyn/blob/main/docs/Language%20Feature%20Status.md).

### Ranges
A feature that will allow for writting of powerful slicing syntax on enumerables.
To track C#8 feature statuses have a look [here](https://github.com/dotnet/roslyn/blob/main/docs/Language%20Feature%20Status.md).

## Other cool things

While I probably was in an auditorium 90% of there time there was a talk going on I did try utilize all the time in between and when no talk interested me. There were a lot of booths up from various companies where you could go over and have a chat about new technologies and try out some of their prototypes. There were a lot of stands simply luiring people with challenges to play video games with possibility of winning a prize if you mantain high score. I felt really sad after this seeing how ridiculous my high scores where relative to others. FIFA 18 was offcourse there to the rescue as I managed to win all my attempts. The really fun part though was chatting with people and getting to know what they work with and what part of the conference they are really enjoying.

I was fortunate to bump into Jon Skeet in the corridors and continue a chuckle that I had started with him on Twitter about how choice of pants the previous day and boy where the ones on that day even worse! Don't believe me? See for yourself below. I did not get a chance to talk much with him as it was a few minutes before his talk, however it was great to meet the stackoverflow man in person.

![image](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/oslo-2018/1.jpg)

I waited eargerly to have a chat with Richard Campbell, the host of .NET Rocks after his presentation. He had given a talk about the history of .net and we had a follow up conversation on that. I was really intruged about his story telling abilities and how he manages to engage an audience after that talk and got to talk more about that. Looking forward to the publishing of his book on the same topic in year of so as he promised. As someone who has a great relationship with many of the key players at Microsoft, this book promises to have quite some interesting stories.

Another notable speaker I got to meet after talks where Venkat Subramaniam. Venkat is a professor at the University of Houston and author of the book [Rediscovering Javascript](https://pragprog.com/titles/ves6/rediscovering-javascript/). He had just given a talk title 'Javascript - The good parts'. I was very excited to see some of the new features in Javascript that really make it much better to work with and like C# many that further embrace functional approaches. What drew me to chat with Venkat however was to complement him for an engaging talk with an interestingly unique presentation style that adds more fine to the class Microsoft live demo approach and to request for his contact details. I intend to follow up with Venkat and know more about his presentation style and giving talks in general. Hint: I intend to also start giving talks soon, starting small.

## The really cool things...

To really make my trip complete I ensured that I used every opportunity outside of the NDC programme to see the city of Oslo. The weather was perfect and it really is a lovely city. It was a relief to see some mountains for a change after being in The Netherlands for 7 months. Oslo may just be learning a thing or two from Rotterdam architecture as there are a lot of interesting and new building up plus a whole project in place to redefine the city and particularly water fronts. Everything is a bit pricey out there but all worth the extra penny.