import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetValue
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
    await axios.post(baseUrl, resource);
    await getAll()
  }

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    setResources(request.data)
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    const fetchData = async () => {
      await noteService.getAll()
      await personService.getAll()
    }
    fetchData()
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.resetValue()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.resetValue()
    number.resetValue()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App