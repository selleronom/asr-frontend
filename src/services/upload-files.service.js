import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    // formData.append("user_id", 1);
    // formData.append("title", "DummyTitle");
    formData.append("text", file);

    return http.post('/items/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/items/me");
        // fetch('http://localhost:8000/items/me', {
        //   method: 'GET',
        //   credentials: 'include',
        //   // headers: headers,
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     // console.log(data);
        //     return data;
        //   });

  }

  deleteFile(id) {
    return http.delete(`/items/${id}`);
  }
}

export default new UploadFilesService();
