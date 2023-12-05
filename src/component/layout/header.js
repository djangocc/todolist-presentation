import React from "react";
import { Flex, Layout, theme } from "antd";
import { ProjectAdd } from "../project_add";
const { Header } = Layout;

export const LayoutHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Flex
        justify="flex-end"
        align="center"
        style={{ height: "100%", paddingRight: "2%" }}
      >
        <ProjectAdd/>
      </Flex>
    </Header>
  );
};
