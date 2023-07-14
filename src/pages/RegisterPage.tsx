import {SubmitHandler, useForm} from "react-hook-form";
import {sendData} from "../utils";
import {registerUrl} from "../constants/endpoints";
import {useNavigate} from "react-router-dom";


interface IRegisterFormInput {
  username: string;
  password: string;
  password_confirm: string;
  email: string;
}


const RegisterForm = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<IRegisterFormInput>();
  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    const response = await sendData(registerUrl, data);
    if (response.ok) {
      navigate("/login")
    }
  }

  return (
    <div className={"auth__form"}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input placeholder={"Username..."} {...register("username")} /> <br/>

        <input placeholder={"Email..."} {...register("email")} /> <br/>

        <input placeholder={"Password..."} {...register("password")} /> <br/>

        <input placeholder={"Password Confirm..."} {...register("password_confirm")} /> <br/>

        <input type="submit"/>
      </form>
    </div>
  );
}


export const RegisterPage = () => {
  return (
    <RegisterForm/>
  )
}