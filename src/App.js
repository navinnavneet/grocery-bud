import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {

  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false, 
    msg: '', 
    type: ''
  })

  const submitHandler = (e) => {
    e.preventDefault()
    if(!name) {
      // alert
      showAlert(true, 'danger', 'please enter an item' )
    } else if (name && isEditing) {
      // edit
      const newList = list.map(item => {
        if (item.id === editId) {
          return { ...item, title: name}
        }
        return item
      })
      setList(newList)
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'item changed successfully')
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem])
      setName('')
    }
  }

  const clearList = () => {
    showAlert(true, 'danger', 'list cleared')
    setList([])
  }

  const removeItem = id => {
    showAlert(true, 'danger', 'an item removed')
    setList(list.filter(item => item.id !== id))
  }

  const editItem = id => {
    const specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg})
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  })

  return (
    <section className="section-center">
      <form onSubmit={submitHandler} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
            type="text" 
            className='grocery' 
            placeholder='e.g. eggs' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
          <button className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App


/*
const submitHandler = (e) => {
    e.preventDefault()
    if(!name) {
      // alert
      showAlert(true, 'danger', 'please enter an item' )
    } else if (name && isEditing) {
      // edit
      const newList = list.map(item => {
        if (item.id === editId) {
          return { ...item, title: name}
        }
        return item
      })
      setList(newList)
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'item changed successfully')
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem])
      setName('')
    }
  }
*/