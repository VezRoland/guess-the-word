import { words, abc } from './words.js'
import { initTable, clearTable, submitInput } from './game.js'
import { store, formatTime } from './utils.js'

const startDialog = document.querySelector('#startDialog')

// Dialog text
const startDialogTitle = document.querySelector('#startDialogTitle')
const startDialogText = document.querySelector('#startDialogText')
const startDialogButton = document.querySelector('#startDialogButton')

export let timeLimitMs = 110000
export let randomWord

let timer

// Time store: renders formatted time, and ends game when the time is up
const time = store(timeLimitMs, time => {
  if (document.querySelector('#time')) document.querySelector('#time').textContent = formatTime(time)
  if (time === 0) {
    startDialogTitle.textContent = 'Ajjaj!'
    startDialogText.textContent = 'Sajnos kifutottál az időből. Próbáld újra!'
    endGame()
  }
})

export let tries = 0

// Matches store: ends game when all the letters are revealed
export const matches = store(0, matches => {
  if (randomWord && matches === randomWord.length) {
    startDialogTitle.textContent = 'Hurrá!'
    startDialogText.innerHTML = `Sikeresen kitaláltad a szót <b>${formatTime(timeLimitMs - time.get())}</b> alatt!`
    endGame()
  }
})

function startGame() {
  randomWord = words[Math.round(Math.random() * words.length)]
  console.log(randomWord)

  time.set(timeLimitMs)

  matches.set(0)

  timer = setInterval(() => time.increase(-1000), 1000)

  initTable(Array.from(randomWord))
  Array.from(document.querySelectorAll('#letterButton')).forEach(button => button.removeAttribute('disabled'))
}

function endGame() {
  startDialogButton.textContent = 'Újrakezdés'
  startDialog.showModal()

  clearInterval(timer)
  clearTable()
}

function displayAlphabet(string, query) {
  Array.from(abc).forEach(letter => {
    const letterItem = document.createElement('li')
  
    const letterButton = document.createElement('button')
    letterButton.className = 'letterButton'
    letterButton.textContent = letter
    letterButton.onclick = () => submitInput(letter)
  
    letterItem.appendChild(letterButton)
    document.querySelector(query).appendChild(letterItem)
  })
}

window.addEventListener('DOMContentLoaded', () => {
  startDialog.showModal()
  startDialog.onclose = startGame
  displayAlphabet(abc, '#letterButtons')
})