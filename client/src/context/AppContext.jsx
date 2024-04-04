import { createContext, useReducer } from "react";
import {DELETION,SAVING,LOADING, FETCH_IMAGES,DELETE_IMAGE, ERROR, CLEAR_ERROR,UPLOAD_IMAGE } from "./Actions";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
// initials State Reducer

const initialState = {
  imageList: [],
  loading: false,
  isSaving: false,
  isDeleting: false,
  hasError: false,
  errorMessage: "",
  successMessage: ""
};

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      console.log("pay", ...action.payload)
      return {
        ...state,
        imageList: [...action.payload],
        loading: false,
        hasError: false,
        errorMessage: "",
      };
    case ERROR:
      return {
        ...state,
        imageList: [...state.imageList],
        loading: false,
        isSaving: false,
        isDeleting: false,
        hasError: true,
        errorMessage: action.payload,
        successMessage: ""
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        loading: false,
        hasError: false,
         isSaving: false,
        successMessage: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: true,
       
      };
    case SAVING:
      return {
        ...state,
        isSaving: true,
       
      };
    case DELETION:
      return {
        ...state,
        isDeleting: true,
       
      };
    case DELETE_IMAGE:
      return {
        ...state,
        loading: false,
        hasError: false,
        isDeleting: false,
        successMessage: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        hasError: false,
        errorMessage: "",
      };
  }
};

//  context
export const AppContext = createContext();

// provider
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   read images
  const fetchImageList = async () => {
    dispatch({ type: LOADING });
    axios
      .get(`${API_BASE_URL}/images/`)
      .then(function (response) {
       
        dispatch({
          type: FETCH_IMAGES,
          payload: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: ERROR,
          payload: "Something Went Wrong During Fetching",
        });
        console.log("error from", state.hasError);
      });
  };
  const uploadImage = async (imageData) => {
    dispatch({ type: SAVING });
    axios
      .post(`${API_BASE_URL}/images/`,imageData)
      .then(function (response) {
        dispatch({
          type: UPLOAD_IMAGE,
          payload: response.data.message,
        });
        fetchImageList()
      })
      .catch(function (error) {
        dispatch({
          type: ERROR,
          payload: "Something Went Wrong During Uploading",
        });
        console.log("error from", state.hasError);
      });
  };
  const deleteImage = async (id) => {
    dispatch({ type: DELETION });
    axios
      .delete(`${API_BASE_URL}/images/${id}`)
      .then(function (response) {
        dispatch({
          type: DELETE_IMAGE,
          payload: response.data,
        });
        fetchImageList()
      })
      .catch(function (error) {
        dispatch({
          type: ERROR,
          payload: "Something Went Wrong During Uploading",
        });
        console.log("error from", state.hasError);
      });
  };

  return (

    <AppContext.Provider
      value={{
        loading: state.loading,
        deleting: state.isDeleting,
        saving: state.isSaving,
        successMessage: state.successMessage,
        imageList: state.imageList,
        fetchImageList,
        uploadImage,
        deleteImage,
        err: state.hasError,
        mesg: state.errorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
