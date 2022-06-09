import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";

const App = () => {
    const [persons, setPersons] = useState([])

    const copy = [...persons];

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterInput, setFilterInput] = useState('')

    useEffect(() => {
        const eventHandler = response => {
            setPersons(response.data)
        }

        const promise = axios.get('http://localhost:3001/persons')
        promise.then(eventHandler)
    }, [])

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

        axios
            .post('http://localhost:3001/persons', nameObj)
            .then(response => {
                    setPersons(copy.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                }
            )
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
            <Persons copy = {copy} filterInput = {filterInput} />
        </div>
    )

}

export default App