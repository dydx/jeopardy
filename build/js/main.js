'use strict'

var score = 0

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

console.log(game)

var question = game.getQuestion(0, 2)
if (question.answer == '84') {
  game.updateScore(question.value)
} else {
  game.updateScore(-question.value)
}

console.log(game)

game.categories.forEach(function (category) {
  console.log(category.name)
  category.questions.forEach(function (question) {
    console.log(question.text)
  })
})

// this shit is going BYEBYE
var questions = {
  1 : {
    'name': 'Addition',
    'questions': {
      1 : {
        'text'    : 'What is 1 + 2?',
        'value'   : 200,
        'answer' : '3'
      },
      2 : {
        'text'    : 'What is 55 + 17?',
        'value'   : 400,
        'answer' : '72'
      },
      3 : {
        'text'    : 'What is 117 + -32?',
        'value'   : 800,
        'answer' : '85'
      },
      4 : {
        'text'    : 'What is -51 + 2?',
        'value'   : 1600,
        'answer' : '-49'
      }
    }
  },
  2 : {
    'name': 'Subtraction',
    'questions': {
      1 : {
        'text'    : 'What is 1 + 2?',
        'value'   : 200,
        'answer' : '3'
      },
      2 : {
        'text'    : 'What is 55 + 17?',
        'value'   : 400,
        'answer' : '72'
      },
      3 : {
        'text'    : 'What is 117 + -32?',
        'value'   : 800,
        'answer' : '85'
      },
      4 : {
        'text'    : 'What is -51 + 2?',
        'value'   : 1600,
        'answer' : '-49'
      }
    }
  },
  3 : {
    'name': 'Multiplication',
    'questions': {
      1 : {
        'text'    : 'What is 1 + 2?',
        'value'   : 200,
        'answer' : '3'
      },
      2 : {
        'text'    : 'What is 55 + 17?',
        'value'   : 400,
        'answer' : '72'
      },
      3 : {
        'text'    : 'What is 117 + -32?',
        'value'   : 800,
        'answer' : '85'
      },
      4 : {
        'text'    : 'What is -51 + 2?',
        'value'   : 1600,
        'answer' : '-49'
      }
    }
  },
  4 : {
    'name': 'Division',
    'questions': {
      1 : {
        'text'    : 'What is 6 / 3?',
        'value'   : 200,
        'answer' : '2'
      },
      2 : {
        'text'    : 'What is 450 / 5',
        'value'   : 400,
        'answer' : '90'
      },
      3 : {
        'text'    : 'What is 1000 / -10?',
        'value'   : 800,
        'answer' : '-100'
      },
      4 : {
        'text'    : 'What is -51 / 17',
        'value'   : 1600,
        'answer' : '-3'
      }
    }
  },
}

// I'd really like to be able to generate the grid based off of this data...
// not really sure how to do this in a client-side setup with partials and whatnot.

var cards = document.querySelectorAll('.card')
var categories = document.querySelectorAll('.category')

// set up categories
for (var i = 0; i < Object.keys(questions).length; i++) {
  categories[i].textContent = questions[i + 1].name
}

function updateScore () {
  document.querySelector('#score').textContent = `$${score}`
}

// set up event listeners for question cards
function askQuestion(event) {
  var questionObject = questions[this.dataset.cat].questions[this.dataset.card]
  var question = questionObject.text
  var answer = questionObject.answer
  var reply = prompt(`${question}:`)
  if (answer == reply) {
    score += questionObject.value
    this.classList.add('correct')
  } else {
    score -= questionObject.value
    this.classList.add('incorrect')
  }
  this.removeEventListener('click', askQuestion, false)
  updateScore()
}

// apply event listener to each question card
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', askQuestion)
}


