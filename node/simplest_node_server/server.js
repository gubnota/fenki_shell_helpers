// super-simple barebones http server built on top of node.js
// Vladislav Muravyev aka LàMoore 2021 v.1.0.2
const http = require('http'); // 1 - Import Node.js core module
const fs = require('fs');

function getfile(req, res){
    if (typeof(res)=='undefined'){
        reqname = 'index.html';
    }
    else {
        reqname = req.url.substr(1);
    }
    if(reqname.substr(reqname.length-2)=='/' || reqname=='') reqname = reqname+'index.html';
    try {
        
    if(fs.existsSync(reqname)) {
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write(getfile('index.html'));
        res.end();
        return fs.readFileSync(reqname);
        // console.log("The file exists.");
    } else {
        console.log('The file does not exist.');
        return 'The file does not exist.';
    }

} catch (err) {
    console.error(err);
}
}

const server = http.createServer(function (req, res) {
    // 2 - creating server
    // getfile(req, res);
    var mime = 'text/html';
    if (typeof(res)=='undefined'){
        reqname = 'index.html';
    }
    else {
        reqname = req.url.substr(1);
    }
    if(reqname.substr(reqname.length-2)=='/' || reqname=='') reqname = reqname+'index.html';
    try {
    if(fs.existsSync(decodeURIComponent(reqname))) {
        ext = reqname.substr(reqname.lastIndexOf('.')+1).toLowerCase();
        switch (ext) {
            case 'html':
                mime = "text/html";
            break;
            case 'css':
                mime = "text/css";
            break;
            case 'js':
                mime = "application/javascript";
            case 'json':
                mime = "application/json";
            break;
            case 'mp4':
                mime = "video/mp4";
            break;
            case 'mov':
                mime = "video/mp4";
            break;
            case 'ts':
                mime = "video/MP2T";
            break;
            case 'm3u8':
                mime = "application/x-mpegURL";
            break;
            case 'png':
                mime = "image/png";
            break;
            case 'webp':
                mime = "image/webp";
            break;
            case 'jpeg':
                mime = "image/jpeg";
            break;
            case 'jpg':
                mime = "image/jpeg";
            break;
            case 'gif':
                mime = "image/gif";
            break;
            case 'ico':
                mime = "image/ico";
            break;
            case 'svg':
                mime = "image/svg+xml";
            break;
            case 'mp3':
                mime = "audio/mp3";
            break;
            case 'm4a':
                mime = "audio/m4a";
            break;
            case 'wav':
                mime = "audio/wav";
            break;
            case 'woff':
                mime = "application/font-woff";
            break;
            case 'ttf':
                mime = "application/font-ttf";
            break;
            case 'eot':
                mime = "application/vnd.ms-fontobject";
            break;
            case 'txt':
                mime = "text/plain";
            break;            
            default:
            res.writeHead(200, {"Content-Type" : 'application/octet-stream'});
            break;
        }
        res.writeHead(200, [["Access-Control-Allow-Origin","*"],["Content-Type", mime]]);
        res.write(fs.readFileSync(decodeURIComponent(reqname)));
        res.end();
        console.log([reqname,"200"]);
    } else {
        res.writeHead(404, [["Access-Control-Allow-Origin","*"],["Content-Type", mime]]);
        res.write('<h1>File not found: <a href="/'+reqname+'">/'+reqname+'</a></h1>');
        res.end();
        console.error([reqname,'404']);
    }

} catch (err) {
    console.error(err);
}

});
server.listen(8080); //3 - listen for any incoming requests
console.log('Node.js web server at port 8080 is running..')