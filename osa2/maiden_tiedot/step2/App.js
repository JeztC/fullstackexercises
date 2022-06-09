import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter/Filter";
import CountryInformation from "./components/CountryInformation/CountryInformation";

const App = () => {
    const [countries, setCountries] = useState([])

    const copy = [...countries];

    const [filterInput, setFilterInput] = useState('')

    useEffect(() => {
        const eventHandler = response => {
            setCountries(response.data)
        }

        const promise = axios.get('https://restcountries.com/v3.1/all')
        promise.then(eventHandler)
    }, [])

    const handleFilterChange = (event) => {
        event.preventDefault()
        setFilterInput(event.target.value)
    }

    const filteredMap = copy.filter(copy => copy.name['common'].includes(filterInput))

    if (filteredMap.length === 1) {
        return (
            <CountryInformation filteredMap = {filteredMap} input = {filterInput} action = {handleFilterChange}/>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                input = {filterInput}
                action = {handleFilterChange}
            />
            {
                filteredMap.length > 10
                    ? (<li>{"Too many matches, specify another filter"}</li>)
                    : (filteredMap.map(note => <li key={note.name['common']}>{note.name['common']} <button onClick={() => setFilterInput(note.name['common'])} type="submit">show</button></li>)
                    )
            }
        </div>
    )

}

export default App