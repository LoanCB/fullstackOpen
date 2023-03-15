import { useState } from 'react'

const Numbers = ({persons}) => (
  <>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person =>
        <li key={person.name}>{person.name}</li>
      )}
    </ul>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handlePersonChange = (event) => setNewName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.includes(newName))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName}))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App