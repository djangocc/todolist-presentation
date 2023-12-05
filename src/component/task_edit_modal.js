import { Modal } from "antd";
import { TaskEditForm } from "./task_edit_form";
import React from "react";
import PropTypes from "prop-types";

export const TaskEditModal = ({
  isModalOpen = false,
  handleOk,
  handleCancel,
  title = "",
  content = "",
  ddl = null,
  taskId = "",
  projectId = "",
}) => {
  return (
    <Modal
      title="Add Task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      footer={null}
    >
      <TaskEditForm
        title={title}
        content={content}
        ddl={ddl}
        taskId={taskId}
        projectId={projectId}
        closeModal={handleCancel}
      />
    </Modal>
  );
};

TaskEditModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  ddl: PropTypes.object,
  taskId: PropTypes.string,
  projectId: PropTypes.string,
};
