import React from "react";
import { ProjectsProvider } from "./project_provider";
import { ProjectSelectProvider } from "./project_select_provider";
import { TasksProvider } from "./task_provider";
import PropTypes from "prop-types";
const providers = [ProjectsProvider, ProjectSelectProvider, TasksProvider];

const buildGeneralProvider = (children, ...providers) =>
  providers.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children);

const GeneralProvider = ({ children }) => {
  const Provider = buildGeneralProvider(children, ...providers);
  return Provider
};

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeneralProvider;
