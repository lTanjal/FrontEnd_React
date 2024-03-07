import { useState, useRef } from "react";
//import TodoTable from "./TodoTable";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

function TodoList() {
    const [todo, setTodo] = useState({
        description: '',
        priority: '',
        date: ''
    });
    const [todos, setTodos] = useState([]);


    const handleClick = () => {
        if (todo.description && todo.priority) {
            setTodos([...todos, todo]);
            setTodo({ description: '', date: '', priority: '' });
        }
        else {
            alert("Type a description and date first");
        }

    };

    //    const handleDelete=(i)=>{
    //   const filteredTodo= (todos.filter((todo,index) => index !== i)) ; 
    //   setTodos(filteredTodo);
    // };

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id));
        }
        else {
            alert('Select row first');
        }
    }



    const [colDefs, setColDefs] = useState([
        { field: 'description', sortable: false, filter: true, editable: true },
        {
            field: 'priority', sortable: true, filter: true,
            cellStyle: params => params.value.toLowerCase() === "high" ? { color: 'red' } : { color: 'black' }
        },

        { field: 'date', sortable: true, filter: true }
    ]);

    const gridRef = useRef();


    const handleDateChange = (datePicker) => {
        const dateString = format(datePicker.toISOString(), 'dd-MMM-yyyy');  //does not work:  const dateString = format(datePicker, 'yyyy-MM-dd') Uncaught RangeError: Invalid time value   
        setTodo({ ...todo, date: dateString });                            //does not work: const dateString =datePicker.toISOString(); 
    };                                                                   //M2 {$L: 'en', $u: undefined, $d: Sat Mar 02 2024 00:00:00 GMT+0200 (Eastern European Standard Time), $y: 2024, $M: 2, …}
                                                                          //TodoList.jsx:67 2024-03-01T22:00:00.000Z


    return (
        <>

            <Stack direction="row" spacing={2} mt={2} justifyContent='center' alignItems="center">
                <TextField
                    label="Description"
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                />

                <TextField
                    label="Priority"
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}

                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        format="DD/MM/YYYY"
                        value={todo.date}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>


                <Button variant="contained" onClick={handleClick}>Add todo</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>

            </Stack>

            <div className="ag-theme-material" style={{ height: 600, width: 500 }}>
                <AgGridReact
                    ref={gridRef}//need to delete function
                    onGridReady={params => gridRef.current = params.api}//need to delete function
                    rowData={todos}
                    columnDefs={colDefs}
                    rowSelection="single" //need to delete function
                />

            </div>
        </>
    )
}


export default TodoList;