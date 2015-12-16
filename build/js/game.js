'use strict'
module.exports = class {
  constructor () {
    this.score = 0
    this.categories = []
  }

  addCategory (category) {
    if (typeof category !== 'object') {
      throw new Error('categories must be Category objects')
    }
    this.categories.push(category)
    return this
  }

  getQuestion (category, question) {
    if (typeof category !== 'number') {
      throw new Error('invalid category input for #getQuestion')
    } else if (typeof question !== 'number') {

      throw new Error('invalid question input for #getQuestion')
    }
    return this.categories[category].questions[question]
  }

  updateScore (value) {
    if (typeof value !== 'number') {
      throw new Error('invalid update value given')
    }
    this.score += value
  }
}
