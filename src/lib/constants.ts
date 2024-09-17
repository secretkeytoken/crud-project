import { HomeIcon, Images, Settings } from "lucide-react";
import { NavbarItemType } from "../types/Navbar.type";

export const NAVBAR_ITEMS: NavbarItemType[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "About us",
    link: "/about",
  },
];

export const DASHBOARD_MENU = [
  { name: "Overview", href: "/console", icon: HomeIcon },
  { name: "Collections", href: "/console/collections", icon: Images },
  { name: "Settings", href: "/console/settings", icon: Settings },
];
