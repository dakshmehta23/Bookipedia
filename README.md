# Bookipedia
![server tests](https://github.ncsu.edu/Bookipedia/CSC510_SE_Project/actions/workflows/server.yml/badge.svg)

Bookipedia is an online book store where the customers can order their favourite books.

## Team Members <br>
- [Ashvin Gaonkar](https://github.ncsu.edu/agaonka2)
- [Daksh Mehta](https://github.ncsu.edu/dmehta4) 
- [Harsh Joshi](https://github.ncsu.edu/hjoshi2)
- [Meghaj Agrawal](https://github.ncsu.edu/magrawa7) 
- [Suparno Saha](https://github.ncsu.edu/ssaha7) 

## Kanban Board
- [Kanban](https://github.ncsu.edu/Bookipedia/CSC510_SE_Project/projects/1)

## Tech Stack<br>

- Frontend: 
  - Angular
- Backend : 
  - Node.js
  - JavaScript  
- Testing :
  - Jasmine
  - Cucumber
  - Protractor
  - Karma
 
 ## How to run<br>
 Make sure you have installed node and angular cli<br>
### Steps to run the server- <br>
> 1. Open terminal and run "cd Server". <br>
> 2. Run "npm install" to install all the dependencies. <br>
> 3. Run "node server.js" to start the server. <br>

### Steps to run the client- <br>
> 1. Open a new terminal and run "cd GUI". <br>
> 2. Run "npm install" to install all the dependencies. <br>
> 3. Run "ng serve --open" to start the server and open the browser. <br>

### Steps to run backend unit tests- <br>
> 1. Open a terminal and run "cd Server". <br>
> 2. Run "npm run coverage" to run the tests and generate a coverage summary that shows the % of the code being tested <br>

### Steps to run frontend unit tests- <br>
> 1. Open a terminal and run "cd GUI". <br>
> 2. Run "ng test" to run the tests and generate a coverage summary that shows the % of the code being tested <br>

### Steps to run acceptance tests- <br>
> 1. Start the server and the GUI. <br>
> 2. Make sure chrome is updated to version 110. <br>
> 3. Go to the tests-acceptance folder and run these commands: <br>
    - "npm install" <br>
    - "npm run webdriver-update" <br>
    - "npm run webdriver-start" <br>
> 4. Run "npm test"
