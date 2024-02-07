import { useForm } from 'react-hook-form';
import {DevTool} from '@hookform/devtools'

  
type FormValues = {
  username: string;
  email: string;
  channel: string;
}

export const YouTubeForm = () => {
  const form = useForm <FormValues>();
  const {register,control,handleSubmit} = form;
  
  const onSubmit = (data:FormValues) => {
    console.log("form Submitted",data);
  }


  return (
    <div> 
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor= "username">Username</label>
            <input type="text"  id="username"{...register("username")} />
            <label htmlFor= "email">Email</label>
            <input type="email" id="email" {...register("email")} />
            <label htmlFor= "channel">channel</label>
            <input type="text"  id="channel" {...register("channel")}/>

            <button type="submit">Submit</button>

        </form>
        <DevTool control={control} />
    </div>
  )
}
