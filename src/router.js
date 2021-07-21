import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DataTable from "./Components/Table";
import AddNewUser from "./Components/AddNew";

const PageRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/add-new-user'>
          <AddNewUser />
        </Route>
        <Route exact path='/'>
          <DataTable />
        </Route>
      </Switch>
    </Router>
  );
};

export default PageRoutes;
