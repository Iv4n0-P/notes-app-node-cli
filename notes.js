const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const noteJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteJSON)
}

debugger

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('New note added'))
    } else {
        console.log(chalk.red.inverse.bold('Note title taken'))
    }
}

const removeNote = (title) => {

        const notes = loadNotes()
        const filteredNotes = notes.filter(note => note.title !== title)
        if (notes.length > filteredNotes.length) {
            saveNotes(filteredNotes)
            console.log(chalk.green.inverse.bold('Note removed'))
        } else {
            console.log(chalk.red.inverse.bold('Note not removed'))
        }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.bold('Your notes:'))
    notes.forEach(note => {console.log(chalk.green.bold(note.title))})
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
  if (note) {
        console.log(chalk.blue(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse.bold('Note not found'))
    }

}


module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}