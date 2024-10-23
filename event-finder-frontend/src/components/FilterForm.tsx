import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  location: z.string().optional(),
  priceRange: z.array(z.number()).length(2).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  author: z.string().optional(),
  ageLimit: z.number().optional(),
  needsApproval: z.boolean().optional(),
});

type FilterFormProps = {};

export default function FilterForm({}: FilterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      priceRange: [0, 100],
      startDate: "",
      endDate: "",
      author: "",
      ageLimit: 0,
      needsApproval: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Search location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  onValueChange={(value) => {
                    const [min, max] = value;
                    const newMin = Math.max(0, min);
                    const newMax = Math.min(100, max);
                    field.onChange([newMin, newMax]);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
