const Header = ({name}) => (
    <h1>{name}</h1>
)

const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({parts}) => (
    <ul>
        {parts.map(part =>
            <li key={part.id}><Part part={part} /></li>
        )}
    </ul>
)

const Total = ({parts}) => (
    <strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
)

const Course = ({course}) => (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course