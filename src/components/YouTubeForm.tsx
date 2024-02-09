import { useEffect } from "react";
import { useForm,useFieldArray, FieldErrors} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { isDisabled } from "@testing-library/user-event/dist/utils";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social:{
    twitter: string,
      facebook: string
  }
  phoneNumbers: string[];
  phNumbers: {
    number: string
  }[]
age:number
dob:Date
};

export const YouTubeForm = () => {
  const form = useForm<FormValues> (
    {
      defaultValues: {
        username: "",
        email: "",
        channel: "",
        social: {
          twitter: "",
          facebook: ""
        },
        phoneNumbers: ["",""],
        phNumbers: [{number: ""}],
        age:0,
        dob:new Date(),
        
      },
      mode:"all"
    }
  );
  const { register, control, handleSubmit, formState,watch,getValues,setValue,reset} = form;
  const { errors,isDirty,isValid,isSubmitSuccessful} = formState;
  const {fields,append,remove} = useFieldArray({
    control,
    name: "phNumbers"
  })
  const onSubmit = (data: FormValues) => {
    console.log("form Submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };
  

  const handleGetValues = () => {
    console.log("Get values",getValues())
  }
  const handleSetValue = () => {
    console.log("set values",setValue("username","",{shouldDirty:true,shouldTouch:true,shouldValidate:true}))
  }

  useEffect (() => {
    if (isSubmitSuccessful) {
      reset();
    }
  },[isSubmitSuccessful,reset]);


  // useEffect(()=> {
  //   const subscription = watch((value) => {
  //     console.log(value)
  //   });
  //     return 
  //     subscription.unsubscribe();
  // },[watch]);

  
  // const watchForm = watch();

  return (
    <div>
      {/* <h2>wathedValue:{JSON.stringify(watchForm)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "user name required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "invalid email",
              },
              validate: {
                notValid:(fieldValue) => {
                return ( fieldValue!== "admin@gmail.com" || "Enter different Email"
            );
            },
            notBlackListed: (fieldValue) => {
              return ( 
              !fieldValue.endsWith("baddomain.com") || "This domain not support"
              )
            },
            emailAvailable: async (fieldValue) => {
              const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
              const data = await response.json();
              return data.length === 0 || "Email already exist";
          }
        }
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: { value: true, message: "channel name required" },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            id="channel"
            {...register("social.twitter")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone-number">primary-phone-number</label>
          <input
            type="text"
            id="primary"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone-number">secondary-phone-number</label>
          <input
            type="text"
            id="secondary"
            {...register("phoneNumbers.1")}
          />
        </div>
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field,index)=>{
              return (
                <div key={field.id} className="form-control">
                  <label>phone number</label>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
          <button type ="button" onClick={()=>remove(index)}>Remove</button>

                </div>
              )
            })}
          
          </div>
        </div>

        <button onClick={()=>append({number:""})}>Add</button>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "age is required" },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">date of Birth</label>
          <input
            type="Date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "dob is required" },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button type="button" onClick={handleGetValues}>Get values</button>
        <button type="button" onClick={handleSetValue}>Set values</button>
        <button type="button" onClick={()=>reset()}>Reset</button>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
