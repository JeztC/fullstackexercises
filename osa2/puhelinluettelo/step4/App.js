import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const copy = [...persons];

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterInput, setFilterInput] = useState('')

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilterInput(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault();
        if (copy.map(names => names.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        if (newName.length === 0 || newNumber.length === 0) {
            alert(`You can't have an empty name or empty phone number.`)
            return
        }
        console.log('button clicked', event.target);
        const nameObj = {
            name: newName,
            number: newNumber,
        }

        console.log(newNumber);

        setPersons(copy.concat(nameObj))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    filter shown with: <input value={filterInput}
                                 onChange={handleFilterChange}
                />
                </div>
            </form>
            <h2>add a new</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName}
                                 onChange={handleNameChange}
                />
                </div>
                <div>
                    number: <input value={newNumber}
                                   onChange={handlePhoneChange}
                />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {copy.filter(copy => copy.name.includes(filterInput)).map(note =>
                <p key={note.name}>
                    <li>{note.name} {note.number}</li>
                </p>
            )}
        </div>
    )

}

export default App