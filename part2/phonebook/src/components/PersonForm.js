const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => (
    <form>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit" onClick={addPerson}>add</button>
    </form>
)

export default PersonForm