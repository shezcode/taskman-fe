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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { dep, registerUser } from "@/lib/fetch/registerUser";
import { DEPARTAMENTOS } from "@/lib/utils";
import { Select } from "@radix-ui/react-select";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {

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

  useEffect(() => {
    if (regPassword !== confirmRegPassword) {
      setPasswordError("Las contraseñas no coinciden.")
    } else {
      setPasswordError("");
    }
    console.log(DEPARTAMENTOS.backend)
  }, [regPassword, confirmRegPassword])

  const onTabChange = (value: string) => {
    setTab(value);
  }

  const handleSelect = (value: dep) => {
    setRegUser((prev) => ({ ...prev, departamento: value }))
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(regUser.nombre, regUser.email, regUser.password, regUser.departamento);
  }

  return (
    <Tabs value={tab} onValueChange={onTabChange} defaultValue="login" className="w-[400px] mt-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Crea tu cuenta</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
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
              <Input id="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña</Label>
              <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="gap-4 flex flex-row justify-between">
            <Button>Login</Button>
            <CardDescription className="flex items-center flex-row gap-2">
              <Button variant={"link"} className="p-0" onClick={() => setTab("register")}>Registrate</Button>
            </CardDescription>
          </CardFooter>
        </Card>
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
                    <PasswordInput className="border-[1.5px] border-red-500" id="password-confirm" value={confirmRegPassword} onChange={(e) => setConfirmRegPassword(e.target.value)} />
                  : 
                    <PasswordInput id="password-confirm" value={confirmRegPassword} onChange={(e) => setConfirmRegPassword(e.target.value)} />
                }
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
  )
}
