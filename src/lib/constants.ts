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
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Collections", href: "/dashboard/colections", icon: Images, current: false },
  { name: "Settings", href: "dashboard/settings", icon: Settings, current: false },
];