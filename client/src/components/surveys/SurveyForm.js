import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "recipients" },
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map((item) => {
      return (
        <Field
          key={item.name + 1}
          label={item.label}
          name={item.name}
          type="text"
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => console.log(values))}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons left">cancel</i>
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `you must provide a value for ${name}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
})(SurveyForm);
