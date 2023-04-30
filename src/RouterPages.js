import { Route, Switch } from "react-router-dom";
import OrderForm from "./Pages/OrderForm";
import OrderListPage from "./Pages/OrderListPage";
import Home from "./Pages/Home";
import ExpensesPage from "./Pages/ExpensesPage";
import TodoPage from "./Pages/TodoPage";
import NotesPage from "./Pages/NotesPage";
import LoginPage from "./Pages/LoginPage";
import Menu from "./components/Homepage/Menu";
import Header from "./components/Homepage/Header";
import SignupPage from "./Pages/SignupPage";

function RouterPages() {
  // const currentUser = false

  // const RequireAuth = ({children}){
  //   return currentUser ? (children) : <Navigate to:
  // }

  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/signup" exact>
        <SignupPage />
      </Route>
      <div>
        <div className="menu">
          <Menu />
        </div>
        <Header />
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
        <Route path="*">
          <div>Page Not Found</div>
        </Route>
      </div>
    </Switch>
  );
}

export default RouterPages;
