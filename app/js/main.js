(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
module.exports = class {
  constructor (name) {
    this.name = name
    this.questions = []
  }

  addQuestion (question) {
    this.questions.push(question)
    return this
  }
}

},{}],2:[function(require,module,exports){
'use strict'
module.exports = class {
  constructor () {
    this.score = 0
    this.categories = []
  }

  addCategory (category) {
    this.categories.push(category)
    return this
  }

  getQuestion (category, question) {
    return this.categories[category].questions[question]
  }

  updateScore (value) {
    this.score += value
  }
}

},{}],3:[function(require,module,exports){
'use strict'

var Question = require('./question')
var Category = require('./category')
var Game = require('./game')

// instantiate some categories
var addition = new Category('Addition')
var subtraction = new Category('Subtraction')
var multiplication = new Category('Multiplication')
var division = new Category('Division')

// add questions
addition
  .addQuestion(new Question('What is 1 + 2', 200, '3'))
  .addQuestion(new Question('What is 55 + 17', 400, '72'))
  .addQuestion(new Question('What is 117 + -32', 800, '85'))
  .addQuestion(new Question('What is -51 + 2', 1600, '-49'))

subtraction
  .addQuestion(new Question('What is 1 + 2', 200, '3'))
  .addQuestion(new Question('What is 55 + 17', 400, '72'))
  .addQuestion(new Question('What is 117 + -32', 800, '85'))
  .addQuestion(new Question('What is -51 + 2', 1600, '-49'))

multiplication
  .addQuestion(new Question('What is 1 + 2', 200, '3'))
  .addQuestion(new Question('What is 55 + 17', 400, '72'))
  .addQuestion(new Question('What is 117 + -32', 800, '85'))
  .addQuestion(new Question('What is -51 + 2', 1600, '-49'))

division
  .addQuestion(new Question('What is 1 + 2', 200, '3'))
  .addQuestion(new Question('What is 55 + 17', 400, '72'))
  .addQuestion(new Question('What is 117 + -32', 800, '85'))
  .addQuestion(new Question('What is -51 + 2', 1600, '-49'))

// instantiate a `game` object and add our categories / questions to it
var game = new Game()

game
  .addCategory(addition)
  .addCategory(subtraction)
  .addCategory(multiplication)
  .addCategory(division)

function render (game) {
  return game.categories.map(function (category, catIndex) {
    return `
    <section class="column">
      <div class="category" data-cat="${catIndex}">${category.name}</div>
        ${category.questions.map(function (question, quesIndex) {
          return `<div class="card" data-cat="${catIndex}" data-card="${quesIndex}">${question.value}</div>`
        }).join('')}
    </section>`
  }).join('')
}

var board = render(game)
// crimes against humanity
document.querySelector('main').innerHTML = board

// select all of our question cards
var cards = document.querySelectorAll('.card')

function triggerQuestionPrompt (event) {
  var question = game.getQuestion(this.dataset.cat, this.dataset.card)
  var reply = prompt(question.text)
  if (reply == question.answer) {
    game.updateScore(question.value)
    this.classList.add('correct')
  } else {
    game.updateScore(-question.value)
    this.classList.add('incorrect')
  }
  this.removeEventListener('click', triggerQuestionPrompt, false)
  document.querySelector('#score').textContent = `$${game.score}`
}

// apply event listener to each question card
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', triggerQuestionPrompt)
}

},{"./category":1,"./game":2,"./question":4}],4:[function(require,module,exports){
'use strict'
module.exports = class {
  constructor (text, value, answer) {
    if(typeof text !== 'string') {
      throw new Error('question text must be a string')
    } else if (typeof value !== 'number') {
      throw new Error('value must be an integer')
    } else if (typeof answer !== 'string') {
      throw new Error('answer text must be a string')
    }

    this.text = text
    this.value = value
    this.answer = answer
  }
}

},{}]},{},[3]);
