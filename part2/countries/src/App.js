import { useEffect, useState } from "react"
import axios from 'axios'

const Detail = ({country}) => (
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h2>languages:</h2>
    <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={country.flags.svg} alt={`${country.name.common} flag`} />
  </>
)

const Response = ({response}) => {

  if (response.length === 1)
    return (<Detail country={response[0]} />)
  if (response.length < 10)
    return (
      <ul>
        {response.map((country, index) => 
          <li key={country.name.official}>
            {country.name.common}
            <div className="hide" id={index}>
              <Detail country={country} />
            </div>
            <button onClick={() => document.getElementById(`${index}`).classList.remove('hide')}>show</button>
          </li>
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
