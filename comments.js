// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/'){
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (req.url === '/comments') {
        fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('Page Not Found');
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Path: index.html
<!DOCTYPE html>
<html>
    <head>
        <title>Comments</title>
    </head>
    <body>
        <h1>Comments</h1>
        <ul id="comments"></ul>
        <script>
            fetch('/comments')
                .then(response => response.json())
                .then(comments => {
                    const commentsList = document.getElementById('comments');
                    comments.forEach(comment => {
                        const li = document.createElement('li');
                        li.appendChild(document.createTextNode(comment));
                        commentsList.appendChild(li);
                    });
                });
        </script>
    </body>
</html>

// Path: comments.json
[
    "This is the first comment",
    "This is the second comment",
    "This is the third comment"
]
```

##