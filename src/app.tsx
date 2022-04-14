import React, { FC } from "react";
import "./app/styles/styles.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoContainer from "./app/containers/todo/todo.container";

const App: FC = () => {
  const routes = [
    {
      path: '/',
      exact: true,
      component: TodoContainer
    }
  ]
  return (
    <Router>
      <div className="app">
        <Switch>
          {routes.map((route, i) => {
            return (<Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render={(props:any) => (
                <route.component {...props} {...route} />
              )}
            >
            </Route>
            );
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;