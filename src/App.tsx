import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import { ListGroup } from "react-bootstrap";

function App() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <RouterLink to="/dynamic-pdf-forms">Dynamic PDF Forms</RouterLink>
        </ListGroup.Item>
        {/* Add more ListGroup.Item components for more links */}
      </ListGroup>
    </>
  );
}

export default App;
