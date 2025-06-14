import {readFile, writeFile} from 'fs/promises';

const NAME = "Roy";
const EMAIL = "doug@dochne.com";
const PAINTING = "0000000011111001000100100010001110000000000011100010001001000100011100000000000111000100010010001000000000111110000100000010000111110000000001111100011000000110001111100000000011111001010100101010000000000000100000000001110001000100100010000000000111000100010010001000111000000000001111001000000111110010000000111100000000000000000000000000000000000000000000000000000"

const ci =
    (await readFile("roy.yml")).toString()
    .replace("REPLACE_NAME_HERE", NAME)
    .replace("REPLACE_EMAIL_HERE", EMAIL)
    .replace("REPLACE_PAINTING_HERE", PAINTING)

const roy =
    (await readFile("roy.mjs")).toString()

const readme = 
    (await readFile("roy-readme.md")).toString();

const updateRoy = (await readFile("roy-update.sh")).toString();

const commits = [
    `blob\n` +
    `mark :1\n` +
    `data ${ci.length}\n` +
    `${ci}\n` +

    `blob\n` +
    `mark :2\n` +
    `data ${roy.length}\n` +
    `${roy}\n` +

    `blob\n` +
    `mark :3\n` + 
    `data ${readme.length}\n` +
    `${readme}\n` +

    `blob\n` +
    `mark :4\n` + 
    `data ${updateRoy.length}\n` +
    `${updateRoy}\n` +

    `commit refs/heads/main\n` +
    `committer ${NAME} <${EMAIL}> 1262347200 +0000\n` + 
    `data 7\n` + 
    `initial\n` +
    `M 100644 :1 .github/workflows/roy.yml\n` +
    `M 100644 :2 roy.mjs\n` +
    `M 100644 :3 README.md\n` +
    `M 100644 :4 roy-update.sh\n`
];

writeFile("/tmp/fast-import.txt", commits.join("\n"));
console.log("Written to /tmp/fast-import.txt");
