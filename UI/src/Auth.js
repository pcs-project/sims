const Auth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    sessionStorage.clear();
    this.isAuthenticated = false;
  },
  getAuth() {
    let token = sessionStorage.getItem("token");
    if (token) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    return this.isAuthenticated;
  },
};
export default Auth;
