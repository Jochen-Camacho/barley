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
      email: "",
      job: "",
      department: "",
      country: "",
      city: "",
      base: "",
      variable: "",
      bonus: "",
      benefits: "",
      equity: "",
    },
  });

  const onSubmit = (data) => {
    const dataValues = formTypeData.submitFunc(data);
    console.log(dataValues);
    functionForMutation({ variables: { ...dataValues } });
    if (result.error) console.log(result.error);
    console.log(result);
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
                              onValueChange={(value) => {
                                console.log(value);
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={formField.name}>
                                  {typeof options[formField.key] === "object"
                                    ? options[formField.key].find(
                                        (o) => o.id === Number(field.value)
                                      )?.title
                                    : formField.value}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {options[formField.key].map((o, index) => {
                                  return (
                                    <SelectItem
                                      key={index}
                                      value={typeof o === "object" ? o.id : o}
                                    >
                                      {typeof o === "object" ? o.title : o}
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

              <Button className="mt-5" type="submit">
                Create
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AddForm;
