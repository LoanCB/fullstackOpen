import { useState } from 'react'

const Title = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({text, handle}) => (
  <button onClick={handle}>{text}</button>
)

const Info = ({text, count}) => (
  <p>{text} {count}</p>
)

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
      <Info text="good" count={good} />
      <Info text="neutral" count={neutral} />
      <Info text="bad" count={bad} />
      <Info text="all" count={good + neutral + bad} />
      <Info text="average" count={(good - bad) / (good + neutral + bad)} />
      <Info text="positive" count={good / (good + neutral + bad) * 100} />
    </div>
  )
}

export default App
