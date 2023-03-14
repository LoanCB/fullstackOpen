import { useState } from 'react'

const Title = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({text, handle}) => (
  <button onClick={handle}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (good || neutral || bad)
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={((good - bad) / total).toFixed(1)} />
          <StatisticLine text="positive" value={`${(good / total * 100).toFixed(1)} %`} />
        </tbody>
      </table>
    )
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button handle={() => setGood(good + 1)} text="good" />
      <Button handle={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handle={() => setBad(bad + 1)} text="bad" />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
