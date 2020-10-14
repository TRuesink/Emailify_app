import axios from "axios";
import { FETCH_USER } from "./types";

// we use redux thunk because we don't want to dispatch an action until request is completed
// redux thunk gives you access to the dispatch funtion
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
