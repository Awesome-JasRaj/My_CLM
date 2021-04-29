import { EgretLoadable } from "egret";

const LeftSidebarLayout = EgretLoadable({
  loader: () => import("./LeftSidebarCard")
});

const UserProfile = EgretLoadable({
  loader: () => import("./UserProfile")
});

const pageLayoutRoutes = [
  {
    path: "/page-layouts/Left-sidebar-card",
    component: LeftSidebarLayout
  },
  {
    path: "/page-layouts/user-profile",
    component: UserProfile
  }
];

export default pageLayoutRoutes;
