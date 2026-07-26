const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();

  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(outputFile);

  const chunks = [];

  input.on("data", (chunk) => {
    chunks.push(chunk);
  });

  input.on("end", () => {
    const data = Buffer.concat(chunks);
    const iv = data.slice(0, 16);
    const encrypted = data.slice(16);

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);

    fs.writeFileSync(outputFile, decrypted);
    console.log(`Decrypted ${inputFile} to ${outputFile}`);
  });
};

decryptFile("character.enc", "character.glb", "Character3D#@");
