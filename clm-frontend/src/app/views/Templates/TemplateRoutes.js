import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";
/* Routes for GRC and CLM templates and platform. */
const Templates = EgretLoadable({
  loader: () => import("./Templates"),
});
const GRC = EgretLoadable({
  loader: () => import("./GRC/HomeComponentGRC"),
});
const CLM = EgretLoadable({
  loader: () => import("./CLM/HomeComponentCLM"),
});
const TemplateRoutes = [
  {
    path: "/grc",
    component: Templates,
    auth: authRoles.admin,
    props: { type: "GRC" },
  },
  {
    path: "/clm",
    component: Templates,
    auth: authRoles.admin,
    props: { type: "CLM" },
  },
  {
    path: "/templates/GRC/:templateId",
    component: GRC,
    auth: authRoles.admin,
  },
  {
    path: "/templates/CLM/:templateId",
    component: CLM,
    auth: authRoles.admin,
  },
];

export default TemplateRoutes;
