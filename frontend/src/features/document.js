import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config/index";

import axios from "axios";

// Async thunk to upload a file
export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("document", file);
      console.log("form data:", formData);

      const response = await axios.post(`${API_URL}/api/files/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.document);
    }
  }
);

// Async thunk to fetch files
// export const fetchFiles = createAsyncThunk('file/fetchFiles', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${API_URL}/files/`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

export const fetchLatestFile = createAsyncThunk(
  "file/fetchLatestFile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      console.log(state);
      const latestFileId =
        state.document.files[state.document.files.length - 1]?.id;
      console.log(latestFileId);
      if (!latestFileId) {
        throw new Error("No files found");
      }
      const response = await axios.get(`${API_URL}/api/files/${latestFileId}/`);
      return response.data.document;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  files: [],
  loading: false,
  status: null,
  errorMessage: null,
  currentFile: null,
};
const documentSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.files.push(action.payload);
        state.loading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentFile = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestFile.rejected, (state, action) => {
        state.status = "rejected";
        state.errorMessage = action.payload;
        state.loading = false;
      });
  },
});

export default documentSlice.reducer;
