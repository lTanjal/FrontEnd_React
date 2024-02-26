import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState({
        description: '',
        dare: ''
    });
    const [todos, setTodos] = useState([]);


    const handleClick = () => {
        if (todo.description && todo.date) {
            setTodos([...todos, todo]);
            setTodo({ description: '', date: '' });
        }
        else {
            alert("Type a description and date first");
        }

    };

        const handleDelete=(i)=>{

        const filteredTodo= (todos.filter((todo,index) => index !== i)) ; 
        setTodos(filteredTodo);
    };
    

    return (
        <>

            <label> Description: </label>
            <input
                placeholder="Description"
                value={todo.description}
                onChange={e => setTodo({ ...todo, description: e.target.value })}
            />
            <label> Date: </label>
            <input
                type="date"
                value={todo.date}
                onChange={e => setTodo({ ...todo, date: e.target.value })}
            />

            <button onClick={handleClick}>Add todo</button>
            <TodoTable todos={todos} handleDelete={handleDelete} /> 
        </>
    )
}


export default TodoList;