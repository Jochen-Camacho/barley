import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@apollo/client";

const AddForm = ({ formTypeData, options, closeForm }) => {
  const [functionForMutation, result] = useMutation(formTypeData.query);
  const form = useForm({
    resolver: zodResolver(formTypeData.formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      job: "",
      department: "",
      country: "",
      city: "",
    },
  });

  const onSubmit = (data) => {
    const dataValues = formTypeData.submitFunc(data);
    // console.log(dataValues);
    functionForMutation({ variables: { ...dataValues } });
    if (result.error) console.log(result.error);
    closeForm();
  };

  return (
    <Card>
      <CardContent className="py-2 px-0 pr-4">
        <ScrollArea className="h-[500px]  px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="py-6 flex flex-col gap-3"
            >
              {formTypeData.fields.map((formField) => {
                return (
                  <FormField
                    key={formField.name}
                    control={form.control}
                    name={formField.key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{formField.name}</FormLabel>
                        <FormControl>
                          {formField.value === "Input" ? (
                            <Input placeholder={formField.name} {...field} />
                          ) : formField.value === "Select" ? (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={formField.name} />
                              </SelectTrigger>
                              <SelectContent>
                                {options[formField.key].map((o, index) => {
                                  return (
                                    <SelectItem key={index} value={o}>
                                      {o}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          ) : null}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              <Button className="mt-5">Create</Button>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AddForm;
