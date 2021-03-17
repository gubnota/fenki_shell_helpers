var fs = require('fs');
var readline = require('readline');
var filename = 'Who are you-GWGbOjlJDkU.zh.vtt';
var read_stream = fs.createReadStream(filename);
var rl = readline.createInterface({
    input: read_stream
});
var c = 0;
var vertexes_number;
var edges_number;
var edges = [];
rl.on('line', function (line) {
    // if (line.search('-->') > -1)
    if (line != '' && line.search('-->') == -1 && line.search(/\s*/g) !== -1)
        console.log(line);
    //     console.log(line);
    // if (c==0) {
    //     vertexes_number = parseInt(line);
    // } else if (c==1) {
    //     edges_number = parseInt(line);
    // } else {
    //     edges.push(line.split(' '));
    // }
    // c++;
})
    .on('end', function () {
        rl.close();
    })