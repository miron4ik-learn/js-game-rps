class Game {
  constructor() {
    this.$refs = {
      score: document.getElementById('score'),
      result: document.getElementById('result'),
      options: document.querySelectorAll('.options__block')
    }

    this.compScore = 0
    this.userScore = 0
  }

  init() {
    this.$refs.options.forEach(option => {
      option.addEventListener('click', e => {
        const userChoise = option.dataset.option
        this.game(userChoise.toLowerCase())
      })
    })
  }

  game(userChoise) {
    const rand = Math.round(Math.random(0, 1) * 2)
    const compChoise = [ 'rock', 'paper', 'scissors' ][rand]

    const userWin = () => this.userWin(userChoise, compChoise)
    const compWin = () => this.compWin(compChoise, userChoise)

    const wins = {
      rp: userWin,
      rs: compWin,
      pr: compWin,
      ps: userWin,
      sp: compWin,
      sr: userWin,
    }

    const ch = compChoise[0] + userChoise[0]
    wins[ch] ? wins[ch]() : this.draw(userChoise)
  }

  compWin(compChoise, userChoise) {
    this.compScore++
    this.setScore()
    this.setResult(`${capitalize(compChoise)} covers ${capitalize(userChoise)}. Comp win!`)
    this.optionAnimation(userChoise, 'loss')
  }

  userWin(userChoise, compChoise) {
    this.userScore++
    this.setScore()
    this.setResult(`${capitalize(userChoise)} covers ${capitalize(compChoise)}. User win!`)
    this.optionAnimation(userChoise, 'win')
  }

  draw(userChoise) {
    this.setResult(`It's a draw. Keep going!`)
    this.optionAnimation(userChoise, 'draw')
  }

  optionAnimation(choise, selector) {
    const link = document.querySelector(`.${choise[0]}`)
    link.classList.add(selector)

    setTimeout(() => {
      link.classList.remove(selector)
    }, 700)
  }

  setResult(value) {
    this.$refs.result.innerHTML = value
  }

  setScore() {
    this.$refs.score.innerHTML = `${this.userScore}:${this.compScore}`
  }
}

new Game().init()

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}