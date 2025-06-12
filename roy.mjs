import { execSync, spawnSync } from 'child_process';
import { env, exit } from 'process'

function exec(string) {
    return execSync(string).toString();
}

function getFirstSundayBeforeOneYearAgo() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    date.setDate(date.getDate() - date.getDay());
    return date;
}

const trigger = env.GITHUB_EVENT_NAME
const painting = env.PAINTING.split("");

console.log(`Trigger is ${trigger}`)
const initialCommit = exec("git rev-list --max-parents=0 HEAD").trim();
if (trigger === "push") {
    const lastCommit = exec("git log -1 --pretty=%B").trim();
    console.log(`Last commit was '${lastCommit}'`)
    if (lastCommit !== "initial") {
        console.log("Last commit wasn't initial and we were triggered by a push! Skipping!");
        exit(0);
    }
} else if (trigger === "schedule") {
    console.log(`First commit was ${initialCommit}`)
    exec(`git reset --hard ${initialCommit}`)
    console.log(`Reset repo to ${initialCommit}`)
}


// Note: It looks like GitHub has a limit of reading the last 1000 commits you put in a given repo
// Easiest way to resolve this is to have a lower number so (perDay * value doesn't exceed 1,000) and 
// Then write to say, 5 different repos
const perDay = 10;
const commits = [];
const date = getFirstSundayBeforeOneYearAgo();
let n = 0;
for (const value of painting) {
    date.setDate(date.getDate() + 1);
    for (let x=0; x<perDay * value; x++) {
        commits.push(
            `commit refs/heads/main\n` +
            `mark :${n + 1}\n` +
            `committer ${env.NAME} <${env.EMAIL}> ${Math.floor(date.getTime() / 1000)} +0000\n` + 
            `data 6\n` + 
            `splash\n` + 
            `from ` + (n === 0 ? initialCommit : `:${n}`) + `\n`
        )
        n++;
    }
}

const response = spawnSync('git', ['fast-import', '--force'], {
    input: commits.join('')
});

console.log(response.output.toString());
exec("git push --force")