import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])

    const [newName, setNewName] = useState('')

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }


    const addName = (event) => {
        event.preventDefault();
        if (persons.map(names => names.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        console.log('button clicked', event.target)
        const nameObj = {
            name: newName,
        }

        setPersons(persons.concat(nameObj))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName}
                                 onChange={handleNoteChange}
                />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons.map(note =>
                    <p key={note.name}>
                        <li>{note.name}</li>
                    </p>
                )
            }
        </div>
    )

}

export default App