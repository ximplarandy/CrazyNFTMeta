const fs = require("fs");

for(let i=0; i<300; i++) {
    let filename = i.toString(16).padStart(64, "0") + ".json";
    let content = `{
        "description": "GameItems - ${i}",
        "external_url": "https://forum.openzeppelin.com",
        "image": "https://openmoji.org/data/color/svg/1FA99.svg",
        "name": "Monster ${i}"
      }`
    fs.writeFile('data/' + filename, content, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
}

