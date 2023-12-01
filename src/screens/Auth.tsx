import { Button, Input } from "@nextui-org/react"

import Image from "next/image"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { User } from "@/types/user.types"
import logo from "@/assets/images/logoHercules.png"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { useForm } from "react-hook-form"
import { useState } from "react"

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  const [logUp, setLogUp] = useState(false)

  const { signUp, signIn } = useAuthStore()
  const [authenticating, setAuthenticating] = useState(false)

  const onSubmit = async (userdata: User) => {
    setAuthenticating(true)
    try {
      if (!logUp) {
        await signIn(userdata)
        toast.success("Autenticación exitosa")
      } else {
        await signUp(userdata)
        toast.success("Registro exitoso")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    setAuthenticating(false)
  }

  return (
    <Screen isAuth>
      <Image
        src={logo}
        alt="Hércules Logo"
        quality={100}
        width={180}
        className="self-center"
      />
      <section className="flex flex-col items-start gap-4">
        <Title>{logUp ? "Registrarse" : "Autenticarse"}</Title>
        <Subtitle>
          Por favor, completá los siguientes datos para continuar
        </Subtitle>
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 w-full px-4"
      >
        {logUp && (
          <Input
            id="name"
            size="sm"
            variant="flat"
            type="text"
            label="Nombre y Apellido"
            autoComplete="off"
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            {...register("name", {
              required: {
                value: true,
                message: "El nombre y apellido es requerido",
              },
              minLength: {
                value: 6,
                message:
                  "El nombre y apellido debe tener al menos 6 caracteres",
              },
            })}
          />
        )}

        <Input
          id="username"
          size="sm"
          variant="flat"
          type="text"
          label="Usuario"
          autoComplete="off"
          errorMessage={errors.username?.message}
          isInvalid={!!errors.username}
          {...register("username", {
            required: {
              value: true,
              message: "El usuario es requerido",
            },
            minLength: {
              value: 6,
              message: "El usuario debe tener al menos 6 caracteres",
            },
            maxLength: {
              value: 16,
              message: "El usuario debe tener como máximo 16 caracteres",
            },
          })}
        />
        <Input
          id="password"
          size="sm"
          variant="flat"
          type="password"
          label="Contraseña"
          autoComplete="off"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
        />
        <Button
          isLoading={authenticating}
          type="submit"
          className="text-white bg-purple-bold"
        >
          Ingresar
        </Button>
        <span
          onClick={logUp ? () => setLogUp(false) : () => setLogUp(true)}
          className="text-sm text-purple-regular font-medium underline"
        >
          {logUp
            ? "¿Ya tenés una cuenta? Iniciá sesión."
            : "¿No tenés cuenta? Registrate."}
        </span>
      </form>
    </Screen>
  )
}
