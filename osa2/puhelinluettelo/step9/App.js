import { useState, useEffect } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterInput, setFilterInput] = useState('')

    useEffect(() => {
        setPersonsData()
    }, [])

    const copy = [...persons];

    const setPersonsData = () => {
        personsService
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }

    const deleteNumber = (id) => {
        if (window.confirm(`Delete ${copy.find(n => n.id === id).name} ?`)) {
            personsService
                .deleteObject(id)
                .then(() => {
                    setPersonsData()
                });
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handlePhoneChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilterInput(event.target.value)

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

        const nameObj = {name: newName, number: newNumber}

        personsService
            .create(nameObj)
            .then(response => {
                setPersons(copy.concat(response))
                setNewName('')
                setNewNumber('')
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                input = {filterInput}
                action = {handleFilterChange}
            />
            <h2>add a new</h2>
            <PersonForm addName = {addName} newName = {newName}
                        handleNameChange = {handleNameChange}
                        newNumber = {newNumber} handlePhoneChange = {handlePhoneChange}
            />
            <h2>Numbers</h2>
            {
                copy.filter(copy => copy.name.includes(filterInput)).map(note =>
                    <p key = {note.id}>
                        <li>{note.name} {note.number} <button onClick={() => deleteNumber(note.id)}>delete</button></li>
                    </p>
                )
            }
        </div>
    )

}

export default App