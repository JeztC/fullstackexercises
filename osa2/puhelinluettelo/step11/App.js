import { useState, useEffect } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import personsService from './services/persons'
import Notification from "./components/Notification/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterInput, setFilterInput] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

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
                    sendNotificationMessageTimeout(`Removed ${copy.find(n => n.id === id).name} from the list.`)
                    setPersonsData();
                });
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handlePhoneChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilterInput(event.target.value)


    const sendNotificationMessageTimeout = (message) => {
        setNotificationMessage(message)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 2000)
    }

    const addName = (event) => {
        event.preventDefault();

        const nameObj = {name: newName, number: newNumber}

        if (copy.map(names => names.name).includes(newName)) {
            const person = copy.find(n => n.name === newName)
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personsService.update(person.id, nameObj)
                    .then(() => {
                        setPersonsData()
                        sendNotificationMessageTimeout(`Changed ${newName}'s phone number.`)
                    })
                return;
            }
        }

        if (newName.length === 0 || newNumber.length === 0) {
            alert(`You can't have an empty name or empty phone number.`)
            return
        }

        personsService
            .create(nameObj)
            .then(response => {
                setPersons(copy.concat(response))
                setNewName('')
                setNewNumber('')
                sendNotificationMessageTimeout(`Added ${newName}`)
            })
    }

    return (
        <div>
            <Notification message = {notificationMessage}/>
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