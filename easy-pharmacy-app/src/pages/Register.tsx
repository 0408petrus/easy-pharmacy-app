import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { NavLink } from 'react-router';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age?: number;
}

export default function Register() {
  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    age: z.number().optional(),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(schema)
  })

  function registerUser(data: RegisterData) {
    console.log(data)
    alert(JSON.stringify(data))
    
    // Save user data to local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-4 bg-white p-8 w-[350px] rounded-lg shadow-lg">
        <h1 className="text-3xl">Register</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border border-slate-200 py-1 px-3 rounded-md dark:bg-slate-800 dark:text-white hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
            {...register('name')}
          />
          {errors.name?.message && <p className='text-red-500 text-sm'>{errors.name?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border border-slate-200 py-1 px-3 rounded-md dark:bg-slate-800 dark:text-white hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
            {...register('email')}
          />
          {errors.email?.message && <p className='text-red-500 text-sm'>{errors.email?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border border-slate-200 py-1 px-3 rounded-md dark:bg-slate-800 dark:text-white hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
            {...register('password')}
          />
          {errors.password?.message && <p className='text-red-500 text-sm'>{errors.password?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="border border-slate-200 py-1 px-3 rounded-md dark:bg-slate-800 dark:text-white hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message && <p className='text-red-500 text-sm'>{errors.confirmPassword?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="Age"
            className="border border-slate-200 py-1 px-3 rounded-md dark:bg-slate-800 dark:text-white hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age?.message && <p className='text-red-500 text-sm'>{errors.age?.message}</p>}
        </div>

        <button className="mt-4 border border-blue-500 text-blue-500 py-1 px-3 rounded-md cursor-pointer">
          Register
        </button>

        <div>
          <p className="mt-4 text-center">Have an account? <NavLink to="/login" className="text-blue-500">Login</NavLink></p>
        </div>
      </form>
    </div>
  );
}