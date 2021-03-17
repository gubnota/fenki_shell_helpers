var fs = require('fs');
var readline = require('readline');
var filename = 'words';
var filename2 = 'timecodes';
var words = fs.readFileSync(filename).toString().split("\n");
var timecodes = fs.readFileSync(filename2).toString().split("\n");
if (words.length > 0 && words.length == timecodes.length) {
    console.log("\n");
    for (let i = 0; i < words.length; i++) {
        console.log(i + 1, "\n", timecodes[i], "\n", '{\\an2}<font color="#000000" face="Yuanti SC" size="16px">' + words[i] + '{\\an2}</font>', "\n");
    }
    // if (line.search('-->') > -1)
    // if (line != '' && line.search('-->') == -1 && line.search(/\s*/g) !== -1)
    // console.log(line, timecodes[i]);
}

