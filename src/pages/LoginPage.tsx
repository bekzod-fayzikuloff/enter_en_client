import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import { AuthContext } from '../context/AuthContext';
import {useContext} from "react";

interface ILoginFormInput {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<ILoginFormInput>();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { loginUser } = useContext(AuthContext);
  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    loginUser(
      data.username,
      data.password,
      () => {
        navigate('/');
      },
      () => {
        alert("This user no exist")
      }
    );
  }

  return (
    <div className={"auth__form"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Username..."} {...register("username")} /> <br/>

        <input type={"password"} placeholder={"Password..."} {...register("password")} /> <br/>

        <input type="submit"/>
      </form>
    </div>
  );
}

export const LoginPage = () => {
  return (
    <LoginForm/>
  )
}