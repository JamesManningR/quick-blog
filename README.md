# Quick Blog
I started this project after completing the [Web Developer Bootcamp] (https://www.udemy.com/course/the-web-developer-bootcamp/ "The Web Developer Bootcamp | Udemy") course on Udemy

I wanted to consolidate my learnings by creating a 'huge' project which was different to the yelp camp example, as well creating a functional app which I would still find useful.

## Objectives
* Create an app which I can use to track my progress while creating projects
* Experiment with UX design findings
* Develop an effective and somewhat safe user log in system
* Play with libraries which allow extended functionality
* Hope I have enough time to make the app look good

I almost completed all of these objectives but as you can see by the language in the last task,
I wasn't entirely confident about my ability to complete all of them.

I completed the first 4 and genuinely did use the app in the next smester of university to log my progress
with wrapping my head around blender.

##Inspiration
While at university, I had to maintain a blog which tracked my progress throughout the majority of my projects.
I understood this and did find it quite endeering when I would look back at the past few months of pitfalls and solutions
which finally led to the finished product.
I did have a problem with the method though.

I'd often find myself spending 3-4 hours of learning only to have to spend another hour or so logging my progress,
faffing with evidence or findings, creating diagrams and fighting with wordpresses layout tools to get my blogs to
look right. Often this would leave me frustrated, and worst of all, I left out a large amount of what I'd learned
and explained the majority of the blog post writting about the last hour of work (rather than the 2-3 hours before)

This is when I watched this scene in [The Social Network]("https://www.youtube.com/watch?v=BPazh2kDdvA")
I found the livejournal logs <https://kidsper.wordpress.com/2010/11/28/mark-zuckerbergs-livejournal-blog-post/> and really liked the format. It solves a lot of the problems that I had with the
blog system at the time. The timestamps genuinely give the posts some momentum and (surprise surprise) give a
sense of progress which allow me to see how quickly I'm learning.
I started by just sending myself facebook messeges and coppying the logs, but this was too manual. I have the skills
to make this easy as possible, so why don't I?

## Journey

So, the first 3 things that I needed.
* Automatic timestamps
* Single click copy cuntionality
* Post organisation

This was fairly easy, I essentailly did all of this stuff in a Webdev bootcamp for a different purpose,
a few bits of code here, a little change there. **Childs play**.


I thought it might be cool to pitch this kind of thing to the university. I mean, if I thought it was 
useful, then I'm sure someone else working on a project would

Next few objectives
* User log in system
* Project organisation

Again, not too hard, although introducing two new relational elements might be a little tricky, especially
when it comes to making sure that logs in the posts in the projects that the user who decided to delete their profile
are also deleted. **Moving right along...**


This project is starting to become quite interesting, maybe I should add some profile customisation, Everyone's websites
got a profile with a bio these days...

More objectives
* User customisation
* Profile pictures
* Bio

Simple enough, I'm glad I went for mongoDB in this case, the scalability and ability to add fields at whim is a godsend.
It's starting to luck a little cluttered and I need to fit this project to my degree (Media production) maybe some I should
take a break from functionality and do some UX design. People are telling me that I'm the only one who knows how to use
the system. **Indeed.**

Even More Objectives
* Get some user feedback
* Test the main functionality
* Look for ways to make the process seemless

Got some feedback and started looking at ways to improve the app. Must use the "Don't make me think" approach.
I used some animations and made the app more self explanitory, functionality worked pretty well, no major hiccups
so design is the main job now. At this point I made some JS & CSS modals. I didn't want to use bootstrap so this
took me a little longer than I'm used to, but now I know how to do it so I can say it was worthwhile. All I have
to do now is test, test, test **and we're all set**

This was an extract on the blog before I started using this app to write the posts.

**Anyway**, enjoy the project. I'm continuing to update it to make it look a little nicer and actually fix the ajax calls
(Maybe I'll remove jQuery since I no longer need it)
