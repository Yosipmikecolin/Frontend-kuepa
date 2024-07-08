import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./Login.module.css";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Correo electrónico no válido")
      .required("Correo electrónico es requerido"),
    password: yup.string().required("Contraseña es requerida"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <section className={classes["container-login"]}>
      <div className={classes["circle-1"]} />
      <div className={classes["circle-2"]} />
      <form className={classes["form-login"]} onSubmit={handleSubmit(onSubmit)}>
        <h1>Iniciar sesión</h1>
        <div className={classes["conatiner-input"]}>
          <label>Correo electrónico</label>
          <input className={classes.input} {...register("email")}/>
          <p className={classes['text-danger']}>{errors.email?.message}</p>
        </div>

        <div className={classes["conatiner-input"]}>
          <label>Contraseña</label>
          <input className={classes.input} {...register("password")} />
          <p className={classes['text-danger']}>{errors.password?.message}</p>
        </div>

        <button className={classes["button-form"]} type="submit">Iniciar sesión</button>
        <p className={classes.text}>
          ¿No tienes cuenta?{" "}
          <strong className="text-[#3b2374]">Crear cuenta</strong>
        </p>
      </form>
    </section>
  );
};

export default Login;
