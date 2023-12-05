import React, { useMemo } from "react";
import { Menu } from "antd";
import { ProjectItem } from "../project_item";
import { ProjectAdd } from "../project_add";
import { useProjects } from "../../provider/project_provider";
import {
  useSetProjectSelect,
  changeProjectById,
  changeProjectByDate,
  useProjectSelect,
} from "../../provider/project_select_provider";

export const LeftMenu = () => {
  const projects = useProjects();
  const projectSelect = useProjectSelect();
  const setProjectSelect = useSetProjectSelect();
  const selectedKey = useMemo(() => {
    if (projectSelect === null) {
      return null;
    } else if (projectSelect.type === "by_id") {
      return projectSelect.id;
    } else if (projectSelect.type === "by_date") {
      return projectSelect.date;
    }
  }, [
    projectSelect && projectSelect.type,
    projectSelect && projectSelect.id,
    projectSelect && projectSelect.date,
  ]);
  return (
    <Menu
      selectedKeys={selectedKey ? selectedKey : null}
      theme="dark"
      mode="inline"
    >
      <Menu.Item key="td" onClick={() => changeProjectByDate("td", setProjectSelect)}>
        today
      </Menu.Item>
      <Menu.Item key="nx" onClick={() => changeProjectByDate("nx", setProjectSelect)}>
        next 7 days
      </Menu.Item>
      <Menu.SubMenu title="💼&nbsp;&nbsp;&nbsp;Projects" key="sub">
        {projects.map((project) => (
          <Menu.Item
            key={project.projectId}
            className="menu_sub_item"
            onClick={() => {
              changeProjectById(project.projectId, setProjectSelect);
            }}
          >
            <ProjectItem projectId={project.projectId} projectName={project.name} />
          </Menu.Item>
        ))}
        <Menu.Item key="add_project" className="menu_sub_item">
          <ProjectAdd add_style="text" />
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
