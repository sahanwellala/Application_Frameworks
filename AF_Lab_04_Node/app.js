console.log('Hello Word !');
const os = require('os');
console.log('Architecture ' + os.arch());
console.log('CPUs ' + os.cpus().length);
console.log('OS ' + os.platform());


const fs = require('fs');
const fileName = __dirname + '/test.txt';

fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data.toString());
});

const data = fs.readFileSync('test.txt');
console.log(data.toString());

const fileName2 = __dirname + '/test.txt';
const outFileName2 = __dirname + '/test-copy.txt';

const readStream = fs.createReadStream(fileName2);
const writeStream = fs.createWriteStream(outFileName2);

readStream.pipe(writeStream);

readStream.on('data', data => {
    console.log(data.toString());
});
//
// const http = require('http');
//
// http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h1>Hello World</h1>');
//     res.end();
// }).listen(3000);

const http = require('http');

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    switch (req.method) {
        case 'GET':
            res.write('<h1>Hello World</h1>');
            res.end();
            break;
        case 'POST':
            req.on('data', data => {
                res.write('<h1>Hello ' + data + '</h1>');
                res.end();
            });
            break;
    }
}).listen(3000, (err) => {
    console.log('Server is listening to port 3000')
});
