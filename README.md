# Ember-cli-pdf-js 

Wraps the pdf-js native javascript pdf viewer to display pdfs in an ember app.

## Work in progress

This addon is a work in progress and has a number of limitations currently (listeded below).

## Installation
`ember install ember-cli-pdf-js`

## Usage

```Handlebars
  {{pdf-viewer src='mypdf.pdf'}}
```

## Limitations

* Can't have multiple instances
* No sensible hook to configure pdf-js yet
* Viewer code isn't scoped to the component yet (window, document, hash stuff etc)
* Viewer code hasn't been emberified making it hard to customise the viewer

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
