import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBox } from "../../api/boxes";

function DeleteBoxModal({ userId, boxId }) {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteBoxMutation = useMutation({
    mutationFn: () => deleteBox(userId, boxId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userboxes"] });
      closeModal();
    },
  });

  const onSubmit = () => {
    deleteBoxMutation.mutate({
      userId: userId,
      boxId: boxId,
    });
  };

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      <div className="flex">
        <button
          type="button"
          onClick={openModal}
          className="bg-black text-white focus-visible:ring-white rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
        >
          Delete
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-black fixed inset-0 bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-lg font-medium leading-6"
                  >
                    Are you sure you want to delete this box?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm">
                      This process will delete the box details permanantly. Once
                      deleted the details cannot be recovered.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="border-transparent bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500 inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={onSubmit}
                    >
                      Delete Box
                    </button>
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

export default DeleteBoxModal;
