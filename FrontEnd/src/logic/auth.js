class Auth {
  constructor() {
    this.isLoggedIn = false;
  }

  login(callback) {
    this.isLoggedIn = true;
    callback();
  }

  logout(callback) {
    this.isLoggedIn = false;
    callback();
  }

  loggedIn() {
    return this.isLoggedIn;
  }
}

export default new Auth();
