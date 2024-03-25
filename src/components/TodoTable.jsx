import React from "react";

function TodoTable(props) {

    return (
        <>
            <table className="frame">
                <tbody>

                    <tr>
                        <th>Date </th>
                        <th>Description </th>

                    </tr>

                    {
                       props.todos.map((todo, index) =>
                            <tr key={index}>
                                <td>{todo.date}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <button onClick={() => {props.handleDelete(index) }}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </>)
}

export default TodoTable;



//


