import App from "./App";
import { test,  expect } from "vitest";
import { render, screen, fireEvent  } from "@testing-library/react";
import TodoList from "./components/TodoList";
import '@testing-library/jest-dom/vitest';
import TodoTable from "./components/TodoTable";

test("renders TodoList component", () => {
    render(<TodoList />);
    const header = screen.getByText(/My Todos/i);
  });


  test('renders TodoTable', () => {
    const row = [
      {description: 'Go to coffee', date: '24/01/2023' }
    ];
    render(<TodoTable todos={row} />);
    const descriptionElement = screen.getByRole('table');
    expect(descriptionElement).toHaveTextContent (/go to coffee/i);
   
});


test("add todo", () => {
    render(<TodoList />);
    const description = screen.getByLabelText("Description");
    fireEvent.change(description, { target: { value: "Go to coffee" } });
    const priority = screen.getByLabelText("Priority");
    fireEvent.change(priority, { target: { value: "low" } });
    const date = screen.getByLabelText("Date");
    fireEvent.change(date, { target: { value: "29/01/2023" } });
    //console.log('new row', description.value );
    const button = screen.getByText("Add todo");
    fireEvent.click(button);
    const gridCell = document.querySelector('[role="gridcell"][col-id="description"]');
    //console.log('Answer:', gridCell);
    expect(gridCell).toHaveTextContent(/go to coffee/i);

  });

  test("delete all", () => {
    render(<TodoList />);
    const description = screen.getByLabelText("Description");
    fireEvent.change(description, { target: { value: "Go to coffee" } });
    const priority = screen.getByLabelText("Priority");
    fireEvent.change(priority, { target: { value: "low" } });
    const date = screen.getByLabelText("Date");
    fireEvent.change(date, { target: { value: "29/01/2023" } });
   
    const button = screen.getByText("Add todo");
    fireEvent.click(button);
    
    const gridCell = document.querySelector('[role="gridcell"][col-id="description"]');
    expect(gridCell).toHaveTextContent(/go to coffee/i);
    //console.log('Answer add:', gridCell);

    const buttonDelete = screen.getByText("Delete all");
    fireEvent.click(buttonDelete);

    //console.log('Answer delete:', gridCell);
    expect(gridCell).not.toBeInTheDocument();
    
   
  });

