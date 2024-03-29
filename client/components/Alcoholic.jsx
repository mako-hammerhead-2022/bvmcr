import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAlcoholic } from './apiClient'

function Alcoholic() {
  const [drinks, setDrinks] = useState({ loading: true })

  useEffect(() => {
    getAlcoholic()
      .then((data) => {
        setDrinks({ data: data.drinks })
      })
      .catch((err) => {
        setDrinks({ error: err.message })
      })
  }, [])

  if (drinks.loading) {
    return <p>Loading...</p>
  }

  if (drinks.error) {
    return <p>Sorry! Something went wrong</p>
  }

  return (
    <div className="drinkdisplay">
      <ul>
        {drinks.data.map((drink) => (
          <div key={drink.idDrink}>
            <Link to={`/drink/${drink.idDrink}`}>
              <h3>{drink.strDrink}</h3>
            </Link>
            <img
              className="image"
              src={drink.strDrinkThumb}
              alt={`the alchoholic drink "${drink.strDrink}"`}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Alcoholic
