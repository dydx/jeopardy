'use strict'

// not really sure what to designate these as. They're "classes", but they're behaving
// more like value objects with logic. At any rate, they are SO much more testable
class Question {
  constructor (text, value, answer) {
    this.text = text
    this.value = value
    this.answer = answer
  }
}

class Category {
  constructor(name) {
    this.name = name
    this.questions = []
  }

  addQuestion (question) {
    this.questions.push(question)
    return this
  }
}

class Game {
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

// I should be taken out back and shot for this... but I love it..
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
document.querySelector('main').innerHTML = board

// select all of our question cards
var cards = document.querySelectorAll('.card')
// select all of our category titles
var categories = document.querySelectorAll('.category')

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
  // cards[i].addEventListener('click', askQuestion)
  cards[i].addEventListener('click', triggerQuestionPrompt)
}


