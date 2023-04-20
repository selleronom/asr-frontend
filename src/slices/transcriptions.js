import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TranscriptionDataService from "../services/TranscriptionService";

const initialState = [];

export const createTranscription = createAsyncThunk(
  "transcriptions/create",
  async ({ title, description }) => {
    const res = await TranscriptionDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveTranscriptions = createAsyncThunk(
  "transcriptions/retrieve",
  async () => {
    const res = await TranscriptionDataService.getAll();
    return res.data;
  }
);

export const updateTranscription = createAsyncThunk(
  "transcriptions/update",
  async ({ id, data }) => {
    const res = await TranscriptionDataService.update(id, data);
    return res.data;
  }
);

export const deleteTranscription = createAsyncThunk(
  "transcriptions/delete",
  async ({ id }) => {
    await TranscriptionDataService.remove(id);
    return { id };
  }
);

export const deleteAllTranscriptions = createAsyncThunk(
  "transcriptions/deleteAll",
  async () => {
    const res = await TranscriptionDataService.removeAll();
    return res.data;
  }
);

export const findTranscriptionsByTitle = createAsyncThunk(
  "transcriptions/findByTitle",
  async ({ title }) => {
    const res = await TranscriptionDataService.findByTitle(title);
    return res.data;
  }
);

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  extraReducers: {
    [createTranscription.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTranscriptions.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTranscription.fulfilled]: (state, action) => {
      const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTranscription.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTranscriptions.fulfilled]: (state, action) => {
      return [];
    },
    [findTranscriptionsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = tutorialSlice;
export default reducer;