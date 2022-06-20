const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.2ey2e.mongodb.net/personsApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    id: Number,
    name : String,
    number: String
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 3) {
    console.log("Phonebook:")
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    const note = new Note({
        id: Math.floor(Math.random() * 80000),
        name: process.argv[3],
        number: process.argv[4]
    });

    note.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    });
}
