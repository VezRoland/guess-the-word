import { abc } from './words.js'
import { randomWord, matches } from './main.js'

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

  gameTable.appendChild(letterFields)

  window.addEventListener('keyup', handleKeyup)
}

export function clearTable() {
  gameTable.replaceChildren()
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

function handleKeyup({ key }) {
  key = key.toLowerCase()

  fields.forEach(field => {
    if (!field.compare(key)) return
    field.show()
    matches.increase()
  })
}