import React from "react";
import "./App.css";
import { Breadcrumb, Layout, theme } from "antd";
import { Sidebar } from "./component/layout/sidebar";
import { LayoutHeader } from "./component/layout/header";
import { TaskList } from "./component/task_list";
import { useProjectSelect } from "./provider/project_select_provider";
const { Content, Footer } = Layout;

function App() {
  const project = useProjectSelect();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Layout>
        <LayoutHeader />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              // minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <TaskList project={project} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Todo List ©2023 Created by Chentao
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
