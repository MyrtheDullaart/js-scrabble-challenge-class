class Scrabble {
  constructor(word) {
    this.word = word
    this.valid = this.checkValidWord()
    this.splitWord = this.splitWords()
    this.values = {
      A: 1,
      B: 3,
      C: 3,
      D: 2,
      E: 1,
      F: 4,
      G: 2,
      H: 4,
      I: 1,
      J: 8,
      K: 5,
      L: 1,
      M: 3,
      N: 1,
      O: 1,
      P: 3,
      Q: 10,
      R: 1,
      S: 1,
      T: 1,
      U: 1,
      V: 4,
      W: 4,
      X: 8,
      Y: 4,
      Z: 10
    }
  }

  checkValidWord() {
    if (!this.word || this.word.includes(' ')) {
      return false
    } else {
      return true
    }
  }

  splitWords() {
    if (this.valid && this.word[0] !== '{' && this.word[0] !== '[') {
      let word = this.word.toUpperCase()

      if (word.includes('{') && word.includes('}')) {
        const tempWord = word.split('{')
        const tempWord2 = tempWord[1].split('}')
        word = tempWord[0] + tempWord2[1]
      } else if (word.includes('[') && word.includes(']')) {
        const tempWord = word.split('[')
        const tempWord2 = tempWord[1].split(']')
        word = tempWord[0] + tempWord2[1]
      } else {
        return word
      }

      return word
    } else if (
      (this.valid && this.word[0] === '{') ||
      (this.valid && this.word[0] === '[')
    ) {
      const word = ''
      return word
    } else {
      return this.word
    }
  }

  detectBrackets() {
    if (this.valid) {
      let total = 0
      const word = this.word.toUpperCase()

      if (word.includes('{') && word.includes('}')) {
        const re = /[^{]+(?=\})/g
        const found = word.match(re).toString()

        for (const letter of found) {
          total += this.values[letter] * 2
        }
      } else if (word.includes('[') && word.includes(']')) {
        const re = /(?<=\[).+?(?=\])/g
        const found = word.match(re).toString()

        for (const letter of found) {
          total += this.values[letter] * 3
        }
      }

      return total
    }
  }

  score() {
    let total = 0

    if (!this.valid) {
      return total
    } else {
      total = this.detectBrackets()
      for (const letter of this.splitWord) {
        total += this.values[letter]
      }
    }

    return total
  }
}

module.exports = Scrabble
