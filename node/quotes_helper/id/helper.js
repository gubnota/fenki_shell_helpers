var fs = require('fs');
const path = require('path');
var h = {
  authors: [],
  addDevice(id, device) { // this is valid syntax
    h.devices[id] = device;
  },
  isHungarian(str) {
    if (str.search(/ü|á|ó|Ó|Ö|ö|Ő|ő|Í|i̇́/) > -1) return true;
    return false;
  },
  isEnglish(str) {
    if (str.includes(" of ") || str.includes(" the ") || str.includes(" was ") || str.includes(" to ") || str.includes(" by ") || str.includes(" you ") || str.includes("I ") || str.includes(" is "))
      return true;
    return false;
  },
  isGerman(str) {
    if (str.search(/ß|ä|ö|ü/) > -1 ||
      str.includes("Die ") ||
      str.includes("Das ") ||
      str.includes("Der ")
      //  ||
      // (!str.includes(" of ") && !str.includes(" the ") && !str.includes("I ") && !str.includes(" by ") && !str.includes(" is ")    )
    ) return true;
    return false;
  },
  convertSpecialChars(str) {
    str = str.replace(/[\s]*\[…\][\s]*/g, '…');
    str = str.replace(/"/g, '\\\"');
    str = str.replace(/&quot;/g, '\\\"');
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&#39;/g, "'");
    str = str.replace(/&nbsp;/g, " ");
    str = str.replace(/&ndash;/g, "–");
    str = str.replace(/\n/g, '\n');
    str = str.replace(/„([^\"]+)\\"/g, '“$1”');
    str = str.replace(/\\"([^\"]+)\\"/g, '“$1”');
    str = str.replace(/[\s]+/g, ' ');
    return str;
  },
  getAllFiles(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []
    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = module.exports.getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else if (file.search('index.html') != -1) {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    })
    return arrayOfFiles
  },
  getAuthorIdByName(name, strict = true) {
    let result_id = 0;
    module.exports.authors.forEach((el) => {
      // console.log(el.id, el.name, name == el.name);
      if (el.name.includes(name)) result_id = el.id;
      // if ((el.name == name && strict) ||
      // (name.length > 0 && el.name.search(name)!=-1 && !strict) ) result_id = el.id;
    })
    return result_id;
  },
  getAuthorNameById(id) {
    let result_name = 0;
    module.exports.authors.forEach((el) => {
      if (el.id == id) result_name = el.name;
    })
    return result_name;
  }
};
module.exports = h;

// var fs = require('fs');
// const path = require('path');


//module.exports = { convertSpecialChars, getAllFiles, getAuthorIdByName, getAuthorNameById, authors };