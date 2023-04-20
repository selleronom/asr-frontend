import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTranscriptions,
  findTranscriptionsByTitle,
  deleteAllTranscriptions,
} from "../slices/transcriptions";
import { Link } from "react-router-dom";

const TranscriptionsList = () => {
  const [currentTranscription, setCurrentTranscription] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const transcriptions = useSelector(state => state.transcriptions);
  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveTranscriptions());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentTranscription(null);
    setCurrentIndex(-1);
  };

  const setActiveTranscription = (transcription, index) => {
    setCurrentTranscription(transcription);
    setCurrentIndex(index);
  };

  const removeAllTranscriptions = () => {
    dispatch(deleteAllTranscriptions())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTranscriptionsByTitle({ title: searchTitle }));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Transcriptions List</h4>

        <ul className="list-group">
          {transcriptions &&
            transcriptions.map((transcription, index) => (
              <li
                className={'list-group-transcription ' + (index === currentIndex ? 'active' : '')}
                onClick={() => setActiveTranscription(transcription, index)}
                key={index}
              >
                {transcription.text}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllTranscriptions}>
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTranscription ? (
          <div>
            <h4>Transcription</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentTranscription.id}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentTranscription.text}
            </div>

            <Link to={'/transcriptions/' + currentTranscription.id} className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transcription...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionsList;
