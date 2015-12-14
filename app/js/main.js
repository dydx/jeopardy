(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{}]},{},[1]);
