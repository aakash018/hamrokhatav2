interface Props {
  name: string;
  description: string;
  amount: number;
  date: string;
  profile?: string | null;
}

const HistoryHolder = ({ amount, date, description, name, profile }: Props) => {
  return (
    <div className="flex px-4 py-2 gap-4 items-center w-full dark:bg-stone-900 bg-muted border">
      <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full border overflow-hidden">
        {profile && (
          <img
            src={profile}
            alt="profile pic"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="w-full flex justify-between">
        <div className="">
          <div className=" font-semibold">{name}</div>
          {/* <div>tags</div> */}
          <div className="text-[14px]">{description}</div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="font-semibold text-[18px] text-right">
            Rs. {amount}
          </div>
          <div className="text-muted-foreground text-[10px] text-right">
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryHolder;
