import Utils from "../utils";
import HttpClient from "./HttpClient";

export default class ApiManager {
  constructor() {
    Utils.storage.getAuthKeyFromStorage().then((token) => {
      this.authToken = token || "";
      this.http = new HttpClient(this.getApiBaseUrl());
      this.http.setAuthToken(this.authToken);
    });
  }

  getApiBaseUrl() {
    const URL = "http://rental.lukomaclinic.com/api";
    return URL;
  }

  destroy() {
    this.http.destroy();
  }

  static getAuthTokenString() {
    return this.authToken;
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
    this.http.setAuthToken(authToken);
  }

  isLoggedIn() {
    return this.authToken;
  }

  login(phone_number, password) {
    const http = this.http;

    let user = {
      admin: { phone_number, password },
    };

    return Promise.resolve()
      .then(http.fetch(http.POST, "/admins/sign_in", user))
      .then(function (response) {
        Utils.storage.setAuthKeyInStorage(response.headers.authorization);
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  }

  logout() {
    return Promise.resolve().then(Utils.storage.clearAuthKeys());
  }

  update(path, data) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.PATCH, path, data));
  }

  delete(path, query) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.DELETE, path, query));
  }

  post(path, data) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.POST, path, data));
  }

  get(path, query) {
    const http = this.http;
    return Promise.resolve().then(http.fetch(http.GET, path, query));
  }
}
