import React, { useMemo } from "react";
import { Flex, List, Modal } from "antd";
import { TaskAdd } from "./task_add";
import { TaskEditForm } from "./task_edit_form";
import { updateTask, useTasks } from "../provider/task_provider";
import { useTasksDispatch } from "../provider/task_provider";
import PropTypes from "prop-types";
import * as dayjs from "dayjs";

export const TaskList = ({ project }) => {
  const [modal, ModalDOM] = Modal.useModal();
  const allTasks = useTasks();
  const type = project && project.type;
  const date = project && project.date;
  const projectId = project && project.id;
  const today = dayjs().format("YYYY-MM-DD");
  const sevendays = dayjs().add(7, "day").format("YYYY-MM-DD");
  const tasks = useMemo(() => {
    if (type == "by_id") {
      return allTasks.filter(
        (task) => task.projectId == projectId && !task.archived
      );
    } else {
      if (date == "td") {
        return allTasks.filter((task) => task.ddl == today);
      } else {
        return allTasks.filter(
          (task) => task.ddl >= today && task.ddl <= sevendays
        );
      }
    }
  }, [allTasks, type, date, projectId, today, sevendays]);
  const dispatch = useTasksDispatch();
  const complete = (task) => updateTask({ ...task, archived: true }, dispatch);
  const handleEdit = (
    title = "",
    description = "",
    ddl = "",
    taskId = "",
    projectId = ""
  ) => {
    const modalRef = modal.confirm({
      title: `Edit Task ${title}`,
      content: (
        <TaskEditForm
          title={title}
          description={description}
          ddl={ddl}
          taskId={taskId}
          projectId={projectId}
          closeModal={() => modalRef.destroy()}
        />
      ),
      icon: null,
      footer: null,
      closable: true,
    });
  };
  const handleDetail = (
    title = "",
    description = "",
    ddl = "",
    taskId = "",
    projectId = ""
  ) => {
    const modalRef = modal.confirm({
      title: `view Task ${title}`,
      content: (
        <TaskEditForm
          title={title}
          description={description}
          ddl={ddl}
          editable={false}
          taskId={taskId}
          projectId={projectId}
          closeModal={() => modalRef.destroy()}
        />
      ),
      icon: null,
      footer: null,
    });
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        footer={
          project &&
          project.type == "by_id" && (
            <Flex justify="center" align="center">
              <TaskAdd projectId={project.date || project.id} />
            </Flex>
          )
        }
        renderItem={(item) => (
          <List.Item
            key={item.taskId}
            actions={[
              <a
                key="list-loadmore-edit"
                onClick={() =>
                  handleEdit(
                    item.title,
                    item.description,
                    dayjs(item.ddl),
                    item.taskId,
                    item.projectId
                  )
                }
              >
                edit
              </a>,
              <a
                key="list-loadmore-more"
                onClick={() =>
                  handleDetail(
                    item.title,
                    item.description,
                    dayjs(item.ddl),
                    item.taskId,
                    item.projectId
                  )
                }
              >
                detail
              </a>,
              <a key="list-loadmore-more" onClick={() => complete(item)}>
                complete
              </a>,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      {ModalDOM}
    </>
  );
};

TaskList.propTypes = {
  project: PropTypes.object,
};
