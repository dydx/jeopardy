'use strict'
var Game = require('../build/js/game')
var Question = require('../build/js/question')
var Category = require('../build/js/category')

describe('Game Class', function () {
  describe('#new', function () {
    it('returns a new Game object when instantiated', function (done) {
      let game = new Game()
      expect(game).toEqual(jasmine.any(Game))
      done()
    })
  })

  describe('#addCategory', function () {
    it('starts with an empty categories array', function (done) {
      let game = new Game()
      expect(game.categories).toEqual([])
      done()
    })

    it('can append new categories', function (done) {
      let game = new Game()
      let category = new Category('Testing')
      game.addCategory(category)
      expect(game.categories.length).toEqual(1)
      done()
    })

    it('rejects non-Category items', function (done) {
      let game = new Game()
      expect(function () {
        game.addCategory('testing')
      }).toThrow()
      done()
    })
  })
})
