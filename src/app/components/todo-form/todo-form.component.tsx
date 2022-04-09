import React, { FC, useState } from "react";
import "./../../../app.css";
export interface todoFormProps {
    addTodo: (value: string) => void
}

const TodoForm: FC<todoFormProps> = (todoFormProps: todoFormProps) => {
    const [value, setValue] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;
        todoFormProps.addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}


export default TodoForm;