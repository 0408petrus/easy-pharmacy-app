import { useEffect, useRef } from "react"
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Label from "../components/UI/Label";
import useAuth from "../hooks/useAuth.tsx";
import { NavLink } from "react-router";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const { error, errors, login, email, setEmail, password, setPassword } = useAuth()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form onSubmit={handleSubmit} className=" bg-white p-8 w-[350px] rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6">Login</h1>
        {error && <div className="bg-red-50 text-red-400 px-4 py-2 mb-4 rounded-lg">{error}</div>}

        <div className="my-4">
          <Label htmlFor="email">Email</Label>
          <Input
            className="w-full"
            ref={emailRef}
            id="email"
            value={email}
            error={errors.email}
            onChange={(v) => setEmail(v)}
            placeholder="Email" />
        </div>

        <div className="my-4">
          <Label htmlFor="password">Password</Label>
          <Input
            className="w-full"
            id="password"
            value={password}
            error={errors.password}
            onChange={(v) => setPassword(v)}
            type="password"
            placeholder="Password" />
        </div>

        <div className="mt-8">
          <Button label="Login" className='w-full' />
        </div>

        <div>
          <p className="mt-4 text-center">Don't have an account? <NavLink to="/register" className="text-blue-500">Register</NavLink></p>
        </div>
      </form>
    </div>
  )
}