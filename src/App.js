import React, { useState, useEffect, useMemo, useCallback } from 'react'

function App () {
  // Create States
  const [techs, setTechs] = useState(['ReactJS', 'React Native'])
  const [newTech, setNewTech] = useState('')

  // Save memory on handle, only handle one time. Only recreated on memory when change newTech or techs
  const handleAdd = useCallback(() => {
    if (!newTech) return false
    setTechs([...techs, newTech])
    setNewTech('')
  }, [newTech, techs])

  // ComponentMount
  useEffect(() => {
    const storageTechs = localStorage.getItem('techs')

    if (storageTechs) setTechs(JSON.parse(storageTechs))

    // ComponentUnmount
    return () => {}
  }, [])

  // Watch variable
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs))
  }, [techs])

  // Save memory when render pages
  const techSize = useMemo(() => techs.length, [techs])

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type='button' onClick={handleAdd}>
      Adicionar
      </button>
    </>
  )
}

export default App
