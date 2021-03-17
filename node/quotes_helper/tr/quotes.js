var fs = require('fs');
test_mode = false;
const h = require("./helper");
var HTMLParser = require('node-html-parser');
const { exit } = require('process');
const dirPath = "unlu-sozleri";
let files = [];
let authors = [];
h.authors = JSON.parse(fs.readFileSync('authors.json'))['contents'];
fs.readdirSync(dirPath + "/").forEach(file => {
  if (fs.statSync(dirPath + "/" + file).isDirectory())
    files.push(h.getAllFiles(dirPath + "/" + file));
  if (test_mode) console.log({ "authors cycle": file });
});
//output {"contents":[{"author_id":1,"text":"To educate is always easier than to re-educate"},
//.list-group-item a span small
if (!test_mode) fs.writeFileSync("quotes.json", '{"contents":[');
for (let i = 0; i < files.length; i++) {
  for (let j = 0; j < files[j].length; j++) {//j cycle
    let file = files[i][j];//first file in the list to read author's name
    if (test_mode) console.log({ "i cycle": files[i] });
    if (file == undefined) continue;
    //only test using this author
    // if (file.search('abdul-baha') == -1) continue;
    let data = fs.readFileSync(file, 'utf8');
    const root = HTMLParser.parse(data);
    let quotes = [];
    let author = root.querySelector('h1.title');
    if (author == null) continue;
    author = author.innerText.trim();

    // author = author.substr(0, author.search('经典语录/名句'));
    author = h.convertSpecialChars(author);
    let author_id = h.getAuthorIdByName(author);
    console.log(author, author_id);
    if (author_id > 0) //author is found! // && author_id == 888
    {
      if (test_mode) console.log("Author: ", author);
      quotes = [];//reset quotes array for each author
      for (let j = 0; j < files[i].length; j++) {
        const element = files[i][j];//each file within author's folder
        root.querySelectorAll('.ajaxPageContent p').forEach(el => {
          var phrase = el.innerHTML.trim();
          if (phrase.length < 400 && h.isTurkish(phrase)) {//&& phrase.search(/Ç|ç|É|é|È|è|Ê|ê|Ë|ë|Î|î|Ï|ï|Ô|ô|Œ|œ|Ù|ù|Û|û|Ü|ü|Ÿ|ÿ/) > -1 && !phrase.includes(" of ") && !phrase.includes(" the ") && !phrase.includes(" was ") && !phrase.includes(" to ") && !phrase.includes(" by ") && !phrase.includes(" you ") && !phrase.includes("I ") && !phrase.includes(" is ")
            //phrase = phrase.slice(1, phrase.length - 1);//remove initial quotes
            // If a quote starts with &quot; and ends with &quot; remove 'em
            phrase = h.removeTurkishTitle(phrase);
            phrase = h.convertSpecialChars(phrase);//convert special characters
            console.log(phrase);
            let dwn_string = '{"author_id":' + author_id + ',"text":"' + phrase + '"},' + "\n";
            // check if it has the same quote
            if (!quotes.includes(dwn_string)) {
              quotes.push(dwn_string);
              if (test_mode) console.log({ "j cycle": dwn_string });
              if (!test_mode) fs.appendFileSync("quotes.json", dwn_string);
            }
            else {
              console.error({ "same string!": dwn_string });
            }
            // fs.appendFileSync("authors_create_dirs2.sh", 'mkdir "author/'+el.innerHTML.trim()+"\"\n");
          }//only if Portuguese
        });
        //          if (i != files.length-1) dwn_string = dwn_string + ','+"\n"; quotes.join("")
      }// all files for this author
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

  }//j cycle
}//i cycle
if (!test_mode) fs.appendFileSync("quotes.json", ']}',);

