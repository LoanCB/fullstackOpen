const Persons = ({persons}) => (
    <ul>
        {persons.map(person =>
            <li key={person.number}>{person.name} - {person.number}</li>
        )}
    </ul>
)

export default Persons