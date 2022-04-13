import React, { FC, useRef, useState } from "react";
import shortid from 'shortid';
import { todoType } from "../../types/todo.type";
import "./../../../app.css";
export interface todoFormProps {
  addTodo: (todo: todoType) => void
}

const TodoForm: FC<todoFormProps> = (props: todoFormProps) => {
  // Create ref for form input
  const inputRef = useRef<HTMLInputElement>(null)

  // Create new form state
  const [formState, setFormState] = useState('')

  // Handle todo input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update form state with the text from input
    setFormState(event.target.value)
  }

  // Handle 'Enter' in todo input
  const handleInputEnter = (event: React.KeyboardEvent) => {
    // Check for 'Enter' key
    if (event.key === 'Enter') {
      // Prepare new todo object
      const newTodo: todoType = {
        id: shortid.generate(),
        text: formState,
        isCompleted: false,
        isChecked: false
      }

      // Create new todo item
      props.addTodo(newTodo);

      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="todo-form">
      <input
        ref={inputRef}
        type="text"
        placeholder='What needs to be done?'
        onChange={event => handleInputChange(event)}
        onKeyPress={event => handleInputEnter(event)}
      />
    </div>
  )
}


export default TodoForm;