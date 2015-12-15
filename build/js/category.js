'use strict'
module.exports = class {
  constructor (name) {
    this.name = name
    this.questions = []
  }

  addQuestion (question) {
    this.questions.push(question)
    return this
  }
}
