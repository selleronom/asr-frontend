import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTranscription, deleteTranscription } from "../slices/transcriptions";
import TranscriptionDataService from "../services/TranscriptionService";

const Transcription = (props) => {
  const initialTranscriptionState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTranscription, setCurrentTranscription] = useState(initialTranscriptionState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTranscription = id => {
    TranscriptionDataService.get(id)
      .then(response => {
        setCurrentTranscription(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTranscription(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTranscription({ ...currentTranscription, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentTranscription.id,
      title: currentTranscription.title,
      description: currentTranscription.description,
      published: status
    };

    dispatch(updateTranscription({ id: currentTranscription.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentTranscription({ ...currentTranscription, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTranscription({ id: currentTranscription.id, data: currentTranscription }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeTranscription = () => {
    dispatch(deleteTranscription({ id: currentTranscription.id }))
      .unwrap()
      .then(() => {
        props.history.push("/transcriptions");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTranscription ? (
        <div className="edit-form">
          <h4>Transcription</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTranscription.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTranscription.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTranscription.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTranscription.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeTranscription}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Transcription...</p>
        </div>
      )}
    </div>
  );
};

export default Transcription;
