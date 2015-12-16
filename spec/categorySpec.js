'use strict'
var Category = require('../build/js/category')
var Question = require('../build/js/question') 

describe('Categories Class', function () {
  describe('#new', function () {
    it('returns a new Categories object when instantiated', function (done) {
      let name = 'Testing'
      let category = new Category(name)
      expect(category).toEqual(jasmine.any(Category))
      done()
    })

    it('throws an error when the incorrect number of arguments are used', function (done) {
      expect(function () {
        new Category()
      }).toThrow()
      done()
    })
  })

  describe('.name', function () {
    it('has a name value', function (done) {
      let name = 'Testing'
      let category = new Category(name)
      expect(category.name).toEqual(name)
      done()
    })

    it('rejects non-string values', function (done) {
      let name = 331337
      expect(function () {
        new Category(name)
      }).toThrow()
      done()
    })
  })

  describe('#addQuestion', function () {
    it('starts with an empty questions array', function (done) {
      let name = 'Testing'
      let category = new Category(name)
      expect(category.questions).toEqual([])
      done()
    })

    it('can append new questions', function (done) {
      let name = 'Testing'
      let category = new Category(name)
      category.addQuestion(new Question('a', 1, 'a'))
      expect(category.questions.length).toEqual(1)
      done()
    })

    it('does not allow incorrect question objects to be added', (done) => {
      let name = 'Testing'
      let category = new Category(name)
      expect(function () {
        category.addQuestion('whoa!')
      }).toThrow()
      done()
    })
  })
})
