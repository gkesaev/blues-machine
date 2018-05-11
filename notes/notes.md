
# Lesson 1
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
### (same presentation)

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
```
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
### UI Foundation - CSS

```
h1                        {}  /* <h1>...</h1> */
.Button                   {}  /* <* class="Button">...</*> */
button.Button             {}  /* <button class="Button">...</button> */
.Button.Button--primary   {}  /* <* class="Button Button--primary">...</*> */
a[href$=".org"]           {}  /* <a href="https://wordpress.org/">...</a>*/
#input-5572               {}  /* <* id="input-5572">...</*> */    /* not suggested to use */
```
#####More Selectors:
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
