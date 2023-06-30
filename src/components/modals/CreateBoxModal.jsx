import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBox } from "../../api/boxes";
import ToggleButton from "../ToggleButton";

function CreateBoxModal() {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const createBoxMutation = useMutation({
    mutationFn: createBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userboxes"] });
      closeModal();
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    createBoxMutation.mutate({
      userId: user.id,
      userName: user.fullName,
      boxTitle: data.boxTitle,
      boxDescription: data.boxDescription,
      boxOpen: data.boxOpen,
      boxPublic: data.boxPublic,
    });
  };
  function closeModal() {
    reset();
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create Box
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a new box
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <label htmlFor="boxTitle">Box Title</label>
                      <input
                        type="text"
                        id="boxTitle"
                        {...register("boxTitle", {
                          required: "You can't sumbit an empty field!",
                          minLength: {
                            value: 5,
                            message:
                              "Box title should atleast have 5 characters!",
                          },
                          maxLength: {
                            value: 500,
                            message:
                              "Box title have a limit of 500 characters!",
                          },
                        })}
                      />
                      <p>{errors.boxTitle?.message}</p>

                      <label htmlFor="boxDescription">Box Description</label>
                      <input
                        type="text"
                        id="boxDescription"
                        {...register("boxDescription", {
                          required: "You can't sumbit an empty field!",
                          minLength: {
                            value: 10,
                            message:
                              "Box description should atleast have 10 characters!",
                          },
                          maxLength: {
                            value: 800,
                            message:
                              "Box description have a limit of 800 characters!",
                          },
                        })}
                      />
                      <p>{errors.boxDescription?.message}</p>

                      <div>
                        <span>Box Open</span>
                        <Controller
                          control={control}
                          name="boxOpen"
                          defaultValue={false}
                          render={({ field: { onChange, value } }) => (
                            <ToggleButton checked={value} onChange={onChange} />
                          )}
                        />
                      </div>
                      <div>
                        <span>Box Public</span>
                        <Controller
                          control={control}
                          name="boxPublic"
                          defaultValue={false}
                          render={({ field: { onChange, value } }) => (
                            <ToggleButton checked={value} onChange={onChange} />
                          )}
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CreateBoxModal;
