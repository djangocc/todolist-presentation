import React from "react";
import { Form, Button, Input } from "antd";
import { useProjectsDispatch, addProject } from "../provider/project_provider";
import PropTypes from "prop-types"; 
import { generatePushId } from "../helpers";

export const ProjectAddForm = ({onSubmitSuccess}) => {
  const [form] = Form.useForm();
  const dispatchProject = useProjectsDispatch();
  const onSubmit = (values) => {
    addProject(
      { projectId: generatePushId(), name: values.project_name },
      dispatchProject
    );
    onSubmitSuccess()
  };
  return (
    <Form
      name="add_project"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onFinish={onSubmit}
    >
      <Form.Item
        name="project_name"
        label="Project Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

ProjectAddForm.propTypes = {
    onSubmitSuccess:PropTypes.func.isRequired,
}