import { Link as RouterLink } from "react-router-dom";

import { ListGroup, ListGroupItem } from "react-bootstrap";

function App() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <RouterLink to="/pdf-w-form">Modify Existing PDF (react-pdf and pdf-lib)</RouterLink>
        </ListGroup.Item>
        <ListGroupItem>
          <RouterLink to="/histogram-card">Histogram Card (nivo rocks)</RouterLink>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}

export default App;
