import { useForm } from 'react-hook-form';
import {DevTool} from '@hookform/devtools'

  
type FormValues = {
  username: string;
  email: string;
  channel: string;
}

export const YouTubeForm = () => {
  const form = useForm <FormValues>();
  const {register,control,handleSubmit,formState} = form;
  const {errors} = formState;
  const onSubmit = (data:FormValues) => {
    console.log("form Submitted",data);
  }


  return (
    <div> 
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='form-control'>
            <label htmlFor= "username">Username</label>
            <input type="text"  id="username"{...register("username",{required:{value:true,message:"user name required"}})} />
            <p className='error'>{errors.username?.message}</p>
            </div>
          <div className='form-control'>
            <label htmlFor= "email">Email</label>
           <input type="email" id="email" {...register("email",{pattern:{value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message:"invalid email"}})} />
           <p className='error'>{errors.email?.message}</p>
           </div>

          <div className='form-control'>
            <label htmlFor= "channel">channel</label>
            <input type="text"  id="channel" {...register("channel",{required:{value:true,message:"channel name required"}})} />
            <p className='error'>{errors.channel?.message}</p>
            </div>


            <button type="submit">Submit</button>

        </form>
        <DevTool control={control} />
    </div>
  )
}
