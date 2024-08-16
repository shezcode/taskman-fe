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
import { Select } from "@radix-ui/react-select";
import { useState } from "react";

export default function Login() {

  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("login")

  const onTabChange = (value: string) => {
    setTab(value);
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
              <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </CardContent>
          <CardFooter className="gap-4 flex flex-row justify-between">
            <Button>Login</Button>
            <CardDescription className="flex items-center flex-row gap-2">
              <p className="px-0 italic">No tienes cuenta?</p>
              <Button variant={"link"} className="p-0" onClick={() => setTab("register")}>Registrate</Button>
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
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
              <Input id="name" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Elige tu contraseña</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirm">Confirma tu contraseña</Label>
              <Input id="password-confirm" type="password" />
            </div>

            <div className="space-y-4">
              <Select name="departamento">
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
            <Button>Crea tu cuenta</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
