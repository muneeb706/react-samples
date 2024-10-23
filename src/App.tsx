import { Link as RouterLink } from "react-router-dom";

import { ListGroup, ListGroupItem } from "react-bootstrap";

import "./index.css";

function App() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <RouterLink to="/pdf-w-form">
            Modify Existing PDF (react-pdf and pdf-lib)
          </RouterLink>
        </ListGroup.Item>
        <ListGroupItem>
          <RouterLink to="/histogram-card">
            Histogram Card (nivo rocks)
          </RouterLink>
        </ListGroupItem>
        <ListGroupItem>
          <RouterLink to="/congratulations">Congratulations Page (with confetti)</RouterLink>
        </ListGroupItem>
        <ListGroupItem>
          <RouterLink to="/welcome-back">Welcome Back Modal</RouterLink>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}

export default App;
