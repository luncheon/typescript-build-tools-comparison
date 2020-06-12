import { Button, TextField } from '@material-ui/core'
import * as React from 'react'

const ToDoForm_ = ({ addItem }: { addItem: (item: string) => void }) => (
  <form
    onSubmit={event => {
      event.preventDefault()
      addItem(event.currentTarget.content.value)
      event.currentTarget.content.value = ''
    }}
  >
    <TextField name="content" autoFocus required />
    <Button type="submit" variant="contained" color="primary" size="small">
      追加
    </Button>
  </form>
)

const ToDoList = ({ items }: { items: readonly string[] }) => (
  <ul>
    {items.map(item => (
      <li>{item} </li>
    ))}
  </ul>
)

export const App = () => {
  const [items, setItems] = React.useState<string[]>([])
  return (
    <>
      <ToDoForm_ addItem={item => setItems([...items, item])} />
      <ToDoList items={items} />
    </>
  )
}
