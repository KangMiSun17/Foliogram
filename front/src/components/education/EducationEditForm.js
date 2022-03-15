import {
  Card,
  CardText,
  Row,
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormCheck,
} from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

function EducationEditForm() {
  return (
    <context.Provider>
      <Form>
        <FormGroup>
          <FormControl></FormControl>
        </FormGroup>

        <FormGroup>
          <FormControl></FormControl>
        </FormGroup>

        <FormCheck>
          <FormCheckInput></FormCheckInput>
          <FormCheckLabel></FormCheckLabel>
        </FormCheck>

        <FormCheck>
          <FormCheckInput></FormCheckInput>
          <FormCheckLabel></FormCheckLabel>
        </FormCheck>

        <FormCheck>
          <FormCheckInput></FormCheckInput>
          <FormCheckLabel></FormCheckLabel>
        </FormCheck>

        <FormCheck>
          <FormCheckInput></FormCheckInput>
          <FormCheckLabel></FormCheckLabel>
        </FormCheck>
      </Form>
    </context.Provider>
  );
}

export default EducationEditForm;
