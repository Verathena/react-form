import React, { useState } from "react";
import "../styles/ContactUsForm.css";
import axios from "axios";

const formValues = { name: "", email: "", subject: "", message: "" };

const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.name) {
    errors.name = "Name is a required field";
  }
  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!regex.test(values.email)) {
    errors.email = "Please enter valid email";
  }
  if (!values.subject) {
    errors.subject = "Subject is a required field";
  }
  if (!values.message) {
    errors.message = "Message is a required field";
  }
  return errors;
};

const ContactUsForm = () => {
  const [form, setForm] = useState(formValues);
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const updatedForm = { ...form, [event.target.id]: event.target.value };
    setForm(updatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(() => validate(form));
    setIsSubmit(true);
    setStatus("Submitting");

    // Post data to API
    axios
      .post(
        `https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries`,
        { form }
      )
      .then((response) => {
        console.log(response);
        setStatus("Submitted");
      })
      .catch((error) => console.log(error));
      setForm(formValues);
  };

  return (
    <div className="form--fields">
      {isSubmit && Object.keys(errorMessage).length === 0 ? (
        <span className="sent">Message sent. Thank you for your feedback.</span>
      ) : isSubmit && Object.keys(errorMessage).length > 0 ? (
        <span className="error">Oops! There was an error sending your message.</span>
      ) : null}
      <form onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <h3>We would love to hear from you!</h3>
        <hr/>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={form.name}
            name="name"
            onChange={handleChange}
            placeholder="Name (surname first)"
          />
        </div>
        <span>{errorMessage.name}</span>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={form.email}
            name="email"
            onChange={handleChange}
            placeholder="abc@def.com"
          />
        </div>
        <span>{errorMessage.email}</span>
        <div>
          <label htmlFor="subject">Please select category</label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          >
            <option value="Select category">Select category</option>
            <option value="Questions">Questions</option>
            <option value="Complaints">Complaints</option>
            <option value="Suggestions">Suggestions</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={form.message}
            name="message"
            onChange={handleChange}
            placeholder="Please leave a message for us"
          />
        </div>
        <span>{errorMessage.message}</span>

        <button type="submit">
          {status === "Submitting"
            ? "Submitting..."
            : status === "Submitted"
            ? "Submitted"
            : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
