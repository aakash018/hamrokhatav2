import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MembersType } from "@/types/global";
import { usePost } from "@/hooks/network/usePost";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.coerce.number().min(2),
  paidBy: z
    .string()
    .min(1)
    .transform((val) => parseInt(val)),
  paidTo: z
    .string()
    .min(1)
    .transform((val) => parseInt(val)),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  membersData: MembersType[];
}

const PersonalLogEntry = ({ membersData }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      paidBy: undefined,
      paidTo: undefined,
    },
  });

  const { isLoading, mutate } = usePost<
    { status: number; message: string },
    FormSchema
  >("/personalPayment/create", {
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
        onSubmit={form.handleSubmit((e) => {
          if (e.paidBy === e.paidTo) {
            form.setError("paidBy", {
              message: "Paid By and Paid To can't be same",
            });

            form.setError("paidTo", {
              message: "Paid By and Paid To can't be same",
            });
            return;
          }
          mutate(e);
        })}
        className="flex flex-col gap-4"
      >
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
          name="paidTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid To</FormLabel>
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
        <Button type="submit" disabled={isLoading} className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PersonalLogEntry;
