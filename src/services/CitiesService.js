import firebase from "../firebase";

const db = firebase.ref("/citiestoalert");

const getAll = () => {
  return db;
};

const create = (data) => {
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeById = (id) => {
  return db.child(id).remove();
};


const removeAll = () => {
  return db.remove();
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
  removeById,
  db
};
