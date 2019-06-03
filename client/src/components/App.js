import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Home from "./home";
import Create from "./create";
import Edit from "./edit";
import ErrorBoundary from "./error/errorBoundary";
class App extends React.Component {
  render() {
    const WithRouterHome = withRouter(Home);
    const WithRouterCreate = withRouter(Create);
    const WithRouterEdit = withRouter(Edit);
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ErrorBoundary>
                <WithRouterHome />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/create"
            render={() => (
              <ErrorBoundary>
                <WithRouterCreate />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/edit/:id"
            render={() => (
              <ErrorBoundary>
                <WithRouterEdit />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
