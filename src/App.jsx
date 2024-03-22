
import * as React from 'react';
import './App.css'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Home from './components/Home';
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {Link, Outlet} from 'react-router-dom';
import TodoList from './components/TodoList';


function App() {

  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <> 
       <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                
                  <Tab label="Home" value="home" component={Link} to="/"/>
                  <Tab label="ToDo" value="todo" component={Link} to="/todolist"/>
               
              </TabList>
              
            </Box>
            <TabPanel value="home">
           <Home />
            </TabPanel>
            <TabPanel value="todo">
              <TodoList />
            </TabPanel>
          </TabContext>
    </Box>
    </>
  );
}

export default App

//function App() {
// return (
//    <Container maxWidth="xl">
//      <CssBaseline />
//      <TodoList />
//    </Container>
//  );
//}


