'use strict'

class Card {
  constructor(category, number) {
    this.category = category
    this.number = number
    this.question = ""
    this.answers = []
  }
}

class Category {
  constructor(categoryName, categoryNumber) {
    this.name = categoryName
    this.number = categoryNumber
    this.questions = []
  }
}

var cards = document.querySelectorAll('.card')

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function (event) {
    this.classList.toggle('correct', 'incorrect')
  })
}

