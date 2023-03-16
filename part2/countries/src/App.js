import { useEffect, useState } from "react"
import axios from 'axios'

const Response = ({response}) => {
  if (response.length === 1) {
    response = response[0]
    return (
      <>
        <h1>{response.name.common}</h1>
        <p>capital {response.capital}</p>
        <p>area {response.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(response.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={response.flags.svg} alt={`${response.name.common} flag`} />
      </>
    )
  }
  if (response.length < 10)
    return (
      <ul>
        {response.map(country => 
          <li key={country.name.official}>{country.name.common}</li>
        )}
      </ul>
    )
  return (
    <p>Too many matches, specify anoter filter</p>
  )
}

function App() {
const [search, setSearch] = useState('')
const [response, setResponse] = useState({})

const handleSearchChange = (event) => setSearch(event.target.value)

useEffect(() => {
  axios
    .get(`https://restcountries.com/v3.1/${search ? `name/${search}/` : 'all/'}`)
    .then(response => setResponse(response.data))
}, [search])

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <Response response={response} />
    </div>
  )
}

export default App
