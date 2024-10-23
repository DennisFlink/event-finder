import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Switch } from "./ui/switch";
import { getEventsByFilter } from "@/services/eventService";
import { EventsFilter } from "interface/eventTypes";
const formSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  priceRange: z.array(z.number()).length(2).optional(),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  author: z.string().optional(),
  ageLimit: z.coerce.number().optional(),
  needsApproval: z.boolean().optional(),
});

type FilterFormProps = {};

export default function FilterForm({}: FilterFormProps) {
  const [pickedDateRange, setPickedDateRange] = React.useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      priceRange: [0, 9999],
      date: {
        from: new Date(),
        to: addDays(new Date(), 1),
      },
      author: "",
      ageLimit: 0,
      needsApproval: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const filterValues: EventsFilter = {
      title: values.title,
      location: values.location,
      date: pickedDateRange
        ? {
            from: pickedDateRange.from?.toISOString(),
            to: pickedDateRange.to?.toISOString(),
          }
        : undefined,
      author: values.author,
      ageLimit: values.ageLimit,
      needsApproval: values.needsApproval,
    };

    console.log("Filter values:", filterValues);
    const events = await getEventsByFilter(filterValues);
    console.log("Events by search:", events);
  }
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <p className="text-sm italic">Min</p>
              <Input
                value={`${minPrice} kr`}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <p className="text-sm italic">Max</p>
              <Input
                value={`${maxPrice} kr`}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <FormControl>
                <Slider
                  value={[minPrice, maxPrice]}
                  max={9999}
                  step={10}
                  minStepsBetweenThumbs={1}
                  className="p-3"
                  onValueChange={(value) => {
                    setMinPrice(value[0]);
                    setMaxPrice(value[1]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <div className={cn("grid gap-2")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !pickedDateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickedDateRange?.from ? (
                          pickedDateRange.to ? (
                            <>
                              {format(pickedDateRange.from, "LLL dd, y")} -{" "}
                              {format(pickedDateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(pickedDateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={pickedDateRange?.from}
                        selected={pickedDateRange}
                        onSelect={setPickedDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Search Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Limit</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="needsApproval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Need approval</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
