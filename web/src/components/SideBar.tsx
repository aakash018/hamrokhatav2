import {
  ClockClockwise,
  CurrencyCircleDollar,
  Plus,
} from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="hidden lg:block bg-background h-screen min-w-[250px] border-r shadow-md px-4">
      <div className="text-center py-4 text-primary font-semibold uppercase tracking-[4px]">
        HamroKhata
      </div>
      <div className="mt-8">
        <ul className="flex flex-col gap-4">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 hover:bg-primary ${
                isActive ? "bg-primary text-white" : ""
              } cursor-pointer hover:text-white rounded-md`
            }
          >
            <Plus size={20} />
            Add
          </NavLink>
          <NavLink
            to={"/debts"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 hover:bg-primary ${
                isActive ? "bg-primary text-white" : ""
              } cursor-pointer hover:text-white rounded-md`
            }
          >
            <CurrencyCircleDollar size={20} />
            Debts
          </NavLink>
          <NavLink
            to={"/history"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 hover:bg-primary ${
                isActive ? "bg-primary text-white" : ""
              } cursor-pointer hover:text-white rounded-md`
            }
          >
            <ClockClockwise size={20} />
            History
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
