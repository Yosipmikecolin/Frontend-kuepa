import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./Register.module.css";
import { useNavigate } from "react-router";
import { Select } from "../../components";
import { InputsRegister } from "../../types";
import { registerUser } from "../../api/fetchs/user";
import toast from "react-hot-toast";

const schema = yup
  .object({
    name: yup.string().required("Nombre es requerido"),
    user: yup.string().required("Usuario es requerido"),
    type: yup.string().required("Tipo es requerido"),
    password: yup.string().required("Contraseña es requerida"),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputsRegister> = async (data) => {
    try {
      await registerUser(data);
      reset();
      toast.success("Usuario registrado con éxito");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const navigateRegister = () => {
    navigate("/");
  };

  return (
    <section className={classes["container-register"]}>
      <div className={classes["circle-1"]} />
      <div className={classes["circle-2"]} />
      <form
        className={classes["form-register"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Registrar usuario</h1>

        <div className={classes["conatiner-input"]}>
          <label>Nombre</label>
          <input className={classes.input} {...register("name")} />
          <p className={classes["text-danger"]}>{errors.name?.message}</p>
        </div>

        <div className={classes["conatiner-input"]}>
          <label>Tipo de usuario</label>
          <Select onChange={setValue} />
          <p className={classes["text-danger"]}>
            {!watch("type") && errors.type?.message}
          </p>
        </div>

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
          Registrar
        </button>
        <p className={classes.text}>
          ¿Ya tienes cuenta?{" "}
          <strong onClick={navigateRegister}>Inicia sesión</strong>
        </p>
      </form>
    </section>
  );
};

export default Register;
