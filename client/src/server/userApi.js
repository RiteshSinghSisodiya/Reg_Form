import axios from "axios";

class UserApi {
  constructor() {
    this._apiUrl = "http://localhost:7004/api/user";
    this._apiUrl2 = "http://localhost:7004/api/training";
    this._apiUrl3 = "http://localhost:7004/api/education";
  }

  getUsers() {
    return axios.get(this._apiUrl);
  }

  createUsers(user) {
    return axios.post(this._apiUrl, user);
  }

  getTraining() {
    return axios.get(this._apiUrl2);
  }

  createTraining(training) {
    return axios.post(this._apiUrl2, training);
  }

  getEducation() {
    return axios.get(this._apiUrl3);
  }

  createEducation(education) {
    return axios.post(this._apiUrl3, education);
  }
}

export default new UserApi();
