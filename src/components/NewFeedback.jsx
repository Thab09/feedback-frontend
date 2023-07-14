import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import Checkbox from "../components/Checkbox";
import { createGuestFeedback, createUserFeedback } from "../api/feedbacks";

function NewFeedback({ boxId }) {
  const { user } = useUser();

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createGuestFeedbackMutation = useMutation({
    mutationFn: createGuestFeedback,
    onSuccess: () => {
      reset();
    },
  });
  const createUserFeedbackMutation = useMutation({
    mutationFn: createUserFeedback,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(boxId);
    checked
      ? createUserFeedbackMutation.mutate({
          boxId: boxId,
          userId: user.id,
          userName: user.fullName,
          feedbackDescription: data.feedbackDescription,
        })
      : createGuestFeedbackMutation.mutate({
          boxId: boxId,
          userName: data.userName,
          feedbackDescription: data.feedbackDescription,
        });
  };
  return (
    <div
      className={`${
        checked ? "bg-white-100 text-black-500" : "bg-black-500 text-white-200"
      }  rounded-sm p-2`}
    >
      <div className="flex justify-between text-xs">
        <label htmlFor="feedback">
          Commenting as {checked ? user?.fullName : "Guest"}
        </label>
        <div>
          <Checkbox
            label={checked ? "Guest" : user?.fullName}
            value={checked}
            onChange={handleChange}
          />
        </div>
      </div>
      <p>TWO DIFFERENT FORMS. ONE FOR USER. ONE FOR GUEST.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <input
            type="text"
            id="userName"
            placeholder="Your Name"
            className={`${checked ? "hidden" : "flex"}  mb-1 w-full p-1`}
            {...register("userName", {
              required: "You can't sumbit an empty field!",
              minLength: {
                value: 3,
                message: "Box title should atleast have 5 characters!",
              },
              maxLength: {
                value: 255,
                message: "Box title have a limit of 255 characters!",
              },
            })}
          />
          <textarea
            className="h-32 w-full rounded-sm border border-solid p-4 text-black-700"
            id="feedbackDescription"
            {...register("feedbackDescription", {
              required: "You can't sumbit an empty field!",
              minLength: {
                value: 10,
                message: "Box title should atleast have 10 characters!",
              },
              maxLength: {
                value: 500,
                message: "Box title have a limit of 500 characters!",
              },
            })}
          />
        </div>
        <p>{errors.feedbackDescription?.message}</p>

        <button
          type="submit"
          className="border-transparent bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500 inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewFeedback;
