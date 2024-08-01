import DateSelector from "@/components/DateSelector";
import HistoryHolder from "@/components/HistoryHolder";
import useFetch from "@/hooks/network/useFetch";
import { HistoryDataTypes } from "@/types/responseTypes";
import { useState } from "react";
import dayjs from "dayjs";
import Loader from "@/components/Loader";

const History = () => {
  const [selectedDateFrame, setSelectedDataFrame] = useState(7);

  const onDateSelect = (amount: number) => {
    setSelectedDataFrame(amount);
  };

  const { data, isLoading } = useFetch<HistoryDataTypes>(
    `/expenditure/getAll?timeFrame=${selectedDateFrame}`,
    {
      onSuccess: () => console.log(data),
    }
  );

  return (
    <div className="px-4 mt-8 lg:px-28">
      <div>
        <div className="text-[23px] font-semibold">History</div>
        <div className="text-muted-foreground">
          Track all past transactions and payments.
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        <DateSelector
          selected={selectedDateFrame === 7}
          onClick={() => onDateSelect(7)}
        >
          7 days
        </DateSelector>
        <DateSelector
          selected={selectedDateFrame === 30}
          onClick={() => onDateSelect(30)}
        >
          1 Month
        </DateSelector>
        <DateSelector
          selected={selectedDateFrame === 60}
          onClick={() => onDateSelect(60)}
        >
          2 Months
        </DateSelector>
      </div>

      <div className="mt-[40px] flex flex-col gap-8 pb-20">
        {isLoading && <Loader />}
        {!isLoading &&
          data &&
          data?.expenditure.map((main, i) => (
            <div key={i}>
              <div className="text-[12px] text-muted-foreground">
                {dayjs(main.month).format("MMMM YYYY")}
              </div>
              {main.expenditure_list.map((exp, i) => (
                <HistoryHolder
                  key={i}
                  amount={exp.amount}
                  date={dayjs(exp.date).format("dddd, D MMMM YYYY")}
                  description={exp.description}
                  name={exp.member}
                  profile={exp.profile}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
