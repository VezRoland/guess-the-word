import { words, abc } from './words.js'
import { initTable, clearTable, submitInput } from './game.js'
import { store, formatTime } from './utils.js'

const startDialog = document.querySelector('#startDialog')
startDialog.showModal()
startDialog.onclose = startGame

export let timeLimitMs = 110000
export let randomWord

let timer

// Time store: renders formatted time, and ends game when the time is up
const time = store(timeLimitMs, time => {
  document.querySelector('#time').textContent = formatTime(time)
  if (time === 0) return endGame()
})

export let tries = 0

// Matches store: ends game when all the letters are revealed
export const matches = store(0, matches => {
  document.querySelector('#matches').textContent = matches
  randomWord && matches === randomWord.length ? endGame() : null
})

function startGame() {
  randomWord = words[Math.round(Math.random() * words.length)]

  time.set(timeLimitMs)

  matches.set(0)

  timer = setInterval(() => time.increase(-1000), 1000)

  initTable(Array.from(randomWord))
  Array.from(document.querySelectorAll('#letterButton')).forEach(button => button.removeAttribute('disabled'))
}

function endGame() {
  startDialog.showModal()

  clearInterval(timer)
  clearTable()
}

Array.from(abc).forEach(letter => {
  const letterItem = document.createElement('li')

  const letterButton = document.createElement('button')
  letterButton.id = 'letterButton'
  letterButton.textContent = letter
  letterButton.onclick = () => submitInput(letter)

  letterItem.appendChild(letterButton)
  document.querySelector('#letterButtons').appendChild(letterItem)
})