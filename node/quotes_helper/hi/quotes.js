var fs = require('fs');
test_mode = false;
const h = require("./helper");
var HTMLParser = require('node-html-parser');
const { exit } = require('process');
const dirPath = "prev";
let files = [];
let authors = [];
h.authors = JSON.parse(fs.readFileSync('authors.json'))['contents'];
fs.readdirSync(dirPath + "/").forEach(file => {
  if (!fs.statSync(dirPath + "/" + file).isDirectory() && !file.includes('.DS_Store'))
    files.push(dirPath + "/" + file);//h.getAllFiles()
  // if (test_mode) console.log({ "authors cycle": file });
});
//output {"contents":[{"author_id":1,"text":"To educate is always easier than to re-educate"},
//.list-group-item a span small
if (!test_mode) fs.writeFileSync("quotes.json", '{"contents":[');
for (let i = 0; i < files.length; i++) {//
  let file = files[i];//first file in the list to read author's name
  if (test_mode) console.log({ "i cycle": files[i] });
  if (file == undefined) continue;
  //only test using this author
  // if (file.search('abdul-baha') == -1) continue;
  let data = fs.readFileSync(file, 'utf8');
  const root = HTMLParser.parse(data);
  let quotes = [];
  let authors = root.querySelectorAll('h5');
  let author = authors[authors.length - 2];
  if (author == null) continue;
  author = author.innerText.trim();

  // author = author.substr(0, author.search('经典语录/名句'));
  author = h.convertSpecialChars(author);
  let author_id = h.getAuthorIdByName(author);
  console.log(author, author_id);
  if (author_id > 0) //author is found! // && author_id == 888
  {
    if (test_mode) console.log("Author: ", author);
    // for (let j = 0; j < files[i].length; j++) {
    // const element = files[i][j];//each file within author's folder
    root.querySelectorAll('p').forEach(el => {

      var phrase = el.innerText.trim();// && h.isGerman(phrase)
      if (phrase.includes('Quote ') && phrase.length < 400 && h.hasHindiCharacters(phrase)) {//&& phrase.search(/Ç|ç|É|é|È|è|Ê|ê|Ë|ë|Î|î|Ï|ï|Ô|ô|Œ|œ|Ù|ù|Û|û|Ü|ü|Ÿ|ÿ/) > -1 && !phrase.includes(" of ") && !phrase.includes(" the ") && !phrase.includes(" was ") && !phrase.includes(" to ") && !phrase.includes(" by ") && !phrase.includes(" you ") && !phrase.includes("I ") && !phrase.includes(" is ")
        //phrase = phrase.slice(1, phrase.lastIndexOf('」'));//remove initial quotes
        phrase = phrase.replace(/Quote [0-9]+: /g, "");
        phrase = phrase.replace(/<br>/g, '\\n');
        phrase = phrase.replace(/&rdquo;/g, '”');
        phrase = phrase.replace(/&ldquo;/g, '“');
        phrase = phrase.replace(/\n/g, '\\n');// Right-To-Left Mark non-printable should be stripped off
        // If a quote starts with &quot; and ends with &quot; remove 'em
        phrase = h.convertSpecialChars(phrase);//convert special characters
        let dwn_string = '{"author_id":' + author_id + ',"text":"' + phrase + '"},' + "\n";
        // check if it has the same quote
        // if (!quotes.includes(dwn_string))
        //     quotes.push(dwn_string);
        // fs.appendFileSync("authors_create_dirs2.sh", 'mkdir "author/'+el.innerHTML.trim()+"\"\n");
        if (test_mode) console.log({ "j cycle": dwn_string });
        if (!test_mode) fs.appendFileSync("quotes.json", dwn_string);
      }//only if Portuguese
    });
    //          if (i != files.length-1) dwn_string = dwn_string + ','+"\n"; quotes.join("")
    //}// all files for this author
  }
  // author_id++;
  // root.querySelectorAll('.list-group-item span').forEach(el=>{
  //     authors.push(el.innerText);
  // });
  // console.log(quotes.length, authors.length);
  // for (let i = 0; i < quotes.length; i++) {
  //     var qty = parseInt(authors[i]);
  //     let link = quotes[i].getAttribute('href');
  //     let author = quotes[i].innerHTML.trim();
  //     var p_no = 1;
  //     do {
  //         console.log(author+" | "+link+" | qty: "+qty+' | p_no '+p_no);
  //         var current_link = 'https://proverbia.net'+link;
  //         if (p_no > 1) current_link = current_link + '/' + p_no;
  //         var dwn_string = 'wget "'+current_link+'" -O "author/'+author+'/'+p_no+'.html"'+"\n";
  //     // fs.appendFileSync("authors_download_files2.sh", dwn_string);
  //         qty=qty-24; p_no++;
  //     }
  //     while (qty>24)

  // }
}//i cycle
if (!test_mode) fs.appendFileSync("quotes.json", ']}',);

