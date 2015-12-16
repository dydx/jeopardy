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

// just checking to see if this shows up after building
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
  var categoryIdx = Number(this.dataset.cat)
  var questionIdx = Number(this.dataset.card)
  var question = game.getQuestion(categoryIdx, questionIdx)
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
