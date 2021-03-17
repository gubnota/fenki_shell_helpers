var fs = require('fs');
test_mode = false;
const h = require("./helper");
var HTMLParser = require('node-html-parser');
const { exit } = require('process');
const dirPath = "unlu-sozleri";
let files = [];
let authors = [];
let author_id = 1;

if (fs.existsSync('authors01.json')) {
  var data = fs.readFileSync('authors01.json', 'utf8');
  orig_authors = JSON.parse(data);
  orig_authors['contents'];
  for (let i = 0; i < orig_authors['contents'].length; i++) {
    authors.push(orig_authors['contents'][i]);
  }
  author_id = orig_authors['contents'][orig_authors['contents'].length - 1]['id'] + 1;
}

fs.readdirSync(dirPath + "/").forEach(file => {
  if (fs.statSync(dirPath + "/" + file).isDirectory())
    files.push(h.getAllFiles(dirPath + "/" + file));
});
if (!test_mode) fs.writeFileSync("authors.json", '{"contents":[');
for (let i = 0; i < files.length; i++) {
  for (let j = 0; j < files.length; j++) {//j cycle
    let file = files[i][j];
    if (file == undefined) continue;
    let data = fs.readFileSync(file, 'utf8');
    const root = HTMLParser.parse(data);
    let author = root.querySelector('h1.title');
    if (author == null) continue;
    author = author.innerText.trim();
    console.log(root.querySelector('h1.title').innerText.trim());
    // author = author.substr(0, author.search('经典语录/名句'));`
    author = h.convertSpecialChars(author);

    if (authors.includes(author)) {
      console.log(`contains this copy ${author}!`);
      continue;
    }
    else
      if (author.length > 0) {
        authors.push(author);
        if (test_mode) console.log(file, author, author_id);
        let dwn_string = '{"id":' + author_id + ',"name":"' + author + '"}';
        if (i != files.length - 1) dwn_string = dwn_string + ',' + "\n";
        if (!test_mode) fs.appendFileSync("authors.json", dwn_string);
        author_id++;
      }
  } //j cycle
}
if (!test_mode) fs.appendFileSync("authors.json", ']}');

