import React from "react";
import { Redirect } from "react-router-dom";

const CodeListProblemConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/codelist",
      component: React.lazy(() => import("./CodeListPage")),
    },
    {
      path: "/apps/codelist",
      component: () => <Redirect to="/apps/codelist" />,
    },
  ],
};

export default CodeListProblemConfig;
