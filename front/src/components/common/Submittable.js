import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { SubmittableContext } from "./context/Context";

function Submittable({ title, description }) {
  const { setSubAble } = useContext(SubmittableContext);
  if (title.length === 0 || description.length === 0) {
    setSubAble(true);
    return (
      <Alert variant="danger">
        <p>내용을 입력해주세요.</p>
      </Alert>
    );
  }
  setSubAble(false);
  return null;
}

export default Submittable;
