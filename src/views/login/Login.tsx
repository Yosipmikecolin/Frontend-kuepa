import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./Login.module.css";
import { useNavigate } from "react-router";
import { InputsLogin } from "../../types";

const schema = yup
  .object({
    user: yup.string().required("Usuario es requerido"),
    password: yup.string().required("Contraseña es requerida"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputsLogin> = (data) => {
    console.log(data);
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  return (
    <section className={classes["container-login"]}>
      <div className={classes["circle-1"]} />
      <div className={classes["circle-2"]} />
      <form className={classes["form-login"]} onSubmit={handleSubmit(onSubmit)}>
        <h1>Iniciar sesión</h1>
        <div className={classes["conatiner-input"]}>
          <label>Usuario</label>
          <input className={classes.input} {...register("user")} />
          <p className={classes["text-danger"]}>{errors.user?.message}</p>
        </div>

        <div className={classes["conatiner-input"]}>
          <label>Contraseña</label>
          <input className={classes.input} {...register("password")} />
          <p className={classes["text-danger"]}>{errors.password?.message}</p>
        </div>

        <button className={classes["button-form"]} type="submit">
          Iniciar sesión
        </button>
        <p className={classes.text}>
          ¿No tienes cuenta?{" "}
          <strong onClick={navigateRegister}>Crear cuenta</strong>
        </p>
      </form>
    </section>
  );
};

export default Login;
