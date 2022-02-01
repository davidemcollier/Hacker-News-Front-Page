PROJECT: Redesign of Hacker News Front Page

FRAMEWORKS USED: Angular 8.3.8, Bootstrap 4.

Introduction:
Using the Hacker News API, I created a redesign of the front page using Bootstrap 4. 

APPLICATION:

	The front page of HN is populated with latest news stories, the ids of which can be retrieved from a call to the api (delivering an array of the ids) for which a further call may be done to retrieve the JSON news story objects containing elements to build the page:'title', 'by' (ie author) etc.

	When executed, the app generates the latest news stories and these are output to be displayed using the bootstrap framework. Stories are contained in cards and numbered according to most recent (1 being the latest story, for Best stories, 1 also being the Best). 

	The application feed is controlled by two nested observables in getFeed(): getStoriesIDs() and getEachStoryItem(). These output the final JSON object array displayed. Additional elements are added at this point in getFeed(): isExternalStory and isVideoLink to allow for template logic to format the cards appropriately according to story source and if a video may be embedded, respectively.  



STORIES:
	The API sets two story types: external site links and 'Ask HN' user postings. The former has been implemented so that on click a new tab is generated. 'Ask HN' stories only display the title text.

	VIDEOS:
		When identified, Youtube stories are embedded in the top of the card. 
To generate this, the setFeed() function identifies any url beginning with the string "https://www.youtube.com/", then amends it to allow for embedding (replacing "watch?v=" with "embed/") and then passing the url through a URL sanitiser so that it can be displayed (an extra step to overcome the inbuilt defence against nefarious JavaScript injections).

	MORE STORIES BUTTON:
		When clicked, 15 more stories are added to the display at a time. 

BOOTSTRAP:
	Added via CDN: links inserted into index.html.



DESIGN:

	COLOURING:
		While the original site is simple, I opted to retain the general colouring (black, orange, grey), albeit implemented differently. 

	BACKGROUND & BRAND LOGO:
		An image sourced online make the site look more authentically like the original branding (this logo looking a bit more updated and modern). Also used on the background to give patterned contrast to the Story cards overlaying. 

	STRUCTURE: 
		The stories are output in a masonry format on the screen, providing an interesting design feature allowing for the same font and an interesting pattern of card blocks. 
Hovering the mouse on the story cards adds a slight zoom transition, while hovering over the hyperlinked story titles will also turn them orange. 

TESTING: Though new to testing in Angular, I have attempted to add some tests directly to app.component.spec.ts, however, this has not achieved high code coverage. Further in discussed below. 



ACKNOWLEDGEMENTS OF ISSUES/OMISSIONS:
	STORY PRESENTATION:
		While the masonry output might be visually appealing, there is an issue with the display of stories being vertically output (see numbering of stories). With each 'View More Stories' click, an additional 15 stories are added to the page. These previous presentation is then dynamically reordered. Admittedly, this does not provide an optimal user experience as with each successive click of 'View More Stories', more and more stories will float to the top of the page (out of user view) and are likely to be skipped by the user for reading. 

	SERVICES:
		I encountered problems outsourcing the observable methods to a service which may be due to the nesting of the two subscription calls. This structuring may also create issues with data leaks. 

	TESTING:
		Additionally, not having implemented the services ideally as mentioned above, I struggled to identify a way of adding mock data to my testing (imaginably boosting the coverage significantly) as resources found online referred to replacing an API call via a service with a mock service containing the mock data.

	OTHER: 
		BOOTSTRAP MODAL:
			I attempted to present the text (the long-form user comment text) for the 'Ask HN:' story types in a pop-up modal (included in the Bootstrap framework) nested in the relevant card. This caused significant flickering when displayed on screen. Comments online suggest that this could be due to Bootstrap not working well with some features in Angular. Finally, this was omitted.

		HOSTNAME DISPLAY: 
			Hacker News includes hostnames of the source news sites beside each story. While I was able to implement gethostname() function to trim the urls to be displayed in a similar way on each card, errors did occur in attempting to retrieve a minority of hostnames. Due to this, this too was omitted.
			