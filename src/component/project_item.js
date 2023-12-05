import React, { useState } from "react";
import { Row, Col } from "antd";
import { ProjectDeleter } from "./project_delete";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export const ProjectItem = ({ projectId, projectName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Row>
      <Col flex="auto">{projectName}</Col>
      <Col flex="10px" className="delete_in_item">
        <DeleteOutlined
          onClick={(e) => {
            setIsModalOpen(true);
            e.stopPropagation()
          }}
        />
        <ProjectDeleter
          projectId={projectId}
          projectName={projectName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Col>
    </Row>
  );
};

ProjectItem.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
};
