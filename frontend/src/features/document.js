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

      const response = await axios.post(`${API_URL}/api/upload/original/`, formData, {
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

// export const fetchLatestFile = createAsyncThunk(
//   "file/fetchLatestFile",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const latestFileId =
//         state.document.files[state.document.files.length - 1]?.id;
//       if (!latestFileId) {
//         throw new Error("No files found");
//       }

//       const response = await axios.get(`${API_URL}/api/document/original/${latestFileId}/`, {
//         responseType: 'arraybuffer' // Treat response as binary data
        
//       });

//       const contentType = response.headers['content-type'];
//       if (!['application/pdf', 'application/json', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint'].includes(contentType)) {
//         throw new Error(`Unsupported file type: ${contentType}`);
//       }

//       console.log(response)
      

//       const fileBlob = new Blob([response.data.document], { type: contentType });
//       const fileUrl = URL.createObjectURL(fileBlob);
//       console.log(fileUrl)
//       return { fileUrl }; // Only return serializable data
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
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
//       const response = await axios.get(`${API_URL}/api/document/original/${latestFileId}/`, {
//         responseType: 'arraybuffer' // Ensure the response is treated as binary data
//       });

//       // Determine the content type from the response headers
//       const contentType = response.headers['content-type'];

//       return { document: response.data, contentType };
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

//       // Ensure filePath is a string
//       const filePath = response.data;
//       if (typeof filePath !== 'string') {
//         throw new Error('Invalid filePath received');
//       }

//       return { filePath };
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
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
      
//       // Assuming response contains filePath as a string
//       if (typeof response.data.filePath !== 'string') {
//         throw new Error('Invalid filePath received');
//       }

//       return { filePath: response.data.filePath };
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );



// export const fetchLatestFile = createAsyncThunk(
//   "file/fetchLatestFile",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       console.log(state);
//       const latestFileId =
//         state.document.files[state.document.files.length - 1]?.id;
//       console.log(latestFileId);
//       if (!latestFileId) {
//         throw new Error("No files found");
//       }
//       const response = await axios.get(`${API_URL}/api/document/original/${latestFileId}/`);
//       return response.data.document;
//     } catch (error) { 
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

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
