interface Props {
  profileImg?: string | null;
  data: {
    main: {
      name: string;
      debt: {
        first: {
          name: string;
          amount: number;
        };
        second: {
          name: string;
          amount: number;
        };
        third: {
          name: string;
          amount: number;
        };
      };
      get: {
        first: {
          name: string;
          amount: number;
        };
        second: {
          name: string;
          amount: number;
        };
        third: {
          name: string;
          amount: number;
        };
      };
    };
  };
}

const DebtsHolder = ({ data, profileImg }: Props) => {
  return (
    <div className="w-full max-w-[400px] dark:bg-stone-900 bg-muted border shadow-sm flex flex-col gap-6 items-center p-6 rounded-md">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-[80px] h-[80px] border rounded-full overflow-hidden">
          {profileImg && (
            <img src={profileImg} alt={`${data.main.name}'s profile pic`} />
          )}
        </div>
        <div className="">{data.main.name}</div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-[140px_80px_80px] place-content-center  text-[16px] font-semibold text-muted-foreground">
          <div>Name</div>
          <div className="text-right">Debt</div>
          <div className="text-right">Get</div>
        </div>
        <div className="w-full flex flex-col gap-2 mt-4 font-semibold ">
          <div className="grid grid-cols-[140px_80px_80px]   place-content-center">
            <div className="w-[60px]">{data.main.debt.first.name}</div>
            <div className="text-primary text-right">
              {data.main.debt.first.amount.toFixed(1)}
            </div>
            <div className="text-green-500 text-right">
              {data.main.get.first.amount.toFixed(1)}
            </div>
          </div>
          <div className=" grid grid-cols-[140px_80px_80px]   place-content-center">
            <div className="w-[60px]">{data.main.debt.second.name}</div>
            <div className="text-primary text-right">
              {data.main.debt.second.amount.toFixed(1)}
            </div>
            <div className="text-green-500 text-right">
              {data.main.get.second.amount.toFixed(1)}
            </div>
          </div>
          <div className="grid grid-cols-[140px_80px_80px]   place-content-center">
            <div className="w-[60px]">{data.main.debt.third.name}</div>
            <div className="text-primary text-right">
              {data.main.debt.third.amount.toFixed(1)}
            </div>
            <div className="text-green-500 text-right">
              {data.main.get.third.amount.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtsHolder;
