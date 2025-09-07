import { createSlice } from "@reduxjs/toolkit";
import initialProjects from "../data/project";

const initialState = {
  projects: initialProjects,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    editProject: (state, action) => {
      console.log(state.projects);
      
      const idx = state.projects.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.projects[idx] = { ...state.projects[idx], ...action.payload };
      }
    },
    addComment: (state, action) => {      
      const { projectId, comment } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.comments.push(comment);
      }
    },
    // add more reducers as needed
  },
});

export const { setProjects, addProject, editProject, addComment } = projectSlice.actions;
export default projectSlice.reducer;
