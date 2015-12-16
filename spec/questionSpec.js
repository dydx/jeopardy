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

    it('rejects non-string values for .text', function (done) {
      let text = 331337
      let value = 200
      let answer = 'yes'
      expect(function () {
        new Question(text, value, answer)
      }).toThrow()
      done()
    })

    it('rejects non-integer values for .value', function (done) {
      let text = 'Does this work?'
      let value = '200'
      let answer = 'yes'
      expect(function () {
        new Question(text, value, answer)
      }).toThrow()
      done()
    })

    it('rejects non-string values for .answer', function (done) {
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
