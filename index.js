//Include packages needed for this application
const inquier= require('inquirer');
const fs= require('fs');
const util = require('util');
// getting the markdown js file which is needed to complete the readme
const generateMarkdown= require('./utils/generateMarkdown');
// Create an array of questions for user input
const questions= 
    [
    {   type: 'input',
        name: 'author',
        message: "What is the name of your project?"
    },
    {   type: 'input',
        name: 'email',
        message: "What is your email?"
    },
    {   type: 'input',
        name: 'github',
        message: "What is your github username?"
    },
    {   type: 'input',
        name: 'title',
        message: "What is your name?"
    },
    {   type: 'input',
        name: 'description',
        message: "Give your project a description"
    },
    {   type: 'input',
        name: 'install',
        message: "Give a description on how to install the project"
    },
    {   type: 'input',
        name: 'usage',
        message: "How do you use this project?"
    },
    {   type: 'input',
        name: 'credits',
        message: "Show appreciation to those who contributed to this project"
    },
    {   type: 'list',
        name: 'license',
        message: "Select a License for this project",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
    }
    
    ];
    
    // function allows for writing README file
    function writeToFile(fileName, data) {
        fs.writeFile(fileName, data, err =>{
            if (err) {
               return console.error("err");
            }
            else{
                console.log("Readme generated");
            }
        });
    }
    // making this a global const saying util module to callback the function wrtieToFile when I need to
    const asyncWriteFile= util.promisify(writeToFile);
//async function to initialize app
async function init() {
    //using the try statment because just in case there was an error it would catch something went wrong
    try {
        // data=answers
        const data= await inquier.prompt(questions);
        // gets answers, puts them into the markdown file
        const markdown= generateMarkdown(data);
        // save readme file
        await asyncWriteFile('README.md', markdown);
    } catch (error) {
        console.error("error");
    }
}    
// initialize app
init();
