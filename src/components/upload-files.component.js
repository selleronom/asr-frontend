import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UploadService from '../services/upload-files.service';


export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: 'Could not upload the file!',
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  }

  delete(id) {
    UploadService.deleteFile(id);
  }

  render() {
    const { selectedFiles, currentFile, progress, message, fileInfos } = this.state;

    return (
      <Container>
        {currentFile && (
          <Row>
            <ProgressBar now={progress} />
          </Row>
        )}
        <Row>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  {selectedFiles && selectedFiles[0].name ? (
                    <div className="selected-file">{selectedFiles && selectedFiles[0].name}</div>
                  ) : (
                    'Drag and drop file here, or click to select file'
                  )}
                </div>
                <aside className="selected-file-wrapper">
                  <button className="btn btn-success" disabled={!selectedFiles} onClick={this.upload}>
                    Upload
                  </button>
                </aside>
              </section>
            )}
          </Dropzone>
        </Row>
        <Row>
          <Alert variant="alert">{message}</Alert>
        </Row>
        <Row>
          {fileInfos.length > 0 && (
            <Card>
              <Card.Header>Files</Card.Header>
              <ListGroup variant="flush">
                {fileInfos.map((file, index) => (
                  <ListGroup.Item key={index}>{file.text}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          )}
        </Row>
      </Container>
    );
  }
}
