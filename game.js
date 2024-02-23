import { abc } from './words.js'
import { matches } from './main.js'

const gameTable = document.querySelector('#gameTable')

let letterFields
let fields = []

export function initTable(letters) {
  letterFields = document.createElement('ul')
  letterFields.id = 'letterFields'

  letters.forEach(letter => {
    const field = letterField(letter)
    fields = [...fields, field]
    letterFields.appendChild(field.elem)
  })

  const oldLetterFields = gameTable.querySelector('#letterFields')
  oldLetterFields ? gameTable.replaceChild(letterFields, oldLetterFields) : gameTable.appendChild(letterFields)

  window.addEventListener('keyup', handleKeyup)
}

export function clearTable() {
  window.removeEventListener('keyup', handleKeyup)
}

function letterField(letter) {
  const elem = document.createElement('li')
  elem.className = 'letterField'

  let completed = false

  const compare = (inpLetter) => {
    const value = completed ? false : letter.toLowerCase() === inpLetter.toLowerCase()
    if (!completed) completed = value
    return value
  }

  const show = () => elem.textContent = letter

  return { elem, compare, show }
}

export function submitInput(letter) {
  if (!(abc.includes(letter))) return
  Array.from(document.querySelectorAll('#letterButton')).find(button => button.textContent === letter).setAttribute('disabled', true)

  fields.forEach(field => {
    if (!field.compare(letter)) return
    field.show()
    matches.increase()
  })
}

function handleKeyup({ key }) {
  submitInput(key.toLowerCase())
}