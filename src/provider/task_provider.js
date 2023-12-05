import { React, createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import _ from "underscore";

const TaskContext = createContext(null);
const TaskDispatchContext = createContext(null);

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...tasks,
        {
          archived: action.archived,
          ddl: action.ddl,
          description: action.description,
          projectId: action.projectId,
          taskId: action.taskId,
          title: action.title,
        },
      ];
    }
    case "set": {
      return action.tasks;
    }
    case "update": {
      const postTasks = tasks.map((task) => {
        if (task.taskId == action.taskId) {
          return {
            archived: action.archived,
            ddl: action.ddl,
            description: action.description,
            projectId: action.projectId,
            taskId: action.taskId,
            title: action.title,
          };
        } else {
          return task;
        }
      });
      return postTasks;
    }
  }
};

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  useEffect(() => {
    firebase
      .firestore()
      .collection("tasks")
      .orderBy("taskId")
      .get()
      .then((snapshot) => {
        const allTasks = snapshot.docs.map((task) => ({
          ...task.data(),
        }));
        if (!_.isEqual(allTasks, tasks)) {
          dispatch({ type: "set", tasks: allTasks });
        }
      });
  }, []);
  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}
TasksProvider.propTypes = {
  children: PropTypes.node,
};

export const useTasks = () => {
  const allTask = useContext(TaskContext)
  return allTask
  // if (!project) {
  //   return [];
  // }
  // if (project.type == "by_id") {
  //   return allTask.filter((t) => t.projectId == project.id).filter(cus_filter);
  // } else {
  //   return allTask
  //     .filter((t) => t.projectId == project.date)
  //     .filter(cus_filter);
  // }
};

export const useTasksDispatch = () => {
  return useContext(TaskDispatchContext);
};

export const addTask = (task, dispatch) => {
  dispatch({ ...task, type: "add" });
};

export const updateTask = (task, dispatch) => {
  dispatch({ ...task, type: "update" });
};
