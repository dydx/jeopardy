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
    return this.categories[category].questions[question]
  }

  updateScore (value) {
    this.score += value
  }
}
