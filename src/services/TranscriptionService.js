import http from "../http-common";

const getAll = () => {
  return http.get("/items/me");
};

const get = id => {
  return http.get(`/items/${id}`);
};

const create = data => {
  return http.post("/items", data);
};

const update = (id, data) => {
  return http.put(`/items/${id}`, data);
};

const remove = id => {
  return http.delete(`/items/${id}`);
};

const removeAll = () => {
  return http.delete(`/items`);
};

const findByTitle = title => {
  return http.get(`/items?title=${title}`);
};

const TranscriptionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default TranscriptionService;