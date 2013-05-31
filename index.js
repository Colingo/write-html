module.exports = WriteHTML

function WriteHTML(req, res) {
    res.setHeader("Content-Type", "text/html")

    return {
        writeHead: function writeHead(head) {
            res.write("<!DOCTYPE html>\n<html>\n" + head + "\n")
        },
        writeBody: function writeBody(body) {
            res.end(body + "\n</html>")
        }
    }
}

