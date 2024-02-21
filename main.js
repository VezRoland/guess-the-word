import { words } from './words.js'
import { initTable, clearTable } from './game.js'
import { store } from './utils.js'

const startDialog = document.querySelector('#startDialog')
startDialog.showModal()
startDialog.onclose = startGame

export let timeLimitMs = 10000
export let randomWord

const time = store(0, time => document.querySelector('#time').textContent = time)
let timer
let timeout

export let tries = 0
export const matches = store(0, matches => {
  document.querySelector('#matches').textContent = matches
  randomWord && matches === randomWord.length ? endGame() : null
})

function startGame() {
  randomWord = words[Math.round(Math.random() * words.length)]
  console.log(randomWord)

  time.set(0)

  matches.set(0)

  timer = setInterval(() => time.increase(1000), 1000)
  timeout = setTimeout(endGame, timeLimitMs)

  initTable(Array.from(randomWord))
}

function endGame() {
  startDialog.showModal()

  clearInterval(timer)
  clearTimeout(timeout)
  clearTable()
}