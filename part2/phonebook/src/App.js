import { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const filterPersons = () => persons.filter(person => person.name.toLowerCase().includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    const searchedPerson = persons.find(person => person.name === newName)
    if (searchedPerson) {
      if (window.confirm(`${searchedPerson.name} is already added to phonebook, replace the old number with a new one ?`)) {
        const editedPerson = {...searchedPerson, number: newNumber}
        personService.edit(editedPerson).then(data => setPersons(persons.map(person => person.id === editedPerson.id ? data : person)))
      }
    } else {
      personService.create({name: newName, number: newNumber}).then(data => setPersons(persons.concat(data)))
      setNewName('')
      setNewNumber('')
    }
  }
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(deletedPerson => deletedPerson.id !== person.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={filterPersons()} deletePerson={deletePerson} />
    </div>
  )
}

export default App