const fs = require("fs");
const path = require("path");
const AvatarGenerator = require('avatar-generator')
const avatar = new AvatarGenerator({
  //All settings are optional.
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], //order in which sprites should be combined
  partsLocation: path.join(__dirname, '/img'), // path to sprites
  imageExtension: '.png' // sprite file extension
})
const generateData= async (i)=> {
  let filename = i.toString(16).padStart(64, "0") + ".json";
  let content = `{
        "description": "Avatar - ${i}",
        "external_url": "https://forum.openzeppelin.com",
        "image": "https://raw.githubusercontent.com/ximplarandy/CrazyNFTMeta/main/data/${i}.png",
        "name": "Avatar ${i}"
      }`
  fs.writeFile('data/' + filename, content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })

  const variant = i%2==0?'female':'male' // By default 'male' and 'female' supported
  const image = await avatar.generate(i+'@example.com', variant)
  // Now `image` contains sharp image pipeline http://sharp.pixelplumbing.com/en/stable/api-output/
  // you can write it to file
  image
    .png()
    .toFile("data/" + i+ '.png')
}
for (let i = 0; i < 300; i++) {
  generateData(i);
}

