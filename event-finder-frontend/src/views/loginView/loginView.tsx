import { useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
type loginView = {};
const signupSchema = z.object({ username: z.string().min(2), email: z.string().email(), password: z.string().min(8), date: z.coerce.date() });

export const LoginView: React.FC<loginView> = () => {
   const [isSignup, setIsSignup] = useState(true);
   const [currentStep, setCurrentStep] = useState(1);
   const handleToggle = () => {
      setIsSignup(!isSignup);
      setCurrentStep(1);
   };
   const handleNextStep = () => {
      setCurrentStep(currentStep + 1);
   };
   const handlePrevStep = () => {
      setCurrentStep(currentStep - 1);
   };
   const signupForm = useForm<z.infer<typeof signupSchema>>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         username: '',
         email: '',
         password: '',
      },
   });
   const onSubmit = (data: z.infer<typeof signupSchema>) => {
      console.log(data);
   };
   return (
      <div className="h-screen flex justify-center items-center">
         {isSignup ? (
            <Card className="w-[350px]">
               <CardHeader>
                  <CardTitle>Signup</CardTitle>
               </CardHeader>
               <CardContent>
                  <Form {...signupForm}>
                     <form onSubmit={signupForm.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                           control={signupForm.control}
                           name="username"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Username</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Username" {...field} />
                                 </FormControl>
                                 <FormDescription>This is your public display name.</FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={signupForm.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Email</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Email" {...field} />
                                 </FormControl>
                                 <FormDescription>This is your email</FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={signupForm.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Password</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Password" type="password" {...field} />
                                 </FormControl>
                                 <FormDescription>This is your password</FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={signupForm.control}
                           name="date"
                           render={({ field }) => (
                              <FormItem className="flex flex-col items-start">
                                 <FormLabel>Date of birth</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                             {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                       </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                       <Calendar
                                          mode="single"
                                          captionLayout="dropdown-buttons"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          fromYear={1900}
                                          toYear={new Date().getFullYear()}
                                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                          initialFocus
                                       />
                                    </PopoverContent>
                                 </Popover>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button type="submit">Submit</Button>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         ) : (
            <Card className="w-[350px]"></Card>
         )}
      </div>
   );
};
