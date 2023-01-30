import { Route, Switch } from "react-router-dom";
import OrderForm from "./Pages/OrderForm";
import OrderListPage from "./Pages/OrderListPage";
import Home from "./Pages/Home";
import ExpensesPage from "./Pages/ExpensesPage";
import TodoPage from "./Pages/TodoPage";
import NotesPage from "./Pages/NotesPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/order-form">
        <OrderForm />
      </Route>
      <Route path="/orders">
        <OrderListPage />
      </Route>
      <Route path="/expense">
        <ExpensesPage />
      </Route>
      <Route path="/todo">
        <TodoPage />
      </Route>
      <Route path="/notes/:noteId?">
        <NotesPage />
      </Route>
    </Switch>
  );
}

export default App;
