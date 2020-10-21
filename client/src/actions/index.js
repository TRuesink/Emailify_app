import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

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

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
