import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import IEvent from '../../interface/eventTypes';
import { createEvent } from '@/services/eventService';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/store/useUserStore';
const formSchema = z.object({
   title: z.string().min(2).max(50),
   description: z.string().min(10).max(500),
   isMultipleDays: z.boolean(),
   date: z.object({
      from: z.date(),
      to: z.date().optional(),
   }),
   location: z.string().min(1),
   maxAttendees: z.coerce.number().int().positive().optional(),
   isPrivate: z.boolean(),
   secretInfo: z.string().optional(),
   isPaymentRequired: z.boolean(),
   price: z.coerce.number().int().positive().optional(),
   isRegisterRequired: z.boolean(),
   needApproval: z.boolean(),
   images: z.array(z.string()).optional(),
   isAgeLimit: z.boolean(),
   ageLimit: z.coerce.number().int().positive().optional(),
});

type CreateEventFormProps = {};

export default function CreateEventForm({}: CreateEventFormProps) {
   const navigate = useNavigate();
   const [pickedDateRange, setPickedDateRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
   });
   const { user, fetchUserProfile } = useUserStore();
   const { toast } = useToast();
   const [isLoading, setIsLoading] = React.useState(false);
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: '',
         description: '',
         isMultipleDays: false,
         date: pickedDateRange,
         location: '',
         maxAttendees: undefined,
         isPrivate: false,
         secretInfo: '',
         isPaymentRequired: false,
         price: undefined,
         isRegisterRequired: false,
         needApproval: false,
         images: [''],
         isAgeLimit: false,
         ageLimit: undefined,
      },
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      console.log(values);
      console.log(pickedDateRange?.from);
      const newEvent: IEvent = {
         title: values.title,
         description: values.description,
         startDate: pickedDateRange!.from!.toISOString(),
         endDate: pickedDateRange!.to ? pickedDateRange!.to!.toISOString() : undefined,
         location: values.location,
         maxAttendees: values.maxAttendees ? values.maxAttendees : 0,
         isPrivate: values.isPrivate,
         secretInfo: values.secretInfo,
         isPaymentRequired: values.isPaymentRequired,
         price: values.price,
         isRegisterRequired: values.isRegisterRequired,
         needApproval: values.needApproval,
         images: values.images,
         ageLimit: values.ageLimit ? values.ageLimit : 0,
      };
      const response = await createEvent(newEvent);
      setIsLoading(false);
      form.reset();
      toast({
         title: `${response.title} created`,
         description: `Event has been created`,
      });

      navigate(-1);
   }

   const isMultipleDays = form.watch('isMultipleDays');
   const isPaymentRequired = form.watch('isPaymentRequired');
   const isAgeLimit = form.watch('isAgeLimit');

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[500px] w-full p-6">
               <div className="flex flex-col gap-5">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input placeholder="Golf together" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea placeholder="Type your description here" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="isMultipleDays"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                              <FormLabel>Mulitple days</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                       queueMicrotask(() => {
                                          field.onChange(value);
                                       });
                                    }}
                                 />
                              </FormControl>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {isMultipleDays ? (
                     <div className="flex gap-5">
                        <FormField
                           control={form.control}
                           name="date"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Date Range</FormLabel>
                                 <FormControl>
                                    <div className={cn('grid gap-2')}>
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <Button id="date" variant={'outline'} className={cn('w-[300px] justify-start text-left font-normal', !pickedDateRange && 'text-muted-foreground')}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {pickedDateRange?.from ? (
                                                   pickedDateRange.to ? (
                                                      <>
                                                         {format(pickedDateRange.from, 'LLL dd, y')} - {format(pickedDateRange.to, 'LLL dd, y')}
                                                      </>
                                                   ) : (
                                                      format(pickedDateRange.from, 'LLL dd, y')
                                                   )
                                                ) : (
                                                   <span>Pick a date</span>
                                                )}
                                             </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0" align="start">
                                             <Calendar initialFocus mode="range" defaultMonth={pickedDateRange?.from} selected={pickedDateRange} onSelect={setPickedDateRange} numberOfMonths={2} />
                                          </PopoverContent>
                                       </Popover>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  ) : (
                     <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <Button variant={'outline'} className={cn('w-[300px] justify-start text-left font-normal', !pickedDateRange?.from && 'text-muted-foreground')}>
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {pickedDateRange!.from ? format(pickedDateRange!.from, 'LLL dd, y') : <span>Pick a date</span>}
                                       </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                       <Calendar mode="single" selected={pickedDateRange?.from} onSelect={(date) => setPickedDateRange({ from: date, to: undefined })} initialFocus />
                                    </PopoverContent>
                                 </Popover>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  )}

                  <FormField
                     control={form.control}
                     name="location"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Location</FormLabel>
                           <FormControl>
                              <Input placeholder="Lidköping" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="maxAttendees"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel> Max Participants</FormLabel>
                           <FormControl>
                              <Input type="number" placeholder="Leave empty if no limit" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="isPrivate"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                              <FormLabel>Private</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                       queueMicrotask(() => {
                                          field.onChange(value);
                                       });
                                    }}
                                 />
                              </FormControl>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="secretInfo"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Secret Info</FormLabel>
                           <FormControl>
                              <Textarea placeholder="Type your description here" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="isPaymentRequired"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                              <FormLabel>Payment</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                       queueMicrotask(() => {
                                          field.onChange(value);
                                       });
                                    }}
                                 />
                              </FormControl>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {isPaymentRequired && (
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input type="number" placeholder="1000" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  )}

                  <FormField
                     control={form.control}
                     name="isRegisterRequired"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                              <FormLabel>Register required</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                       queueMicrotask(() => {
                                          field.onChange(value);
                                       });
                                    }}
                                 />
                              </FormControl>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="needApproval"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                              <FormLabel>Need approval</FormLabel>
                              <FormControl>
                                 <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="images"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Image</FormLabel>
                           <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="isAgeLimit"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                              <FormLabel>Age limit</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                       queueMicrotask(() => {
                                          field.onChange(value);
                                       });
                                    }}
                                 />
                              </FormControl>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {isAgeLimit && (
                     <FormField
                        control={form.control}
                        name="ageLimit"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input type="number" placeholder="18" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  )}
               </div>
            </ScrollArea>

            <Button disabled={isLoading} type="submit">
               Submit
            </Button>
         </form>
      </Form>
   );
}
