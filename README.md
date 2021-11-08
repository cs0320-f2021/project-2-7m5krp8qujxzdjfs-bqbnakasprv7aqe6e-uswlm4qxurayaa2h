# README
To build use:
`mvn package`

To run use:
`./run`

To start the server use:
`./run --gui [--port=<port>]`
***
## Project Details
**Project Name**: Project 2 - Screen Reader

**Team Members**: 
1. Sheridan Feucht (sfeucht)
2. Anna Swanson (aswanso2)
3. Olena Mursalova (omursalo) 

**Stakeholder**: Virgo
***
## Specifications
**1. How to use and run the screen reader?**
- Developers need to add `main.js` as a script in the head of their HTML document.
Users can:
- Users can then click the `Start Reading` button to have the screen reader read
the page from top to bottom.
- Users can click the `Stop Reading` button to have the screen reader stop reading
at any point.
- Users can press the left arrow key on their keyboard to have the screen reader go back
and reread the previous line.
- Users can press the right arrow key on their keyboard to have the screen reader skip
forward to the next line.
- Users can press the space key on their keyboard to pause or start reading.
- Users can press the enter key on their keyboard to click links, press buttons, 
and choose to input text in an interactive field.

**2. How does the screen reader navigate the DOM? Is this effective? How can this lead
to problems or confusion for users?**
- Our screen reader navigates the DOM top-down, meaning that larger elements containing multiple other
elements like divs and articles have to be silently skipped over in order to 
read paragraphs, links, headers, and buttons contained within them. We did our best to hide this layer of organization 
from the user operating the screen reader, so that to them, it just feels like they are stepping through the elements on 
the page that are currently visible. This is an issue that we grappled with throughout the development of this project,
but did our best to hide from the end user.

**3. What tests have we written? What do they test and why?**
- We have small test websites for all the elements required and some larger websites with lots of different elements.
These test the handlers we have for each element tag and ensure that the screen reader is correctly reading out each element.

**4. What should developers keep in mind when choosing how to structure their HTML?**
- We encourage simple layouts that feel intuitive to navigate using arrow keys, making more use of lists and simple paragraphs 
and minimizing the use of a lot of asides, toolbars, and extra floating elements that don't make as much sense when read out linearly.
- For richer data elements such as audio files, developers should provide captions or descriptive text to provide context and information 
for the user in the event that the element does not render.

**5. Which attributes should certain HTML elements always include?**
- We highly encourage developers to provide alt text for all of the images on their websites to make them more accessible
and make our screen reader more informative. 

**6. How should developers use semantic vs. non-semantic HTML?**
- Developers are encouraged to use semantic HTML because this will ensure that the most appropriate handler is
used. However, if they use non-semantic HTML, then the user will only be read out the inner text without any context.
***
## Additional Questions
**1. For whom did we design our screen reader? Whom did we not design it for?**
- Our screen reader is a base implementation that simply reads the text on the page or describes the elements on the page,
designed as a general-use implementation for people who have difficulty reading text on a screen, but perhaps have some
limited vision allowing them to discern different highlighted elements. Those who have a complete loss of vision might
find it difficult to use our screen reader, because it does use visual highlighting and buttons to start and stop reading.

**2. What special features did we choose to include, and how do they serve our
users? Which features did we choose to not include and why?**
- We chose to navigate the page using the arrow keys instead of allowing the user to start the screen reader by clicking
on some text. This seemed like the better option to ensure that the screen reader is only reading when the user wants.
Otherwise, the screen reader might skip to some text when the user accidentally clicks something or tries to copy/paste. 

**3. If we had more time, what additional research would we conduct to build
for our designated screen reader user?**
- We would conduct individual interviews with our stakeholders with varying needs to determine who we would want to focus
on and specifically what concerns they might have. As many users do not know what they want in the abstract, one thing we
could do would be to allow them to try using our demo and then observe/collect feedback from that concrete experience.

**4. How did we handle reading HTML elements in an efficient, accurate, and intuitive way?**
- We decided on a few different "classes" for different types of HTML elements. Some elements, like paragraphs and headers,
we thought would be most intuitively read as just their text, without specifying the type of tag. On the other hand, we 
felt it was important to announce that we were reading lists, links, and asides to prevent confusion (because otherwise,
we would have cases where the screenreader would suddenly start reading something that sounds completely unrelated). 

**5. What are some HTML edge cases that we accounted for, and how? Were there edge
cases we didn’t or couldn’t account for? Why?**
- In the case where we have an empty div or article tag, we were able to handle this by making our screen reader skip over
and not acknowledge these sorts of elements at all. 
- Edge cases such as broken links or corrupted audio files are something that would not be in the scope of this project
to deal with, since a sighted user would also have issues with interacting with that portion of the website.
