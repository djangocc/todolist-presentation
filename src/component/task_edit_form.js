import { Form, Input, DatePicker } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { generatePushId } from "../helpers";
import {
  useTasksDispatch,
  addTask,
  updateTask,
} from "../provider/task_provider";
import firebase from "firebase";

export const TaskEditForm = ({
  title = "",
  description = "",
  ddl = "",
  editable = true,
  projectId = "",
  taskId = "",
  closeModal,
}) => {
  const taskDispatch = useTasksDispatch();
  const [isEditable, setEditable] = useState(editable);
  const [form] = Form.useForm();
  const isAdd = taskId === "";
  const complete = () => {
    updateTask(
      {
        taskId,
        title,
        description,
        ddl,
        projectId,
        archived: true,
      },
      taskDispatch
    );
    closeModal();
  };
  const localAddTask = (taskToAdd) => {
    firebase
      .firestore()
      .collection("tasks")
      .add(taskToAdd)
      .then(() => {
        addTask(taskToAdd, taskDispatch);
        form.resetFields();
        closeModal();
      });
  };
  const localUpdateTask = (taskToUpdate) => {
    firebase
      .firestore()
      .collection("tasks")
      .where("taskId", "==", taskToUpdate.taskId)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.ref.update(taskToUpdate);
        });
        updateTask(taskToUpdate, taskDispatch);
        closeModal();
      });
  };
  const onSubmit = (values) => {
    if (isAdd) {
      const taskToAdd = {
        title: values.title,
        description: values.description,
        ddl: values.ddl.format("YYYY-MM-DD"),
        projectId: projectId,
        taskId: generatePushId(),
        archived: false,
      };
      localAddTask(taskToAdd);
    } else {
      const taskToUpdate = {
        title: values.title,
        description: values.description,
        ddl: values.ddl.format("YYYY-MM-DD"),
        projectId: projectId,
        taskId: taskId,
        archived: false,
      };
      localUpdateTask(taskToUpdate);
    }
  };
  return (
    <Form
      name="edit_task"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      disabled={!isEditable}
      onFinish={onSubmit}
      form={form}
    >
      <Form.Item
        label="title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={title}
      >
        <Input value={title} />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={description}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="DDL"
        name="ddl"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={ddl}
      >
        <DatePicker />
      </Form.Item>
      {isAdd || (
        <Form.Item label="operation">
          <a onClick={complete}>complete</a>
        </Form.Item>
      )}
      {isEditable ? null : (
        <Form.Item label="Unlock">
          <a onClick={() => setEditable(true)}>unlock</a>
        </Form.Item>
      )}
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

TaskEditForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ddl: PropTypes.object,
  editable: PropTypes.bool,
  projectId: PropTypes.string,
  taskId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
