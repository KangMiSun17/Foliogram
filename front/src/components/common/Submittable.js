import { Alert } from "react-bootstrap";

function Submittable({ title, description, setState }) {
  if (title.length === 0 || description.length === 0) {
    setState(false);
    return (
      <Alert variant="danger">
        <p>내용을 입력해주세요.</p>
      </Alert>
    );
  }
  setState(true);
  return null;
}

export default Submittable;
