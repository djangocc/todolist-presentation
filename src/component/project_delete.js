import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import {
  deleteProject,
  useProjectsDispatch,
} from "../provider/project_provider";
import {
  useSetProjectSelect,
  changeProjectToClear,
  useProjectSelect,
} from "../provider/project_select_provider";

export const ProjectDeleter = ({
  projectId,
  projectName,
  isModalOpen,
  setIsModalOpen,
}) => {
  const projectDispatcher = useProjectsDispatch();
  const projectSelectDispatcher = useSetProjectSelect();
  const projectSelect = useProjectSelect();
  const handleOk = (e) => {
    e.stopPropagation();
    deleteProject({ projectId }, projectDispatcher);
    if(projectSelect && projectSelect.type === "by_id" && projectSelect.id === projectId){
        changeProjectToClear(projectSelectDispatcher)
    }
    setIsModalOpen(false);
  };
  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Delete the project"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p> Do you want to delete {projectName}</p>
    </Modal>
  );
};

ProjectDeleter.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};
