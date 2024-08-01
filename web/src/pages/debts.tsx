import DebtsHolder from "@/components/DebtsHolder";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/network/useFetch";
import { MembersType } from "@/types/global";
import { useState } from "react";
import { toast } from "sonner";

interface DebtsDataType {
  debt_id: number;
  from_member_name: string;
  to_member_name: string;
  amount: number;
}

interface ApiResponseType {
  status: number;
  debts: DebtsDataType[];
}

interface stateData {
  from: DebtsDataType[];
  to: DebtsDataType[];
}

const Debts = () => {
  const [subashData, setSubashData] = useState<stateData | null>(null);
  const [rohanData, setRohanData] = useState<stateData | null>(null);
  const [aakashData, setAakashData] = useState<stateData | null>(null);
  const [bikashData, setBikashData] = useState<stateData | null>(null);
  const { isLoading } = useFetch<ApiResponseType>("/debts/getAll", {
    onSuccess: (data) => {
      console.log("here", data);
      const fromSubash = data?.debts.filter(
        (e) => e.from_member_name === "Subash"
      );
      const fromRohan = data?.debts.filter(
        (e) => e.from_member_name === "Rohan"
      );
      const fromAakash = data?.debts.filter(
        (e) => e.from_member_name === "Aakash"
      );

      const fromBikash = data?.debts.filter(
        (e) => e.from_member_name === "Bikash"
      );

      const toSubash = data?.debts.filter((e) => e.to_member_name === "Subash");
      const toRohan = data?.debts.filter((e) => e.to_member_name === "Rohan");
      const toAakash = data?.debts.filter((e) => e.to_member_name === "Aakash");
      const toBikash = data?.debts.filter((e) => e.to_member_name === "Bikash");

      setSubashData({
        from: fromSubash,
        to: toSubash,
      });
      setRohanData({
        from: fromRohan,
        to: toRohan,
      });
      setAakashData({
        from: fromAakash,
        to: toAakash,
      });
      setBikashData({
        from: fromBikash,
        to: toBikash,
      });
    },
  });

  const { isLoading: isMembersLoading, data: membersData } = useFetch<{
    status: number;
    members: MembersType[];
  }>("/members/getAll", {
    onError: (data) => {
      toast(data.message, {
        position: "top-center",
        style: {
          color: "red",
        },
      });
    },
  });

  return (
    <div className="px-4 lg:px-28">
      <div className="mt-[30px] flex flex-col gap-4">
        <div className="text-[23px] font-semibold">Debts</div>
        <div className="text-muted-foreground">
          See how much you owe to each member
        </div>
      </div>
      <div className=" flex flex-wrap justify-center lg:justify-start mt-6 gap-6 pb-[100px]">
        {isLoading && isMembersLoading && <Loader />}

        {!!rohanData && (
          <DebtsHolder
            profileImg={
              membersData?.members.find((member) => member.name === "Rohan")
                ?.profileUrl
            }
            data={{
              main: {
                name: "Rohan",
                debt: {
                  first: {
                    name: "Subash",
                    amount: rohanData!.from.find(
                      (e) => e.to_member_name === "Subash"
                    )!.amount,
                  },
                  second: {
                    name: "Aakash",
                    amount: rohanData!.from.find(
                      (e) => e.to_member_name === "Aakash"
                    )!.amount,
                  },
                  third: {
                    name: "Bikash",
                    amount: rohanData!.from.find(
                      (e) => e.to_member_name === "Bikash"
                    )!.amount,
                  },
                },
                get: {
                  first: {
                    name: "Subash",
                    amount: rohanData!.to.find(
                      (e) => e.from_member_name === "Subash"
                    )!.amount,
                  },
                  second: {
                    name: "Aakash",
                    amount: rohanData!.to.find(
                      (e) => e.from_member_name === "Aakash"
                    )!.amount,
                  },
                  third: {
                    name: "Bikash",
                    amount: rohanData!.to.find(
                      (e) => e.from_member_name === "Bikash"
                    )!.amount,
                  },
                },
              },
            }}
          />
        )}
        {!!subashData && (
          <DebtsHolder
            profileImg={
              membersData?.members.find((member) => member.name === "Subash")
                ?.profileUrl
            }
            data={{
              main: {
                name: "Subash",
                debt: {
                  first: {
                    name: "Aakash",
                    amount: subashData!.from.find(
                      (e) => e.to_member_name === "Aakash"
                    )!.amount,
                  },
                  second: {
                    name: "Bikash",
                    amount: subashData!.from.find(
                      (e) => e.to_member_name === "Bikash"
                    )!.amount,
                  },
                  third: {
                    name: "Rohan",
                    amount: subashData!.from.find(
                      (e) => e.to_member_name === "Rohan"
                    )!.amount,
                  },
                },
                get: {
                  first: {
                    name: "Aakash",
                    amount: subashData!.to.find(
                      (e) => e.from_member_name === "Aakash"
                    )!.amount,
                  },
                  second: {
                    name: "Bikash",
                    amount: subashData!.to.find(
                      (e) => e.from_member_name === "Bikash"
                    )!.amount,
                  },
                  third: {
                    name: "Rohan",
                    amount: subashData!.to.find(
                      (e) => e.from_member_name === "Rohan"
                    )!.amount,
                  },
                },
              },
            }}
          />
        )}
        {!!aakashData && (
          <DebtsHolder
            profileImg={
              membersData?.members.find((member) => member.name === "Aakash")
                ?.profileUrl
            }
            data={{
              main: {
                name: "Aakash",
                debt: {
                  first: {
                    name: "Bikash",
                    amount: aakashData!.from.find(
                      (e) => e.to_member_name === "Bikash"
                    )!.amount,
                  },
                  second: {
                    name: "Rohan",
                    amount: aakashData!.from.find(
                      (e) => e.to_member_name === "Rohan"
                    )!.amount,
                  },
                  third: {
                    name: "Subash",
                    amount: aakashData!.from.find(
                      (e) => e.to_member_name === "Subash"
                    )!.amount,
                  },
                },
                get: {
                  first: {
                    name: "Bikash",
                    amount: aakashData!.to.find(
                      (e) => e.from_member_name === "Bikash"
                    )!.amount,
                  },
                  second: {
                    name: "Rohan",
                    amount: aakashData!.to.find(
                      (e) => e.from_member_name === "Rohan"
                    )!.amount,
                  },
                  third: {
                    name: "Subash",
                    amount: aakashData!.to.find(
                      (e) => e.from_member_name === "Subash"
                    )!.amount,
                  },
                },
              },
            }}
          />
        )}

        {!!bikashData && (
          <DebtsHolder
            profileImg={
              membersData?.members.find((member) => member.name === "Bikash")
                ?.profileUrl
            }
            data={{
              main: {
                name: "Bikash",
                debt: {
                  first: {
                    name: "Aakash",
                    amount: bikashData!.from.find(
                      (e) => e.to_member_name === "Aakash"
                    )!.amount,
                  },
                  second: {
                    name: "Subash",
                    amount: bikashData!.from.find(
                      (e) => e.to_member_name === "Subash"
                    )!.amount,
                  },
                  third: {
                    name: "Rohan",
                    amount: bikashData!.from.find(
                      (e) => e.to_member_name === "Rohan"
                    )!.amount,
                  },
                },
                get: {
                  first: {
                    name: "Aakash",
                    amount: bikashData!.to.find(
                      (e) => e.from_member_name === "Aakash"
                    )!.amount,
                  },
                  second: {
                    name: "Subash",
                    amount: bikashData!.to.find(
                      (e) => e.from_member_name === "Subash"
                    )!.amount,
                  },
                  third: {
                    name: "Rohan",
                    amount: bikashData!.to.find(
                      (e) => e.from_member_name === "Rohan"
                    )!.amount,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Debts;
