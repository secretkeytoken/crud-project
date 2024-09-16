import DashboardMenu from "@/components/dashboard/DashboardMenu";
import ProjectSelection from "@/components/dashboard/ProjectSelection";
import EndNavbarSection from "@/components/layout/EndNavbarSection";
import MobileNavbar from "@/components/layout/MobileNavbar";
import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";
const DashboardProviderWithNoSSR = dynamic(
  () => import("@/components/providers/DashboardProvider"),
  {
    ssr: false,
  }
);
const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DashboardProviderWithNoSSR>
      {/* <Navbar /> */}
      <div className="w-full">
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-darkGreen pb-4">
            <div className="flex h-16 shrink-0 items-center">
              {/* <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                className="h-8 w-auto"
              /> */}
              <ProjectSelection />
            </div>
            <DashboardMenu />
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 shadow-sm sm:gap-x-6 border-b border-darkGreen px-4 sm:px-6 lg:px-8">
            <MobileNavbar>
              <ProjectSelection className="w-full" />
              <DashboardMenu />
            </MobileNavbar>

            <div className="flex justify-end w-full">
              <EndNavbarSection />
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </DashboardProviderWithNoSSR>
  );
};

export default DashboardLayout;
