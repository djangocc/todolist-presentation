import React, { useState } from "react";
import { Layout } from "antd";
import { LeftMenu } from "./menu";
const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <LeftMenu />
    </Sider>
  );
};
