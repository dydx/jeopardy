'use strict'

var questions = {
  1 : {
    'name': 'Addition',
    'questions': {
      1 : {
        'text'    : 'What is 1 + 2?',
        'value'   : 200,
        'correct' : 2,
        'choices' : [
          '4',
          '6',
          '3',
          '1'
        ]
      },
      2 : {
        'text'    : 'What is 55 + 17?',
        'value'   : 400,
        'correct' : 2,
        'choices' : [
          '78',
          '89',
          '72',
          '62'
        ]
      },
      3 : {
        'text'    : 'What is 117 + -32?',
        'value'   : 800,
        'correct' : 1,
        'choices' : [
          '95',
          '85',
          '97',
          '84'
        ]
      },
      4 : {
        'text'    : 'What is -51 + 2?',
        'value'   : 1600,
        'correct' : 1,
        'choices' : [
          '48',
          '-49',
          '54',
          '-53'
        ]
      }
    }
  }
}

var cards = document.querySelectorAll('.card')

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function (event) {
    var questionObject = questions[this.dataset.cat].questions[this.dataset.card]
    var question = questionObject.text
    var answer = questionObject.choices[questionObject.correct]
    var reply = prompt(question)
    if (answer == reply) {
      this.classList.add('correct')
    } else {
      this.classList.add('incorrect')
    }
    this.removeEventListener('click')
  })
}


