const Persons = ({persons, deletePerson}) => (
    <ul>
        {persons.map(person =>
            <li key={person.number}>
                {person.name} - {person.number}
                <button onClick={() => deletePerson(person)}>delete</button>
            </li>
        )}
    </ul>
)

export default Persons