import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTranscription } from "../slices/transcriptions";

const AddTranscription = () => {
  const initialTranscriptionState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTranscription] = useState(initialTranscriptionState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTranscription({ ...tutorial, [name]: value });
  };

  const saveTranscription = () => {
    const { title, description } = tutorial;

    dispatch(createTranscription({ title, description }))
      .unwrap()
      .then(data => {
        console.log(data);
        setTranscription({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTranscription = () => {
    setTranscription(initialTranscriptionState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTranscription}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTranscription} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTranscription;
