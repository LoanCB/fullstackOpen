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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <ul>
      {courses.map(course =>
        <li key={course.id}><Course course={course} /></li>
      )}
    </ul>
  )
}

export default App