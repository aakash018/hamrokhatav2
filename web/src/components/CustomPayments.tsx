import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MembersType } from "@/types/global";
import { usePost } from "@/hooks/network/usePost";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  amount: z.coerce.number().min(2),
  paidBy: z
    .string()
    .min(1)
    .transform((val) => parseInt(val)),
  remarks: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  membersData: MembersType[];
}

const CustomPayments = ({ membersData }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      paidBy: undefined,
      remarks: "",
    },
  });

  const [frozenMembers, setFrozenMembers] = useState<number[]>([]);

  const { isLoading, mutate } = usePost<
    { status: number; message: string },
    FormSchema
  >("/expenditure/createCustom", {
    onSuccess: (data) => {
      toast(data.message, {
        position: "top-center",
        style: {
          color: "green",
        },
      });

      form.reset();
    },
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e: any) => {
          e.frozenAccounts = frozenMembers;
          mutate(e);
        })}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ? field.value : ""}
                  onChange={field.onChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="bg-muted p-2 rounded-md border ">
          <div className="text-sm mb-2">Frozen Members</div>
          <div className="flex gap-4 ">
            {membersData.map((member) => (
              <div
                className={`w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer
                    ${
                      frozenMembers.includes(member.id)
                        ? "border-2 border-primary"
                        : ""
                    }
                `}
                onClick={() => {
                  if (frozenMembers.includes(member.id)) {
                    setFrozenMembers((prev) =>
                      prev.filter((id) => id !== member.id)
                    );
                  } else {
                    setFrozenMembers((prev) => [...prev, member.id]);
                  }
                }}
              >
                {member.profileUrl && (
                  <img src={member.profileUrl} alt="profile_pic" />
                )}
              </div>
            ))}
          </div>
        </div>
        <FormField
          control={form.control}
          name="paidBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid By</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ? field.value.toString() : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {membersData?.map((member) => (
                    <SelectItem value={member.id.toString()} key={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ? field.value : ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CustomPayments;
