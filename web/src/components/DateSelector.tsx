interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  selected: boolean;
}

const DateSelector = ({ children, onClick, selected }: Props) => {
  return (
    <button
      className={`border bg-background rounded-sm px-2 py-1 text-[14px] lg:hover:bg-muted ${
        selected ? "bg-primary border-0 text-white" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DateSelector;
