# write-html

[![build status][1]][2] [![dependency status][3]][4]

<!-- [![browser support][5]][6] -->

Write HTML in parts, `<head>` first, `<body>` later

## Example

WriteHtml encourages you to write the `<head>` of your html page
    immediately and write the body once you have done some async
    things. this allows script tags, style tags & assets like
    link prefetching to load in parallel with your database
    fetching code.

```js
var http = require("http")
var WriteHtml = require("write-html")

var server = http.createServer(function (req, res) {
    if (req.url.match(/\/user\//)) {
        var userParts = req.url.split("/")
        var userId = userParts[userParts.length - 1]

        var writer = WriteHtml(req, res)
        writer.writeHead("<head><title>User page</title></head>")

        db.get("user:" + userId, function (err, user) {
            writer.writeBody("<body>" + render(user) + "</body>")
        })
    }
})
```

## Installation

`npm install write-html`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/write-html.png
  [2]: https://travis-ci.org/Colingo/write-html
  [3]: https://david-dm.org/Colingo/write-html.png
  [4]: https://david-dm.org/Colingo/write-html
  [5]: https://ci.testling.com/Colingo/write-html.png
  [6]: https://ci.testling.com/Colingo/write-html
