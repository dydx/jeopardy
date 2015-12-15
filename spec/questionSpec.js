'use strict'
var Question = require('../build/js/question')

describe('Questions Class', function () {

  describe('#new', function () {
    it('returns a new Questions object when instantiated', function (done) {
      let text = 'Does this work?'
      let value = 200
      let answer = 'yes'
      let question = new Question(text, value, answer)
      expect(question).toEqual(jasmine.any(Question))
      done()
    })

    it('throws an error when the incorrect number of arguments are used', function (done) {
      let text = 'Does thi work?'
      let value = 200
      expect(function () {
        new Question(text, value)
      }).toThrow()
      done()
    })
  })

  describe('.text', function () {
    it('has a text value', function (done) {
      let text = 'Does this work?'
      let value = 200
      let answer = 'yes'
      let question = new Question(text, value, answer)
      expect(question.text).toEqual(jasmine.any(String))
      expect(question.text).toEqual(text)
      done()
    })

    it('rejects non-string values', function (done) {
      let text = 331337
      let value = 200
      let answer = 'yes'
      expect(function () {
        new Question(text, value, answer)
      }).toThrow()
      done()
    })
  })

  describe('.value', function () {
    it('has a text value', function (done) {
      let text = 'Does this work?'
      let value = 200
      let answer = 'yes'
      let question = new Question(text, value, answer)
      expect(question.value).toEqual(jasmine.any(Number))
      expect(question.value).toEqual(value)
      done()
    })

    it('rejects non-integer values', function (done) {
      let text = 'Does this work?'
      let value = '200'
      let answer = 'yes'
      expect(function () {
        new Question(text, value, answer)
      }).toThrow()
      done()
    })
  })

  describe('.answer', function () {
    it('has a text value', function (done) {
      let text = 'Does this work?'
      let value = 200
      let answer = 'yes'
      let question = new Question(text, value, answer)
      expect(question.answer).toEqual(jasmine.any(String))
      expect(question.answer).toEqual(answer)
      done()
    })

    it('rejects non-string values', function (done) {
      let text = 'Does this work?'
      let value = 200
      let answer = true
      expect(function () {
        new Question(text, value, answer)
      }).toThrow()
      done()
    })
  })
})
