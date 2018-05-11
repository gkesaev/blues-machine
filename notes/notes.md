
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

```class="Link--external"
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
.MyComponent {}
.MyComponent.is-animating {}
.MyComponent--modifier {}

.MyComponent-part {}
.MyComponent-anotherPart {}
```

