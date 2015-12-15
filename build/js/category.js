'use strict'
module.exports = class {
  constructor (name) {
    if (typeof name !== 'string') {
      throw new Error('category name must be a string')
    }

    this.name = name
    this.questions = []
  }

  addQuestion (question) {
    if (typeof question !== 'object') {
      throw new Error('questions must be Question objects')
    }
    this.questions.push(question)
    return this
  }
}
