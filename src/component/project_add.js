import React, { useState } from "react";
import { PlusCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import PropTypes from "prop-types";
import { ProjectAddForm } from "./project_add_form";

export const ProjectAdd = ({ add_style = "header" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {add_style == "header" ? (
        <PlusCircleTwoTone className="header-add-project" onClick={showModal} />
      ) : (
        <PlusOutlined onClick={showModal} />
      )}
      <Modal
        title="Add Project"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Submit"
        footer={null}
      >
        <ProjectAddForm onSubmitSuccess={handleCancel}/>
      </Modal>
    </>
  );
};

ProjectAdd.propTypes = {
  add_style: PropTypes.string,
};
