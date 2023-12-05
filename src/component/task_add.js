import { Button } from "antd";
import React, { useState } from "react";
import { TaskEditModal } from "./task_edit_modal";
import PropTypes from "prop-types";

export const TaskAdd = ({ projectId = "", taskId = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="link" onClick={showModal}>
        Add Task
      </Button>
      <TaskEditModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        taskId={taskId}
        projectId={projectId}
      ></TaskEditModal>
    </>
  );
};

TaskAdd.propTypes = {
  projectId: PropTypes.string,
  taskId: PropTypes.string,
};
