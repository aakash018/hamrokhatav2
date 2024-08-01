import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePost } from "@/hooks/network/usePost";
import useFetch from "@/hooks/network/useFetch";

import { MembersType } from "@/types/global";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.coerce.number().min(2),
  paidBy: z
    .string()
    .min(1)
    .transform((val) => parseInt(val)),
  remarks: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

const Add = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      paidBy: undefined,
      remarks: "",
    },
  });

  const { isLoading: isMembersLoading, data: membersData } = useFetch<{
    status: number;
    members: MembersType[];
  }>("/members/getAll");

  const { isLoading, mutate } = usePost<
    { status: number; message: string },
    FormSchema
  >("/expenditure/create", {
    onSuccess: () => {
      toast("expenditure was logged", {
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

  function onSubmit(values: FormSchema) {
    mutate(values);
  }

  return (
    <div
      className="w-screen  flex justify-center items-center lg:!h-screen lg:w-full"
      style={{
        height: "calc(100vh - 150px)",
      }}
    >
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Log a Payment</CardTitle>
            <CardDescription>Record your recent spending</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                          {membersData?.members.map((member) => (
                            <SelectItem
                              value={member.id.toString()}
                              key={member.id}
                            >
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Add;
