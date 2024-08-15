// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_URL } from "../config/index";

// import axios from "axios";

// // Async thunk to upload a file
// export const uploadFile = createAsyncThunk(
//   "file/uploadFile",
//   async (file, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append("document", file);
//       console.log("form data:", formData);

//       const response = await axios.post(`${API_URL}/api/upload/original/`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.document);
//     }
//   }
// );


// export const fetchLatestFile = createAsyncThunk(
//   "file/fetchLatestFile",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const latestFileId = state.document.files[state.document.files.length - 1]?.id;
//       if (!latestFileId) {
//         throw new Error("No files found");
//       }
//       const response = await axios.get(`${API_URL}/api/document/original/${latestFileId}/`);
//       return response.data.document; // Ensure this is a URL string or file path
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// const initialState = {
//   files: [],
//   loading: false,
//   status: null,
//   errorMessage: null,
//   currentFile: null,
// };
// const documentSlice = createSlice({
//   name: "file",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(uploadFile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.files.push(action.payload);
//         state.loading = false;
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.status = "failed";
//         state.errorMessage = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchLatestFile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLatestFile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.currentFile = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchLatestFile.rejected, (state, action) => {
//         state.status = "rejected";
//         state.errorMessage = action.payload;
//         state.loading = false;
//       });
//   },
// });

// export default documentSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/index";

// Async thunk to upload a file
export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("document", file);

      const response = await axios.post(`${API_URL}/api/upload/original/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.document);
    }
  }
);

// Async thunk to fetch the latest file
// export const fetchLatestFile = createAsyncThunk(
//   "file/fetchLatestFile",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const latestFileId = state.document.files[state.file.files.length - 1]?.id;
//       if (!latestFileId) {
//         throw new Error("No files found");
//       }
//       const response = await axios.get(`${API_URL}/api/document/original/${latestFileId}/`);
//       return response.data.document; // Ensure this is a URL string or file path
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

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

// Async thunk to fetch suggestions
export const fetchSuggestions = createAsyncThunk(
  "file/fetchSuggestions",
  async ({ doc, suggestionType }, { rejectWithValue }) => {
    console.log('fetchSuggestions', doc, suggestionType )
    // /api/document/analyze/${suggestionType}/
    try {
      const response = await axios.get(`${API_URL}/api/document/original/${doc}/analyze/${suggestionType}/`);
      console.log('fetchSuggestions', response)
      return response.data.suggestions;
      
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk to post suggestions
export const postSuggestions = createAsyncThunk(
  "file/postSuggestions",
  async ({  suggestions }, { rejectWithValue }) => {
    // ${docId}/suggestions/ docId,
    console.log('uploadUpdatedDocument', suggestions)
    try {
      const response = await axios.post(`${API_URL}/api/upload/improved/`, suggestions);
      console.log('postSuggestion', response)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk to upload the updated document
export const uploadUpdatedDocument = createAsyncThunk(
  "file/uploadUpdatedDocument",
  async ({ updatedDocument }, { rejectWithValue }) => {
    console.log('uploadUpdatedDocument', updatedDocument)
    try {
      const formData = new FormData();
      formData.append("document", updatedDocument);

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
      })
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(postSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSuggestions.fulfilled, (state) => {
        state.status = "succeeded";
        state.suggestions = null; // Clear suggestions or update based on response
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

