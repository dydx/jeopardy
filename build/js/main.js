'use strict'

var score = 0

// is there a way to extract a few objects out of this and compose them together?
// also, auto incrementing these fields?

class Question {
  constructor (text, value, answer) {
    this.text = text
    this.value = value
    this.answer = answer
  }

  checkAnswer(answer) {
    return answer == this.answer
  }
}

class Category {
  constructor(name) {
    this.name = name
    this.questions = []
  }

  addQuestion (question) {
    this.questions.push(question)
  }
}

class Game {
  constructor () {
    this.categories = []
  }

  addCategory (category) {
    this.categories.push(category)
  }
}

// instantiate a new instance of the game
var game = new Game()

// instantiate some categories
var addition = new Category()

// add questions
addition.addQuestion(new Question('What is 1 + 2', 200, '3'))
addition.addQuestion(new Question('What is 55 + 17', 400, '72'))
addition.addQuestion(new Question('What is 117 + -32', 800, '85'))
addition.addQuestion(new Question('What is -51 + 2', 1600, '-49'))

// add 
game.addCategory(addition)
console.log(game)

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


