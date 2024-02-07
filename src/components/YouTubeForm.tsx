import { useForm } from 'react-hook-form';


export const YouTubeForm = () => {
  
  return (
    <div>
        <form>
            <label htmlFor= "username">UserName</label>
            <input type="text" name="username" id="username" />
            <label htmlFor= "email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor= "channel">channel</label>
            <input type="text" name="channel" id="channel" />

            <button type="submit">Submit</button>

        </form>
    </div>
  )
}
