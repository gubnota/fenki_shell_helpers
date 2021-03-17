var fs = require('fs');
test_mode = false;
const h = require("./helper");
var HTMLParser = require('node-html-parser');
const { exit } = require('process');
const dirPath = "prev";
let files = [];
let authors = [];

fs.readdirSync(dirPath + "/").forEach(file => {
  if (!fs.statSync(dirPath + "/" + file).isDirectory() && !file.includes('.DS_Store'))
    files.push(dirPath + "/" + file);//h.getAllFiles
}
);
if (!test_mode) fs.writeFileSync("authors.json", '{"contents":[');
let author_id = 1;
for (let i = 0; i < files.length; i++) {
  let file = files[i];
  if (file == undefined) continue;
  let data = fs.readFileSync(file, 'utf8');
  const root = HTMLParser.parse(data);
  let authors = root.querySelectorAll('h5');
  let author = authors[authors.length - 2];
  // if (author.innerText.includes('YouTube')) { console.log(authors) }//author = authors[authors.length - 2];
  if (author == null) continue;
  author = author.innerText.trim();
  author = author.slice(0, author.length);//author.lastIndexOf(' के प्रसिद्द कथन')
  console.log(author);
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

