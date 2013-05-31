var test = require("tape")
var http = require("http")
var setTimeout = require("timers").setTimeout
var request = require("request")

var WriteHtml = require("../index")

var PORT = 2000 + Math.round(Math.random() * 10000)
var server

test("WriteHtml is a function", function (assert) {
    assert.equal(typeof WriteHtml, "function")
    assert.end()
})

test("create http server", function (assert) {
    server = http.createServer(function (req, res) {
        var writer = WriteHtml(req, res)

        writer.writeHead("<head><title>hello</title></head>")

        setTimeout(function () {
            writer.writeBody("<body><p>Hello</p></body>")
        }, 1000)
    })

    server.listen(PORT, function () {
        assert.end()
    })
})

test("hit http server", function (assert) {
    var now = Date.now()
    var req = request("http://localhost:" + PORT)
    var chunks = []

    req.on("data", function (chunk) {
        chunks.push([String(chunk), Date.now()])
    })

    req.on("end", function () {
        var timeHead = chunks[0][1] - now
        var timeBody = chunks[1][1] - now

        assert.equal(chunks[0][0], "<!DOCTYPE html>\n<html>\n" +
            "<head><title>hello</title></head>\n")
        assert.ok(timeHead < 50)

        assert.equal(chunks[1][0], "<body><p>Hello</p></body>" +
            "\n</html>")
        assert.ok(timeBody > 1000 && timeBody < 1050)

        assert.end()
    })
})

test("close http server", function (assert) {
    server.close(function (err) {
        assert.ifError(err)

        assert.end()
    })
})
