import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { handleLoginUser } from '@/services/userService';
import { IUser } from 'interface/userTypes';
import { useNavigate } from 'react-router-dom';
type loginView = {};
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(3) });

export const LoginView: React.FC<loginView> = () => {
   const navigate = useNavigate();

   const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });
   const onSubmit = async (data: z.infer<typeof loginSchema>) => {
      const loginUser = data as Partial<IUser>;
      try {
         await handleLoginUser(loginUser);

         navigate('/');
      } catch (error) {
         console.error('Login failed:', error);
      }
   };
   return (
      <div className="h-screen flex justify-center items-center flex-col">
         <div className="w-full flex items-center justify-center"></div>

         <Card className="w-[350px]">
            <div className="flex items-center justify-between">
               <CardHeader>
                  <CardTitle>Login</CardTitle>
               </CardHeader>
               <Link to="/signup" className="text-primary">
                  <Button variant="link" className="hover:bg-muted/50 rounded-md">
                     {'Sign Up'}
                  </Button>
               </Link>
            </div>
            <CardContent>
               <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="Email" {...field} />
                              </FormControl>
                              <FormDescription>Login with your email</FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input placeholder="Password" type="password" {...field} />
                              </FormControl>
                              <FormDescription>Login with your password</FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type="submit">Login</Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
};
