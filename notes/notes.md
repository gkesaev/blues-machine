Code samples and screenshots are subject to copyright by Serge Krul, please get permission prior to any use or distribution.
# Lesson 1
[Course Overview](https://docs.google.com/presentation/d/1ECAbfpReLg_TPvc1CTlVv4Lk_TKhwGDRo8ZdzEalixA/edit)

browser can identify themselves while getting files from server, it is a bad practice to use that info. there are better ways to check what is the functionality of a curtain browser (via javascript)

To go down one line of text there is no need to use <br> tag, instead use "enter" and  comment between the lines to reduce the distance between the lines.

```
<h1> tags ... </h1>
<p> tags..    </p>

<a href="google">Link text</a>          inline element
<a href="mailto:mail@domain.where">Say person name</a> inline element

<img src="link to image" alt="hover text">
```
better to download images the right size(resolution) good for big screens, better quality, and also good for small screen, no need to pay for traffic

What to fill in alt tag?
answer the following question: If the image has importance to the page, fill it otherwise leave it empty

websites for html tag info:
  - [htmlreference.io](https://htmlreference.io) only html5
  - [devdocs.io](https://devdocs.io) -- good for all technologies

### How to choose the right tag?
header is header, button is button... CSS is in charge of styling not, html tags.

```
<!DOCTYPE HTML>  defines document type, this is the current modern version

<html lang="en">  for example chrome can suggest a translation according to this gag

<head>   we don't see it
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page title, tab title</title>
<body>
```
in VSCODE open new html file and type "!" then press "TAB" to get autocomplete

http is communication protocol

protocol user info
  |         |
http://user:password@www.example.com:80/search?q=term&lang=en#results

```
$ npm install -g http-server  (-g global for all users)

$ http-server
```
OR

install Live Server addon to VSCode and run it with command:
ctrl + shift + p :> live server

back to styles:
to define styling use
```
<style>
  body {
    font-family: sans-serif;
  }
  h1 {
    color: red;
  }
  a {
    display: block;
    margin-bottom: 1em;
    color: white;
    text-decoration: none;
    padding: 10px;
    max-width: 210px
  }
</style>
```

there is almost no need to ever use  ```<br>```

+ ```display: inline-block;``` vs ```block```

in chrome to change values, for example CSS width, <dl><kbd>Shift</kbd> + <kbd>↓</kbd> / <kbd>↑</kbd></dl> or
<dl><kbd>Alt</kbd> + <kbd>↓</kbd> / <kbd>↑</kbd></dl> for decimals

to remove space between to inline elements one can comment out the space in html code

# Lesson 2
### [(same presentation)](https://docs.google.com/presentation/d/145-UtJlO7TihbODxoBURNBbeUoYQ6kgKxuS_0-2xqGE/edit#slide=id.p)

Nowadays we should always check our website on a mobile
to give optimal viewing experience we should _instruct_ browser to display based on mobile screen size (and not widescreen + zoom out)
```
<meta name="viewport" content="width=device-width">
```

we should take into account image quality when dealing with mobile screens, for example retina display has a lot of pixels, so we need to adjust an image of right size.

to test website on a mobile device it is suggested to use Live Server on the same LAN network.

to get css into a separate file:
```<link rel="stylesheet" href="main.css">```
another way to change style is inline: ```<h1 style="color: orange;">Hey</h1>```, better not to use it

browser has to decide on the specificity and inline css is very high/important in that order, so better not to use it.

## UI Foundation - HTML
### (new presentation)

good HTML
make sure that:
1. Cross browser
2. Cross platform
3. accessible
4. SEO friendly (search engines)
5. Dev friendly
6. Future friendly

good page design starts from HTML, from big to small

page level semantics: header, footer, "under header", mid section, highlights
separate components by context
smaller components include menu in header, links in footer...

Process of separating ui into subparts called Atomic Design

"we are not designing pages, we're designing systems"   -- Stephen Hay

html5docotor.com/downloads/h5d-sectioning-flowchart.pdf

screen reader can create a document outline when heading (h1-h6) used, which provides a better UX for screen reader
So provide relevant heading and tags.
Headers size is important in html tree

to test accessability: wave.webaim.org

headers and footers can include headers and footers of their own.

```<nav>``` suits navigation links
```<article>``` can be standalone

text level semantics:
```h1,h2... , p```
```<ul><li>```
li - list item
ul - unordered list
ol - ordered list

```<small>``` - "small text"

## additional tags

example ```class="external"```
search engines and screen readers do not "care" of classes

### class names
how to name them?

```class="Link--external"```
so naming convention will add details along the name

So why use conventions:
- Clear intent
- Easier targeting in CSS
- Higher maintainability
-  --//-- scalability
-  --//-- usability

Our name convention is called [Suits](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
another one more used is Bam
examples:
```
<style>
  .MyComponent {}
  .MyComponent.is-animating {}
  .MyComponent--modifier {}

  .MyComponent-part {}
  .MyComponent-anotherPart {}
<style>

<body>
  <h1 class="MyComponent MyComponent-part">Some Heading</h1>
</body>
```

state classes such as ```.is-active{}``` should never change global styling, because they are mostly used in some
specific cases and once changed should not interact with whole page.

Example from their help.md
```
<article class="Tweet">
  <header class="Tweet-header">
    <img class="Tweet-avatar" src="{{src}}" alt="{{alt}}">
    …
  </header>
  <div class="Tweet-bodyText">
    …
  </div>
</article>
```
Media blocks can be organized in advance in CSS and the only rearrange HTML

Class names should describe design and not content
[suggested reading](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)


# Lesson 3
### [UI Foundation - CSS](https://docs.google.com/presentation/d/16g85f7JqSw2PnWduqbvj19dU-H-eWuSYPtRmPUw8Hbg/edit#slide=id.p)

```
h1                        {}  /* <h1>...</h1> */
.Button                   {}  /* <* class="Button">...</*> */
button.Button             {}  /* <button class="Button">...</button> */
.Button.Button--primary   {}  /* <* class="Button Button--primary">...</*> */
a[href$=".org"]           {}  /* <a href="https://wordpress.org/">...</a>*/
#input-5572               {}  /* <* id="input-5572">...</*> */    /* not suggested to use */
```
##### More Selectors:
+ Descendant selector
```
/*
 <div>
   <span></span>    <!-- this one -->
   <p>
     <span></span>  <!-- this one -->
   </p>
 </div>
*/
div span  {}

```
+ Child selector
```
/*
 <div>
   <span></span>   <!-- this one -->
   <p>
     <span></span>  <!-- but NOT this one -->
   </p>
 </div>
*/
div > span  {}
```
+ Adjacent selector
choose tr only next to another tr, example use: zebra slice a table
```
/*
 <table>
   <tr></tr>
   <tr></tr>    <!-- this one -->
   <tr></tr>
   <tr></tr>    <!-- this one -->
 </table>
*/
tr + tr  {}
```

+ Nth-child selector
```
/*
 <table>
   <tr></tr>    <!-- this one -->
   <tr></tr>
   <tr></tr>    <!-- this one -->
   <tr></tr>
   <tr></tr>    <!-- this one -->
 </table>
*/
tr:nth-child(2n+1) {}
```
also:
```
:first/:last-child
:odd/even
```

+ General Sibling
```
/*
 <p></p>
 <ul></ul>
 <button></button>    <!-- this one -->
 <button></button>    <!-- this one -->
*/
p ~ button {}
```

A game to train on CSS: [CSS Diner](https://flukeout.github.io/)

We would lie to keep specificity low: [Specificity calculator](https://specificity.keegan.st/)

CSS - cascading style sheets

to check inheritance go to slides or web
to check which properties are inherited go to [devdocs.io](http://devdocs.io/)

every(maybe not every) element has initial value, it is used like this: ``` h1 { color: initial;}```

sometimes we want for element to inherit new property and not to use initial, then theres is ```inherit``` option.

__Style branches not leaves__

Use dynamic values such as currentColor and ems

Suggested reading [Simurai’s Blog](http://simurai.com/blog/2015/09/09/back-to-the-roots)

Web design is content driven

Default font size in most browsers is 16px
Users can edit this setting in browser.

Pixel is dependent on the screen size and specific ot this screen size. Once font size is set in pixels user cannot edit its size in the browser settings (he can scale it up ctrl + "+", but font size changes in settings wont effect it)

1em = 16px, 2em = 32px...
so em is calculated from the default browser font size, very good for accessibility

ems have side effects, they calculated in consideration of inherited em size, so span in span will lead to bigger(smaller) font.

to solve this there is Rem (or root em)

Method for sizing fonts:
Sizing fonts:

  - Base font size set on root element .type-sizeBase (in em/rem)
  - Create a global size scale (e.g. .type-size1, type-size2, …) set in rem
  - Font sizes inside components should be styled with em to maintain components scope and allow to adjust component proportionally
Sizing space:
  - Space should (most of the time) depend of font-size, hence use ems for margins, paddings, radius, etc.

For example for button styling it is preferable to use em and not rem, because it will take the base value from root.

Each class defines something specific, i.e. class that define background wont define font as well.

It is a good idea to create custom attribute instead of writing a bunch of classes
so for example
```
<a am-Button class="reset-link border-size" href="/">
```
instead of
```
<a class="Button red-button reset-link border-size..." href="/">
```
currently there is no way to composite CSS classes into one class only in CSS

to address a custom attribute in css use square brackets:
```
[am-Button]{ }
```

### variables in CSS
- definition
  ```
  :root {
    --c-blue: navy;
  }
  ```
- usage
  ```
  .theme-dark[c-Page] {
    background-color: var(--c-blue);
  }
  ```
it is a good idea to put root in a different file and from there to config all the settings of the page.

so this is how folder tree should look like:
```
  index.css
  config.css
  /styles:
    /utils
      type.css
      space.css
    /base
    /components
      button.css
    /themes
      light.css
```
# Lesson 4
### [Responsive Foundation](https://docs.google.com/presentation/d/1QteFD0h7wOkdpMOu_XES_EsJXCpitTqGWfIMjSyIQFA/edit#slide=id.p)

Remember HTML is responsive by itself, and if it is not --> you ruined it.

There are 2 ways to display elements:
```
p {
  display: inline;
}

a {
  display: block;
}
```

Units to measure sizes of elements:
- px
- %
- em/rem

calculation example using CSS vars:
```
.Button {
   display: inline-block;
   padding: calc(var(--space)/2) var(--space);
}
```

#### box model
<pre>
      margin
-----border------
|   padding     |
|   *content*   |
|_______________|
</pre>

Initial value of blocks is: ```{ width: auto;}```

It is a good idea to calc the size of an element as a dependence of font size.

###### Why use Ems:
- Design looks good since the space around content is proportional to the letter size for each element automatically
- Spacing adjusts automatically when font-size is changed at a higher level (e.g. page scope or component scope)

It is a good idea to use **one** variable for all spaces:
```
:root {
  --space: 1em;
}
body {
  padding: var(--space);
}
h1 {
  margin: calc(var(--space)/2) 0;
}

```

Setting a "break point"
defining the size according to scree size:
```
/* Mobile-first breakpoint */
@media (min-width: 1000px) {
  html {
    font-size: 1.5rem;
  }
}
```

### Use em’s for breakpoint sizes!

[100% correct way to do breakpoints](https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862)
or [local](/materials/breakpoints.png)


### How dow we put elements side by side
CSS has 5 layout modes:
- normal flow (up until now in lectures)
- grid
- flexbox
- absolute positioning
- floats

Layout Modes Usage Cascade

- Start with a Normal Flow foundation (like we did in this class)
- Use Grid for page-scope / large-scale layout
- Use Flexbox for laying out items within a container
- Use Positioning for laying out layered elements like modal dialogs, dropdown menus, tooltips, etc. that shouldn’t affect the position/layout of all other elements in the page.
- Use Floats to float text around a media block.

grid is 2-dimensional most suitable for big elements
inside a grid one should use flexbox, works in one axis
positioning provides 3 axis (depth), used for example for menu, when you open a menu it doesn't move the rest of the page, or pop ups, chats...
floats are mostly used to fix a text around an image

layout is a design feature.

##### side note, one could check if browser supports feature like this:
```@supports (display: grid)```

grid example code:
```
@supports (display: grid) {
   @media (min-width: 62em) {
       .Page {
           display: grid;
           grid-template-areas:
               "header header"
               "main aside";
           grid-template-rows: 20% 1fr;
           grid-template-columns: 80% 1fr;
           grid-gap: var(--space);        /* we touched on space variable before */
       }

       .Page-header    { grid-area: header; }
       .Page-main      { grid-area: main; }
       .Page-aside     { grid-area: aside; }
   }
/*___________________________________________________*/

   @media (min-width: 1000px){
     .Products {
       grid-template-columns: repeat(2, 1fr)
     }
   }

   @media (min-width: 1200px){
     .Products {
       grid-template-columns: repeat(3, 1fr)
     }
   }
}
```
the nex two line of code are identical
```grid-template-columns: 1fr 1fr;```
```grid-template-columns: repeat(2, 1fr;)```
game links to learn grids:
- [https://cssgridgarden.com/](https://cssgridgarden.com/)
- [https://learncssgrid.com/](https://learncssgrid.com/)
- [http://flexboxfroggy.com/](http://flexboxfroggy.com/)

a lot of tricks and tips in the [video](https://www.youtube.com/watch?v=4pbYJq4eBoI&feature=em-share_video_user) (only visible to allowed users)

[CodePen](https://codepen.io/sergelerner/full/jEWmbE/)

# Lesson 5
### [Interaction with JS](https://docs.google.com/presentation/d/1QteFD0h7wOkdpMOu_XES_EsJXCpitTqGWfIMjSyIQFA/edit#slide=id.p)

javascript is interpreted language, in modern browsers there is addition of JIT (just in time) compilation of curtain parts of the code, as well as other optimizations.

Javascript can access the page, and it can change the page.

```
document.querySelector('h1').style.color = 'red';
document.querySelector('p').textContent = `I was here at ${new Date()}`;
document.querySelector('a').style.fontSize = `${Math.max(16, 18)}px`;
```

Dynamic strings are only available in newer browsers but there is a way to compile it so it will work on older browsers.

There is a range of built in math functions in JS for example, max, avg..

There are 3 types of variables in JS:
1. let - only for a certain block
2. var - global variable
3. const - cant' be changed after initialization

```
let grade = 85;
const FACTOR = 1.2;

console.log(grade * FACTOR); // 102

grade = 90;
console.log(grade * FACTOR); // 108

FACTOR = 1.5; // TypeError: Assignment to constant variable.
```
For loops:
```
let grades = [50, 60, 77];
const FACTOR = 42;

for (let grade of grades) {
 console.log(grade * FACTOR);
}

for (let i = 0; i < grades.length; i++) {
 console.log(grades[i] * FACTOR);
}

let i = 0;
while(i < grades.length) {
 console.log(grades[i] * FACTOR);
 i++;
}
```
Functions:
```
function factorize(list) {
 const FACTOR = 42;
 for (let value of list) {
   console.log(value * FACTOR);
 }
}

factorize([1, 2, 3]); // 42, 84, 126
factorize([11, 22, 33]); // 462, 924, 1386
```
Arrays:

as stack
```
let grades = [50, 75, 83];

console.log(grades.length); // 3
console.log(grades[1]); // 75

grades.push(42);
console.log(grades[3]); // 42

grades.pop();
console.log(grades.length); // 3
```
dictionaries
```
// Object-literal notation
let studentGrade = { name: 'Einstein', grade: 50 };

// Can add/change props at runtime
let studentGrade = {};
studentGrade.name = 'Einstein';
studentGrade.grade = 50;

// Can access with dot or as a key
studentGrade.name === studentGrade['name'];
```
```
let grades = [
   { name: 'Einstein', grade: 50 },
   { name: 'Freud', grade: 88 },
];

// Use a hash table
let gradesHash = {
   'Einstein': 50,
   'Freud': 88
};

console.log(Object.keys(gradesHash)); // ['Einstein', 'Freud']
```
## Pay attention not to confuse passing to function another function as parameter or a function call that should return another function.

Event listenere code example:
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Event Types</title>
</head>

<body>
  <button>I'm a Button</button>
  <input type="text">

  <script>
    let button = document.querySelector("button");

    button.addEventListener("click", logEvent);
    button.addEventListener("focus", logEvent);
    button.addEventListener("blur", logEvent);
    button.addEventListener("mousedown", logEvent);
    button.addEventListener("mouseup", logEvent);
    button.addEventListener("keypress", logEvent);

    let input = document.querySelector("input");

    input.addEventListener("click", logEvent);
    input.addEventListener("focus", logEvent);
    input.addEventListener("blur", logEvent);
    input.addEventListener("mousedown", logEvent);
    input.addEventListener("mouseup", logEvent);
    input.addEventListener("keypress", logEvent);


    function logEvent(e) {
      console.log(`${e.type} just happened on ${e.target}`);
    }

  </script>
</body>

</html>
```

## USE `querySelector()` !!!
```
let button = document.querySelector('button');
button.addEventListener('click', displayMessage);
```
Check the type of a variable, it is important since everything is dynamic
```
let value = '42';
console.log(typeof value); // string

let number = Number(value);
console.log(typeof number); // number

let studentGrade = { name: 'Einstein', grade: 50 };
console.log(typeof studentGrade); // object

```

JS Types:
- Number
- String
- Object
- Function
- Undefined

```
Number('moshe')          // NaN
typeof NaN === 'number'  // true
isNaN('moshe') === true  // true
isNaN(42) === false      // true
NaN === NaN              // false
```

Parse values in html table, make calculations and update with results. Example code:
```
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Average</title>
   <style>
       body {
           padding: 1em;
       }

       table {
           border: 1px solid;
           border-collapse: collapse;
           margin-bottom: 1em;
       }

       th,
       td {
           border: 1px solid;
           padding: 5px;
       }
   </style>
</head>

<body>
   <table>
       <thead>
           <tr>
               <th>Name</th>
               <th>Grade</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td>Einstein</td>
               <td>50</td>
           </tr>
           <tr>
               <td>Freud</td>
               <td>88</td>
           </tr>
           <tr>
               <td>Edison</td>
               <td>62</td>
           </tr>
           <tr>
               <td>Newton</td>
               <td>75</td>
           </tr>
           <tr>
               <td>Darwin</td>
               <td>94</td>
           </tr>
       </tbody>
       <tfoot>
           <tr>
               <td>Average</td>
               <td>?</td>
           </tr>
       </tfoot>
   </table>
   <button>Calc Average</button>

   <script>
       let button = document.querySelector('button');
       button.addEventListener('click', () => {
         let table = parseTable(document.querySelector('table'));
         let grades = table.map(student => student.grade);
         document.querySelector('tfoot td:last-child').textContent = avg(grades);
       });

       function parseTable(table) {
           return Array.from(table.querySelectorAll('tbody tr')).map(row => ({
             name: row.querySelector('td:first-child').textContent,
             grade: Number(row.querySelector('td:last-child').textContent)
           }));
       }

       let sum = arr => arr.reduce((sum, val) => sum + val, 0);
       let avg = arr => sum(arr) / arr.length;
   </script>
</body>

</html>
```

Double equal `==` checks only value and makes conversions if needed
Triple equal `===` checks type and value.

[Equality table](https://dorey.github.io/JavaScript-Equality-Table/)

It is preferred to use explicit code, i.e. when comparing value that might need to be converted into another type it is better to use explicit type conversion and then triple equal check.

[JavaScript.info](www.JavaScript.info)

## [Document object model](https://docs.google.com/presentation/d/1QteFD0h7wOkdpMOu_XES_EsJXCpitTqGWfIMjSyIQFA/edit#slide=id.g388718f57c_0_620)

Once any child element is clicked thant the event is updated all the way up through the tree.

- [Eloquent JavaScript - Chapter 13 - DOM](http://eloquentjavascript.net/2nd_edition/13_dom.html)
- [Eloquent JavaScript - Chapter 14 - Handling Events](http://eloquentjavascript.net/2nd_edition/14_event.html)
- [Bubbling and Capturing](http://javascript.info/bubbling-and-capturing)

we can catch even once for example for table and still know which element in the table was clicked.


## [JS Timers](https://docs.google.com/presentation/d/1QteFD0h7wOkdpMOu_XES_EsJXCpitTqGWfIMjSyIQFA/edit#slide=id.g388718f57c_0_620)

```
let intervalId = setInterval(func, time in milliseconds)
clearInterval(intervalId)
timeoutId = setTimeout(func, time in milliseconds)
clearTimeout(timeoutId)
```
[reference](http://javascript.info/settimeout-setinterval)

Browser has only one thread, which is used for both UI and script. There is no context switching. This is why sometimes we receive error "script stuck".

In page script should be as low in page as possible, best just before `</body>`

Function Hoisting - functions are pulled up, therefore the order of functions does not matter.

It is a good idea to put all the functions together in the bottom.

It is a good idea to map functions to arrays instead of using for loops.

It is a good idea instead of using very tiny functions use anonymous functions and define them with `=>`.

Example:
```
function get grades(table) {
  return table.map((student) => student.grade);
}
```
even better optimization:
```
let grades = table.map((student) => student.grade);
```
Another useful function on arrays in `foreach`.
For example: `table.foreach(console.log);`


Ajax request example:
```
let xhr = new XMLHttpRequest()
xhr.open('GET', 'address');
xhr.addEventListener('load');
```
The request is async so we need to add listener to know when it is finished.

Generic request function:
```
function request(method, url) {
 return new Promise((resolve, reject) => {
   let xhr = new XMLHttpRequest();
   xhr.open(method, url);
   xhr.addEventListener('load', e => resolve(JSON.parse(e.target.responseText)));
   xhr.addEventListener('error', reject);
   xhr.send();
 });
```
#### [Java Script Promise](https://docs.google.com/presentation/d/1faOeqikvbl2GSQuFyrWmcBa53jjtKzoiQ48MZdOogoc/edit#slide=id.p)
It is a box that has async func.

```
let p = new Promise(function(resolve, reject) {
  // Async stuff
  let xhr
  xhr.addEventListener(‘load’, resolve);
  xhr.addEventListener(‘error’, reject);
  // resolve(result) - when done
  // reject(error) - if error
});

p.then(function(result) {
  // Cool, it worked
}).catch(function(error) {
  // Oops, it didn't
});
```

With the help of promise nested requests can be resolved this way:
```
// 1. call request
// 2. create and return promise
// 3. register then and catch callbacks
// 4. empty stack => CPU idle
// ...
// 5. browser fetches next async task from queue and executes it in BG
// ...
// 6. HTTP response.
// 7. xhr.addEventListener('load/error')
// 8. call resolve/reject
// 9. call then/catch handlers

let p = request('GET', 'http://foo/ancestry.json');

p.then(ancestry => {
 console.log(getAverage(ancestry));
}).catch(error => console.error);

function request(method, url) {
 return new Promise((resolve, reject) => {
   let xhr = new XMLHttpRequest();
   xhr.open(method, url);
   xhr.addEventListener('load', e => resolve(JSON.parse(e.target.responseText)));
   xhr.addEventListener('error', reject);
   xhr.send();
 });
}
```

Thing to remember: I promise to handle the error (inside a Promise)!

promises and error handling [link](https://docs.google.com/presentation/d/1faOeqikvbl2GSQuFyrWmcBa53jjtKzoiQ48MZdOogoc/edit#slide=id.p)

# Lesson 7
## NodeJS
### [Serve Side](https://docs.google.com/presentation/d/11Pdfbk8kt0BlL9EZRGgepGhgxORES8YgWmKvL_dWxo4/edit#slide=id.g2e1c3a3551_0_926)

```
let http = require('http');

let server = http.createServer(onRequest);
server.listen(8000);

function onRequest(request, response) {
 let responseTime = new Date();
 response.end(`
   Request ${request.url} served at ${responseTime.toLocaleString()}
 `);
}
```

### Modules
Old way to import modules:
```
let foo = require('lib/foo');

foo.doSomething();
```
New way:
```
import foo from './lib/foo';

foo.doSomething();
```
New format will be available in both Node and browsers.

### NPM
NodeJS Package Manager

list of npm packes with grades: [npms.io](https://npms.io/)

To install a package with npm: `npm install moment`


### How to debug node code:

- in vscode debug icon on the left
- in the top part open config, config json will be created
- add config button in the bottom part
- choose appropriate config (Node Attach in our case)
- in order to allow for debugget to attach to running node process, node has to be ran in a curtain way: `node --inspect index.js`

### Routing (API)

```
let moment = require('moment');
let express = require('express');
let logRequest = require('log-request');

let app = express();

app.use(express.static('client'));

app.get('/api/moment', logRequest, (req, res) => {
    handleMoment(req, res, req.query);
});
app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});

app.listen(8000);

function onRequest(request, response) {
    let urlObj = url.parse(request.url);

    if (urlObj.pathname === '/api/moment') {
        let params = qs.parse(urlObj.query);
        handleMoment(request, response, params);
        return;
    }

    getFile(urlObj.pathname)
        .then(data => handleFile(request, response, data))
        .catch(err => handleFileError(request, response, err))
}
function handleFile(request, response, data) {
    response.end(data);
}
function handleFileError(request, response, err) {
    if (err.code === 'ENOENT') {
        sendStatus(request, response, 404);
        return;
    }
    sendStatus(request, response, 500);
}
function handleMoment(request, response, params) {
    response.end(`data`);
}
```

To serve index.html page:
Read file (is async, with callback)

```
let fs = require('fs');

fs.readFile('./client/index.html', (err, data) => {
 if (err) {
   console.error(err);
   return;
 }
 console.log(String(data));
});
```
Turn callback-based code to Promise-based (util is a native module)

```
let util = require('util');

function getFile(pathName) {
 return util.promisify(fs.readFile)(`./client/${pathName}`);
}
```

More File System Methods:
- fs.stat(path, callback(err, stats)) - Get info about a file
- fs.writeFile(path, data[, options], callback(err)) - Write a file
- fs.unlink(path, callback(err)) - Delete a file
- fs.readdir(path, callback(err, files)) - Read directory listing
- fs.rmdir(path, callback(err)) - Delete a directory
- More info here: http://devdocs.io/node/fs

FS Extra - external package for more power
npm install fs-extra
[https://github.com/jprichardson/node-fs-extra](https://github.com/jprichardson/node-fs-extra)


Inline-style:
![routing summary](/notes/materials/summary-routing.png "Logo Title Text 1")

More info on express rouing [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

### [Server Data Handling](https://docs.google.com/presentation/d/1Qe2EXLaSn9KCkr5LSRb1jIBo11Ef9ZmrnAM23IzciYs/edit#slide=id.p)

## Lesson 8
### [MongoDB]
(https://docs.google.com/presentation/d/1Qe2EXLaSn9KCkr5LSRb1jIBo11Ef9ZmrnAM23IzciYs/edit#slide=id.g32888548c7_0_2223)

mongodb commands:
- to start mongo shell: `mongo`
- output the current db: `db`
- list all databases: `show dbs`
- create new db and switch to it: `use db_name`
- create new collection and insert document to it: `db.ancestry.insert({name: 'Serge Krul'})`
- insert many:
```
  db.ancestry.insertMany([
    {name: 'Alex Krul'},
    {name: 'Ella Krul'}
  ])
```
- Query the collection: `db.ancestry.find({name: 'Serge Krul'})`

install mongo nodejs client: `npm install mongodb`

mongo example client nodejs:
```
let express = require('express');
let app = express();
let mongo = require('mongodb').MongoClient;

app.listen(8000, () => {
 console.log('listening on 8000...');

 mongo.connect('mongodb://localhost:27017', (err, client) => {
   console.log('Connected successfully to database');

   let db = client.db('course');
   let collection = db.collection('ancestry');
   collection.insertMany([...], (err, result) => {
     console.log(`Inserted ${result.result.n} records`);
     collection.find({...}).toArray((err, result) => {
       console.log(result);
       client.close();
     });
   });
 });
});

```
### [Unit Testing Intro](https://docs.google.com/presentation/d/16iTKG0otluFgVRWyqTF15qzIgGIrUyG93ZlSc69kp8c/edit#slide=id.p)
install jasmin:
```
$ npm install --save-dev jasmine
$ npm i -D jasmine
```
install [karma](http://karma-runner.github.io/2.0/intro/installation.html):
```
# Install Karma:
$ npm install karma --save-dev

# Install plugins that your project needs:
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
```
init karma `karma init karma.conf.js`
```
$ npm install -g karma-cli
```

