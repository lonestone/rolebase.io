import React from 'react'
import { useMembers } from '../data/members'

function App() {
  const [members, loading, error] = useMembers()

  return (
    <div className="App">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {members && (
        <ul>
          {members.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
