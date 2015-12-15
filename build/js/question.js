'use strict'
module.exports = class {
  constructor (text, value, answer) {
    if(typeof text !== 'string') {
      throw new Error('question text must be a string')
    } else if (typeof value !== 'number') {
      throw new Error('value must be an integer')
    } else if (typeof answer !== 'string') {
      throw new Error('answer text must be a string')
    }

    this.text = text
    this.value = value
    this.answer = answer
  }
}
