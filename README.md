
Its Jeopardy!
===================

For Project One I decided to try my hand at implementing a Jeopardy-like game for mathematics. With that in mind, I'd like to outline some goals I set for myself:

* Use as much ECMAScript 2015 (ES6) as possible
* Test all the things
* Have continuous testing and delivery in place
* Try and make it relatively easy to add / replace questions and categories

A demo of the finished game can be seen [here](http://dydx.github.io/jeopardy). The Trello board I used to help coordinate my efforts can be seen [here](https://trello.com/b/mdHJ5k2Z/week-one-project-jeopardy). 

----------

Wireframes
--------------
![Main](http://imgur.com/LyDbBca.png)

![Questions](http://imgur.com/AoaddE4.png)


Architecture
-------------
The final production version of the application is engineered as a series of composable classes for handling the overall Game, the Categories, and the Questions. There is a function to render the DOM of the board based on the contents of the Game object.

These models are built using ECMAScript 2015 classes (which are syntactic sugar that transforms into prototypes).

### Game
The `Game` object controls categories, retrieving `Question` objects, and managing the `score`. It is fairly easy to set up, and will let you know early if any of the parameters are incorrect.

### Category
The `Category` object controls the naming of its given category as well as containing relevant questions. 

### Question
The `Question` object  controls a given question's `text`, it's points `value`, and it's right `answer`. 

> **Example:**

> ```
> var game = new Game()
> var addition = new Category('addition')
> addition.addQuestion(new Question('What is 1 + 2', 200, '3')
> game.addCategory(addition)
> ```

#### Chaining
Methods on `Game` and `Category` are chainable, meaning you can run operations like this:

> **Example:**
> ```
> var addition = new Category('addition')
> addition
>   .addQuestion(new Question('What is 1 + 2', 200, '3')
>   .addQuestion(new Question('What is 7 + -9', 400, '-2')
>   .addQuestion(new Question('What is 117 + 32', 800, '49')
> ```

----------

Testing
-------------

### Jasmine

[![Build Status](https://travis-ci.org/dydx/jeopardy.svg?branch=master)](https://travis-ci.org/dydx/jeopardy)

I chose to focus a lot of my attention on the backend of the application. In doing so, I decided to implement unit tests for the various classes and objects of my system

The test suite I chose is called [Jasmine](https://github.com/jasmine/jasmine), and makes writing tests fairly simple.

An example of a test is as follows:

> **Questions Test:**
> ```
> describe('Question Class', function () {
>   describe('#new', function () {
>      it('returns a new object', function (done) {
>         let question = new Question('Does this work?', 200, 'Yes');
>         expect(question).toEqual(jasmine.any(Question))
>      })
>   })
> })
> ```


----------

Deployments
-------------

### GitHub Pages
My deployments are being handled by GitHub Pages.

### Travis CI
I didn't want to be tasked with manually merging `master` into `gh-pages` and running deployments my self, as I was working on a feature branch / Git Flow style of development, so I decided to take advantage of [Travis CI](https://travis-ci.org)

Travis CI is a testing-as-a-service platform that will run tests based off of Git hooks, and then allows you to perform actions at various stages of testing.

My "continuous deployment" strategy is based on successful builds of the `master` branch, and there is a deploy hook tied into the `after_success` step. At this point, I have a bash script set up to run my Gulp build, switch into the directory, create a new git repo, then set the upstream to the remote `gh-pages` branch and push.

This allows me to continuously deliver code that always passes tests and is working.

> **deploy.sh**
> ```
> #!/bin/bash
> 
> set -e
>
> echo -e "Deploying to production... "
>
> echo -e " -> creating app directories"
> echo -e " -> compiling javascript and sass into app"
> gulp # this generates app/js and app/css
> mv index.html app/index.html
>
> rev=$(git rev-parse --short HEAD)
>
> echo -e " -> setting up deploy repo"
> cd app
> git init
> 
> git config user.name "Travis CI"
> git config user.email "joshua.sandlin@gmail.com"
>
> git add .
>
> echo -e " -> committing app deployment"
> git commit -m "Deploy to GitHub Pages" -a
>
> echo -e " -> pushing app deployment"
> git remote add upstream "https://$GH_TOKEN@github.com/dydx/jeopardy.git"
> git fetch upstream
> git reset upstream/gh-pages
> 
> echo -e " -> sprinkling on magic dust"
> touch .
>
> git add -A .
> git commit -m "GitHub Pages deployed on ${rev}" -a
> git push -q upstream HEAD:gh-pages
>
> echo -e "Production app is deployed (hopefully!)"
> ```

----------

Interesting Features
-------------
### ECMAScript 20015 (ES6)
I made **HEAVY** use of ES6 features such as the new [Class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings).

### Fully dynamic rendering
The base HTML is pretty bare-- I'm building the whole board with a `render` function that accepts the main `Game` object and iterates over it to produce the appropriate HTML and event listeners

----------
Challenges Faced
-------------
### timing out alerts / prompts
I tried to get modals working, but there seemed to be some conflicts between the necessary JavaScript to do this and maintain a fully dynamic page. Alerts and Prompts block the main thread until input is received, so there is no way to just do a `setTimeout` on one and make it go away after five seconds-- the intent behind this is to simulate a real Jeopardy game where you have a limited time to answer questions

### automatic deployments
This took hours to get right. Ugh.

----------

Future Ideas
-------------

### reset
I didn't really focus on being able to reset the board, and I'm not exactly sure how to accomplish this asides from just forcing a page refresh.

### multi-player
this is something I'd like to be able to implement

### daily doubles
This would require some hacking on the Questions object and a flag on the constructor / prototype to enable "doubling" of the score. I could manually set one, but that's no fun.

