import React from "react";
import { Redirect } from "react-router-dom";

// import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import TemplateRoutes from "./views/Templates/TemplateRoutes";
/*
  Required if you are going to use Evelynn Landing page
  https://themeforest.net/item/react-landing-material-ui-react-saasproduct-landing-page/23847400
*/

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/clm" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [...TemplateRoutes, ...redirectRoute,...errorRoute];

export default routes;
