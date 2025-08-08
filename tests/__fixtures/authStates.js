export const initialState = {
  status: "checking",
  user: {},
  errorMessage: null,
};
export const authenticatedState = {
  status: "authenticated",
  user: {
    username: "Manuel",
    uid: "12345",
  },
  errorMessage: null,
};
export const notAuthenticatedState = {
  status: "not-authenticated",
  user: {},
  errorMessage: null,
};
