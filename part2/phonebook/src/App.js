import { useState } from 'react'

const NameInput = ({newName, setNewName}) => {
  const handlePersonChange = (event) => setNewName(event.target.value)

  return (
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
    </div>
  )
}

const NumberInput = ({newNumber, setNewNumber}) => {
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
  )
}

const Numbers = ({persons}) => (
  <>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person =>
        <li key={person.number}>{person.name} - {person.number}</li>
      )}
    </ul>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.number.includes(newNumber))) {
      alert(`${newName} with the number ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form>
        <NameInput newName={newName} setNewName={setNewName} />
        <NumberInput newNumber={newNumber} setNewNumber={setNewNumber} />
        <button type="submit" onClick={addPerson}>add</button>
      </form>
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App