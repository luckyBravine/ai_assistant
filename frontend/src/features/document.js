import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/index";

// Async thunk to upload a file
export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (file, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      formData.append("document", file);

      // Get the user token from the state (assuming your token is stored in `user.token`)
      const token = getState().user.token;

      // Send the file along with the authentication token
      const response = await axios.post(`${API_URL}/api/upload/original/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${token}`,  // Ensure the token is included in the headers
        },
      });

      const documentId = response.data.id;

      // Fetch the document content based on the uploaded file ID
      const documentResponse = await axios.get(`${API_URL}/api/document/original/${documentId}/`, {
        headers: {
          "Authorization": `Token ${token}`,  // Use the token for authenticated requests
        },
      });

      const documentContent = documentResponse.data.content; // Ensure this is returned as part of the response

      return { document: response.data, content: documentContent };
    } catch (error) {
      return rejectWithValue(error.response.data.document);
    }
  }
);


export const fetchLatestFile = createAsyncThunk(
    "file/fetchLatestFile",
    async (_, { rejectWithValue, getState }) => {
      try {
        const state = getState();
        const latestFileId = state.document.files[state.document.files.length - 1]?.id;
        if (!latestFileId) {
          throw new Error("No files found");
        }
        const response = await axios.get(`${API_URL}/api/document/original/${latestFileId}/`);
        return response.data.document; // Ensure this is a URL string or file path
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  );



export const postSuggestions = createAsyncThunk(
  "file/postSuggestions",
  async ({ suggestionType, content }, { rejectWithValue, getState }) => {
    try {
      // Get the token from the state
      const token = getState().user.token;

      const formData = new FormData();
      formData.append('content', content);  // Attach content
      formData.append('suggestionType', suggestionType);  // Attach suggestion type

      // Make the API call with the token
      const response = await axios.post(`${API_URL}/api/upload/improved/${suggestionType}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${token}`,  // Pass the token here
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const postContents = createAsyncThunk(
  "file/postContents",
  async ({ improvedContent, content }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;

      // URL without parameters
      const url = `${API_URL}/api/document/combined/create/`;

      // API call with JSON body
      const response = await axios.post(url, {
        content,
        improvedContent
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


// Async thunk to upload the updated document but i redacted it because it was more logical to save the document in the backend after parsing in the suggestion
export const uploadUpdatedDocument = createAsyncThunk(
  "file/uploadUpdatedDocument",
  async ({  updatedDocument }, { rejectWithValue }) => {
    console.log('uploadUpdatedDocument', updatedDocument)
    try {
      const formData = new FormData();
      formData.append("documents", updatedDocument);

      const response = await axios.post(`${API_URL}/api/upload/improved/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('uploadUpdatedDocument', response)
      return response.data;
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
  suggestions: null,
  improvedDocument: [],
  combinedDocument: null,
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
        state.files.push(action.payload.document);  // Store document
        state.content = action.payload.content;  // Store document content
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
      })
      .addCase(postContents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadSuccess = false;
      })
      .addCase(postContents.fulfilled, (state, action) => {
        state.loading = false;
        state.combinedDocument = action.payload;
        state.uploadSuccess = true;
      })
      .addCase(postContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadSuccess = false;
      })
      .addCase(postSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.improvedDocument = action.payload; 
        state.loading = false;
      })
      .addCase(postSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
        state.loading = false;
      });
  },
});

export default documentSlice.reducer;

