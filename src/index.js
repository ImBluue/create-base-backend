#!/usr/bin/env node

const inquirer = require('inquirer');
const { generate } = require('./generate.js');
const prompts = require('./prompts.js');

const main = async () => {
    console.log("Basic Backend by ImBluue");
    const answer = await inquirer.prompt(prompts);
    await generate(answer);
    console.log(`Project initialized!

    What's next?

    1. Go to your project folder
    cd ${answer.name}

    2. Install Dependencies
    npm install

    3. Copy .env.template to .env and fill it

    4. Run the project with npm run start or npm run start:dev !

    `);
}

main();