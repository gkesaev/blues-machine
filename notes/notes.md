
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

protcol user info
  |         |
http://user:password@www.example.com:80/search?q=term&lang=en#results

```
$ npm install -g http-server  (-g global for all users)

$ http-server
```
OR

install Live Server addon to VScode and run it with command:
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

in chrome to change values, for example CSS width, SHIFT + arrow Up/Down or Alt + arrow Up/Down

to remove space between to inline elements one can comment out the space in html code
<dl>
<kbd>CTRL</kbd>+<kbd>Z</kbd>
</dl>
