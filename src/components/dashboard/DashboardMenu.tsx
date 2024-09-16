"use client";
import { DASHBOARD_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardMenu = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col px-4">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-3">
            {DASHBOARD_MENU.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={cn(
                    item.href === pathname
                      ? "bg-lightGreen text-white"
                      : "text-green-200 hover:lightGreen hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={cn(
                      item.href === pathname
                        ? "text-white"
                        : "text-green-200 group-hover:text-white",
                      "h-6 w-6 shrink-0"
                    )}
                  />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </li>

        <li className="mt-auto">
          <a
            href="#"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-green-200 hover:bg-lightGreen hover:text-white"
          >
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardMenu;
