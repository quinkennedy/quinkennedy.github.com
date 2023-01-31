---
layout: post
title:  "Cultural Institute"
date:   2013-12-10 12:00:00
priority: 9
categories: work
brief: "An exhibition space featuring a lounge, atelier, and large, gesture-controlled, media wall driven by 12-computers. Our software was designed to display assets and exhibits from the Google Cultural Institute's collection."
cover: gci.jpg
top_image: /images/1140/gci.jpg
other_images: [/images/other/gci4.jpg, /images/other/GCI-2.gif, /images/other/gci2.jpg, /images/other/gci3.jpg]
tags: [Javascript, WebGL, three.js, permanent, browser, Java, Python, Chrome, Android, Processing, openFrameworks, OSX]
---
The LAB at Rockwell Group worked with the Google Cultural Institute to design and develop their exhibition space in Paris, France. This was two stories of an entire wing of their building, which ended up containing a lounge, atelier, and double-height exhibition and presentation area featuring a large-scale media wall. The media wall composed of forty-eight 80&quot; displays, and is driven by twelve computers with a combined resolution of 11520 x 2160. 

I led final development of an app that translated their web exhibit experience to the media wall. Google is interested in showcasing their products where possible, so the entire front-end runs in Google Chrome. In order to increase performance and maintain sync between computers, we needed to do all rendering in WebGL even though it was only flat images.

I also assisted with development of an Android app used to control content on the wall. The app was designed to allow presenters to select exhibits, scroll through them, and highlight individual sections within exhibits. These actions are translated to the media wall so the media wall becomes a presentation medium focused around the Cultural Institute exhibits.

After installation, I was the main developer for updating the software as Google updated their internal APIs or requested additional features.

I worked as a Developer on this project:

* Managing and integrating backend deployment and communication infrastructure
* Porting the web experience to work across the 12 computers driving the media wall
* Collaborating on an Android controller
* Troubleshooting latency and sync issues
* On-site installation
* Managing post-install maintenance and feature requests
