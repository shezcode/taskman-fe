"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/useAuth";
import { loginUser } from "@/lib/fetch/loginUser";
import { dep, registerUser } from "@/lib/fetch/registerUser";
import { Select } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmRegPassword, setConfirmRegPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tab, setTab] = useState("login")
  const [regUser, setRegUser] = useState<{
    nombre: string,
    email: string,
    password: string,
    departamento: dep,
  }>({
    nombre: "",
    email: "",
    password: "",
    departamento: "frontend"
  })

  const { setUser, login } = useAuth();

  useEffect(() => {
    if (regPassword !== confirmRegPassword) {
      setPasswordError("Las contraseñas no coinciden.")
    } else {
      setPasswordError("");
    }
  }, [regPassword, confirmRegPassword])

  const onTabChange = (value: string) => {
    setTab(value);
  }

  const { toast } = useToast();

  const router = useRouter();

  const handleSelect = (value: dep) => {
    setRegUser((prev) => ({ ...prev, departamento: value }))
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = {
      ...regUser,
      password: regPassword
    }
    const res = await registerUser(updatedUser.nombre, updatedUser.email, updatedUser.password, updatedUser.departamento);
    if (!res.error) {
      toast({
        title: `${res.message}`,
        description: "Accede para comenzar a utilizar tu cuenta"
      })
      router.push("/usuario")
    } else {
      toast({
        title: "Error al realizar el registro",
        description: `${res.error}`
      })
      router.push("/login")
    }
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (!res.error) {

      // Set user using the login function that updates both context and localStorage
      login(email);
      setUser(email);

      toast({
        title: `${res.message}`,
        description: "Bienvenido"
      })
      router.push("/proyecto")
      router.refresh();
    } else {
      toast({
        title: `${res.error}`,
      })
    }
  }

  return (
    <div className="mt-8 p-6 border-[1.5px] border-slate rounded-xl ">
      <h1 className="hollow-text font-extrabold text-[42px]">taskMan</h1>
      <Separator />
      <Tabs value={tab} onValueChange={onTabChange} defaultValue="login" className="w-[400px] mt-14">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Crea tu cuenta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form method="post" onSubmit={handleLogin}>
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Accede a tu cuenta personal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <PasswordInput id="password" required minLength={2} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter className="gap-4 flex flex-row justify-between">
                <Button type="submit">Login</Button>
                <CardDescription className="flex items-center flex-row gap-2">
                  <Button variant={"link"} className="p-0" onClick={() => setTab("register")}>Registrate</Button>
                </CardDescription>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form method="post" onSubmit={handleRegister}>
            <Card>
              <CardHeader>
                <CardTitle>Unete a taskMan.</CardTitle>
                <CardDescription>
                  Crea tu cuenta para poder empezar a disfrutar de nuestra aplicación.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" type="text"
                    required autoComplete="off" minLength={2} maxLength={30}
                    value={regUser.nombre}
                    onChange={(e) => { setRegUser((prev) => ({ ...prev, nombre: e.target.value })) }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email"
                    value={regUser.email}
                    onChange={(e) => { setRegUser((prev) => ({ ...prev, email: e.target.value })) }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Elige tu contraseña</Label>
                  <PasswordInput id="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirm">Confirma tu contraseña</Label>
                  {passwordError
                    ?
                    <div>
                      <PasswordInput className="border-[1.5px] border-red-500" id="password-confirm" value={confirmRegPassword} onChange={(e) => setConfirmRegPassword(e.target.value)} />
                      <p className="text-red-500">Las contraseñas no coinciden.</p>
                    </div>
                    :
                    <PasswordInput id="password-confirm" value={confirmRegPassword} onChange={(e) => setConfirmRegPassword(e.target.value)} />
                  }
                  <p></p>
                </div>

                <div className="space-y-4">
                  <Select
                    name="departamento"
                    value={regUser.departamento}
                    onValueChange={handleSelect}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Elige tu departamento</SelectLabel>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="ui">UI/UX</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={passwordError ? true : false}>Crea tu cuenta</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
      <div className="w-full self-end text-right mt-24">
        <h2 className="italic">El mundo <strong>necesitaba</strong> un task manager mas.</h2>
        <h3 className=""></h3>

      </div>
    </div>
  )
}
