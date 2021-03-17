var fs = require('fs');
test_mode = false;
const h = require("./helper");
var HTMLParser = require('node-html-parser');
const { exit } = require('process');
const dirPath = "szerzok";
let files = [];
let authors = [];

fs.readdirSync(dirPath + "/").forEach(file => {
  if (fs.statSync(dirPath + "/" + file).isDirectory())
    files.push(h.getAllFiles(dirPath + "/" + file));
});
if (!test_mode) fs.writeFileSync("authors.json", '{"contents":[');
let author_id = 1;
for (let i = 0; i < files.length; i++) {
  let file = files[i][0];
  if (file == undefined) continue;
  let data = fs.readFileSync(file, 'utf8');
  const root = HTMLParser.parse(data);
  let author = root.querySelector('h2.media-heading');
  if (author == null) continue;
  author = author.innerText.trim();
  console.log(root.querySelector('h2.media-heading').innerText.trim());
  // author = author.substr(0, author.search('经典语录/名句'));`
  author = h.convertSpecialChars(author);

  // if (authors.includes(author)) {
  //   console.log(`contains this copy ${author}!`);
  //   continue;
  // }
  // else 
  if (author.length > 0) {
    authors.push(author);
    if (test_mode) console.log(file, author, author_id);
    let dwn_string = '{"id":' + author_id + ',"name":"' + author + '"}';
    if (i != files.length - 1) dwn_string = dwn_string + ',' + "\n";
    if (!test_mode) fs.appendFileSync("authors.json", dwn_string);
    author_id++;
  }
}
if (!test_mode) fs.appendFileSync("authors.json", ']}');

