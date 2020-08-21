const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //lodash
    const num=_.random(0,30);
    console.log(num);

    //can call greet function only once
    const greet = _.once(() => {
        console.log('hii');
    });
    greet();
    greet();

    res.setHeader('Content-Type', 'text/html');

    //to manage all this switch case code, we have a package named express (express is a third party package and used to handle all routes)
    //adding routes,redirects and status codes
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.setHeader('Location', '/about')
            //redirected an old read-me page to a new about page and passed status code as 301
            res.statusCode = 301;
            res.end()
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
            //or can write res.end(data)
        }
        else {
            res.write(data);
            res.end();
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('Listening here');
});