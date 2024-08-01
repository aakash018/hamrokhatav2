import {
  ClockClockwise,
  CurrencyCircleDollar,
  Plus,
} from "@phosphor-icons/react";
import { NavLink, useNavigate } from "react-router-dom";

const MobileNavBar = () => {
  const nav = useNavigate();
  return (
    <div className="lg:hidden fixed bottom-0 h-[70px] border-t-2 w-screen justify-around items-center flex bg-background">
      <div className="flex flex-col items-center">
        <NavLink
          to="/debts"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <CurrencyCircleDollar size={32} />
          <div className="text-[12px]">Debts</div>
        </NavLink>
      </div>
      <div
        className="w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center text-white mb-[60px]"
        onClick={() => {
          nav("/");
        }}
      >
        <Plus size={23} />
      </div>
      <div>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <ClockClockwise size={32} />
          <div className="text-[12px]">History</div>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNavBar;
