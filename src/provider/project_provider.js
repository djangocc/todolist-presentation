import { React, createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { firebase } from "../firebase";

const ProjectContext = createContext(null);
const ProjectDispatchContext = createContext(null);

const projectsReducer = (projects, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...projects,
        {
          projectId: action.projectId,
          name: action.name,
        },
      ];
    }
    case "set": {
      return action.projects;
    }
    case "delete": {
      return projects.filter((p) => p.projectId != action.projectId);
    }
  }
};

const useProjectsReducer = () => {
  const [projects, dispatch] = useReducer(projectsReducer, []);
  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
        }));
        if (JSON.stringify(allProjects.map(p=>p.projectId)) !== JSON.stringify(projects.map(p=>p.projectId))) {
          dispatch({ type: "set", projects: allProjects });
        }
      });
  }, [projects]);

  return [projects, dispatch];
};

export function ProjectsProvider({ children }) {
  const [projects, dispatch] = useProjectsReducer(projectsReducer, []);

  return (
    <ProjectContext.Provider value={projects}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}
ProjectsProvider.propTypes = {
  children: PropTypes.node,
};

export const useProjects = () => {
  return useContext(ProjectContext);
};

export const useProjectsDispatch = () => {
  return useContext(ProjectDispatchContext);
};

export const addProject = (project, dispatch) => {
  firebase
    .firestore()
    .collection("projects")
    .add({
      ...project,
    })
    .then(() => {
      dispatch({ ...project, type: "add" });
    });
};

// eslint-disable-next-line no-unused-vars
export const deleteProject = (project, dispatch) => {
  firebase
    .firestore()
    .collection("projects")
    .where("projectId", "==", project.projectId)
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        doc.ref.delete();
      });
      dispatch({ ...project, type: "delete" });
    });
};
