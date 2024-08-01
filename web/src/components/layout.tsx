import { Outlet } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { Switch } from "./ui/switch";
import SideBar from "./SideBar";

const Layout = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <div className=" dark:bg-background flex text-black dark:text-white w-full">
        <div className="w-full h-screen overflow-auto ">
          <div className="flex">
            <SideBar />
            <div className=" lg:mt-0 w-full h-screen overflow-y-auto">
              <div className="flex justify-end items-center w-screen lg:w-full h-[60px] p-4 gap-4 bg-background">
                Lights
                <Switch
                  id="airplane-mode"
                  defaultChecked={theme === "light"}
                  onCheckedChange={(e) => {
                    if (e) {
                      setTheme("light");
                    } else {
                      setTheme("dark");
                    }
                  }}
                />
              </div>
              <Outlet />
            </div>
          </div>
          <MobileNavBar />
        </div>
      </div>
    </>
  );
};

export default Layout;
