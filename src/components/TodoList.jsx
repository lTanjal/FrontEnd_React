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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
    //<TodoTable todos={todos} />

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id));
        }
        else {
            alert('Select row first');
        }
    }



    const [colDefs, setColDefs] = useState([
        { field: 'description', sortable: false, filter: "agTextColumnFilter", editable: true, floatingFilter: true,
        filterParams: {
            buttons: ["reset", "apply"],
            closeOnApply: true,
          },
        },
        {
            field: 'priority', sortable: true, filter: "agTextColumnFilter", floatingFilter: true,
            cellStyle: params => params.value.toLowerCase() === "high" ? { color: 'red' } : { color: 'black' }
        },

        {   field: 'date', sortable: true, filter: "agDateColumnFilter",
                valueFormatter : params=>params.value.format("DD.MM.YYYY"),
                floatingFilter: true,
                filterParams: {
                    // provide comparator function
                    comparator: (filterLocalDateAtMidnight, cellValue) => {
                        const dateAsString = cellValue;

                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        const dateParts = dateAsString.split('.');
                        const year = Number(dateParts[2]);
                        const month = Number(dateParts[1]) - 1;
                        const day = Number(dateParts[0]);
                        const cellDate = new Date(year, month, day);

                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                        return 0;
                    }
                }            
        } 
    ]);

    const gridRef = useRef();


   return (
        <>  
        <AppBar position= "static" >
        <Toolbar>
          <Typography variant='h6'>My Todos
  
          </Typography>
        </Toolbar>
      </AppBar>

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
                        onChange={date=>setTodo({ ...todo, date: date})}
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