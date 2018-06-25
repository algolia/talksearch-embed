# TalkSearch.js

The easiest way to add search to your conference videos.

# What is TalkSearch.js?

TalkSearch.js is a UI helper to help you build a search interface to
display your TalkSearch records. If you don't yet have TalkSearch index for
your conference, you should contact community@algolia.com to get you started.

With TalkSearch, you have access to an Algolia index containing all your videos
data. As with any other Algolia index, you can build your own search UI on top
of it by using our InstantSearch.js library. This library contains a set of
widgets (searchbar, results, filters, pagination, etc) that you can combine and
configure to build your unique UI.

To make things easier, we packaged some default templating into TalkSearch.js.
This will give you a head start and make the initial integration much faster;
you should be able to have a working search in your website in a matter of
minutes.

_Note that you __don't have to__ use TalkSearch.js to use your TalkSearch index. It
makes the initial integration smoother, especially if you don't yet have
experience with InstantSearch.js and Algolia in general, but it is not
mandatory. See the Custom Template section for more information._

# Usage

## Include libraries

You'll need to include both the underlying InstantSearch.js library, and the
TalkSearch.js helper. Both libraries come with some CSS styling, to provide
a default styling.

```html
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.0/dist/instantsearch.min.css">
  <link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/algolia/talksearch.js/dist/talksearch.min.css">

  <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.0"></script>
  <script src="https://raw.githubusercontent.com/algolia/talksearch.js/master/dist/talksearch.js"></script>
```

_Note that we also have a React InstantSearch, Vue InstantSearch and Angular
InstantSearch if you're using one of those frameworks. The following example
will assume you're using the regular InstantSearch.js, but the exact same
concept will apply to any of those three libraries._

## Initialize the search

You now need to initialize the library with your TalkSearch credentials. Those
should have been handed to you by our TalkSearch team. If you don't have them,
don't hesitate to contact community@algolia.com

```javascript
const search = instantsearch({
  appId: '8J7GPSC0XN',
  apiKey: '{{PROVIDED_BY_ALGOLIA}}',
  indexName: '{{PROVIDED_BY_ALGOLIA}}'
});

search.start();
```

## Add UI widgets

InstantSearch widgets works by using HTML placeholders. You add empty `divs` to
your page, with unique `#id` and you then create widgets bound to those HTML
elements. The library will then replace each `div` with the corresponding
widget, and all widgets will be updated in real time whenever a search is made.

The bare minimum widgets you'll need are a searchbar (to input keywords) and
a place to display the results. 

```html
<!-- You can put those two placeholders wherever you want in your page -->
<div id="searchbar"></div>
<div id="results"></div>
```

Once you have the placeholders, you need to add widgets inside of it. Update the
previous JavaScript snippet, and add the widgets between the initial
`instantsearch()` call and the call to `.start()`.

```javascript
const search = instantsearch(options);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#results',
    templates: {
      item: talksearch.templates.hits.item,
    },
  })
);

search.start();
```

This will give you a working search in your videos.

## More widgets and customization

Refer to InstantSearch.js documentation.



# Custom template

If you want to use another template than the one provided with TalkSearch.js to
display your results, then you don't really _need_ TalkSearch.js.

TalkSearch.js is just one example of how you could display your results.
Remember that underneath, we're using the `hits` widget of InstantSearch.js. If
you want to tweak the rendering, you can directly use this widget and build any
markup you want. 

You don't have to use TalkSearch.js to enjoy the benefits of your TalkSearch
index. Feel free to poke at the source code and see how we built our template,
borrow ideas and code, and roll your own :)

# Why TalkSearch?

As conference organizers, we spend a lot of time and effort making sure our
event will bring value to the audience. We hand-pick speakers with great content
and we love when people share their knowledge to make everyone a better
developer.

That's why we record the talks, so we can then share them with people that could
not attend in the first place. But that's hours and hours of content. Surely
there is a better way to make this content discoverable?

That's why we built TalkSearch. TalkSearch will allow your visitors to browse
all your talks and search for any topic they're interested in. It will even
search into what the speakers are actually _saying_ and jump right to the
matching moment in the video.


































![TalkSearch][1]

> This is part of the [TalkSearch][2]
> project by [Algolia][3]

[Website][4] |
[**embed**][5] |
[scraper][6] |
[landing page source][7]

This here is the code that you'll use to show a TalkSearch implementation on
your site.

## Installation

## Usage

## Playground

This project comes with a playground to generate demos for indexes. You can run
the playground by typing `yarn run playground:serve` and opening
http://localhost:3000/.

The playground is used by developers to check that `talksearch.js` can work in
a variety of scenarios, and also to showcase an example of what can be done with
the data.

### Creating a new demo

To add a new demo to the playground, you'll need to create a new directory in
`./playground/src`. This directory should contain the following files:
- `index.pug` will contain all the required metadata for the page (conference
  name, url, appId and apiKey)
- `search.js` will contain the actual instantsearch code for this specific demo.
  It can accept custom `// include: hits.js` strings to include some of the most
  used widgets.
- `style.css` will contain any custom styling you need to apply to the page.
  This will be processed as part of the postcss build, so you can use tailwind
  `@apply` directive.
- `tailwind.config.js` will contain config you need to pass to
  tailwind. This is where you define/overwrite colors.
- `logo.*` and `logo-small.*` are images used for displaying the logo in the
  header on various screen size. They can be of any extensions (`svg` or `png`
  are recommended, though).
- `fonts` should contain any additional font you need to use. CSS class names
  will automatically be added for fonts there.


[1]: assets/img/logo-talksearch-line@2x.png
[2]: https://community.algolia.com/talksearch
[3]: https://algolia.com
[4]: https://community.algolia.com/talksearch
[5]: https://github.com/algolia/talksearch-embed
[6]: https://github.com/algolia/talksearch-scraper
[7]: https://github.com/algolia/talksearch
