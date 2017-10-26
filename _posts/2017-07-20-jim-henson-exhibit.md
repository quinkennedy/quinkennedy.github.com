---
layout: post
title:  "Jim Henson Exhibit"
date:   2017-07-20 12:00:00
categories: work
brief: "An exhibition for the Museum of the Moving Image which incorporates two interactive touch points."
cover: muppets.jpg
top_image: /images/1140/muppets.jpg
other_images:
  - /images/720/muppets_a.jpg
tags: [Node.js, Javascript]
role: Software Architect
links:
  - copy: Permanent exhibit site
    link: http://www.movingimage.us/exhibitions/2017/07/22/detail/the-jim-henson-exhibition/
  - copy: NY Times (press)
    link: https://www.nytimes.com/2017/07/19/arts/design/jim-henson-muppets-puppeteer-museum-of-moving-image.html
---
The exhibit explores Jim Henson’s groundbreaking work for film and television and his transformative impact on culture. It features a broad range of objects from throughout his remarkable career including material from Henson’s experimental film projects and his early work. Interactive experiences allow visitors to try their hand at puppeteering on screen and designing a puppet character.
<br /><br />

#### My Role & Responsibilities
I was the system architect and backend programmer for the interactive touch points.

We wanted a simple framework that would manage transitions between screens, pull in configurations through nested scopes, and connect to a larger event system for communicating between sub-systems. I developed a full-stack web framework that rewards a shared logical structure and visual language.

The client wanted museum guests to be able to record and send themselves videos and images from the touch points. I built a backend server that asynchronously downloads content from the individual computers running the interactives, and then queues messages to be sent to e-mail, Tumblr, and Facebook.
<br /><br />

#### Collaborators
* [Museum of the Moving Image][momi]
* [Collins][c]

[momi]: http://www.movingimage.us/
[c]: https://www.wearecollins.com/
