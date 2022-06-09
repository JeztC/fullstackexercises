import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter/Filter";
import Countries from "./components/Countries/Countries";

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
        console.log(event.target.value)
        setFilterInput(event.target.value)
    }

    const filteredMap = copy.filter(copy => copy.name['common'].includes(filterInput))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                input = {filterInput}
                action = {handleFilterChange}
            />
            <Countries filteredMap = {filteredMap} filterInput = {filterInput} />
        </div>
    )

}

export default App