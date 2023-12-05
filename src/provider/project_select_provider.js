import { React, createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ProjectSelectContext = createContext(null);
const SetProjectSelectContext = createContext(null);

export function ProjectSelectProvider({ children }) {
  const [projectSelect, setProjectSelect] = useState(
    null
  );

  return (
    <ProjectSelectContext.Provider value={projectSelect}>
      <SetProjectSelectContext.Provider value={setProjectSelect}>
        {children}
      </SetProjectSelectContext.Provider>
    </ProjectSelectContext.Provider>
  );
}
ProjectSelectProvider.propTypes = {
  children: PropTypes.node,
};

export const useProjectSelect = () => {
  return useContext(ProjectSelectContext);
};

export const useSetProjectSelect = () => {
  return useContext(SetProjectSelectContext);
};

export const changeProjectById = (id,setProjectSelect) => {
  setProjectSelect({ id, type: "by_id" });
};

export const changeProjectByDate = (date,setProjectSelect) => {
  setProjectSelect({ date, type: "by_date" });
};

export const changeProjectToClear = (setProjectSelect) => {
  setProjectSelect(null);
};
