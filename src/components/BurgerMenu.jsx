import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

function BurgerMenu() {
  return (
    <div className="z-10 w-56  text-right sm:hidden">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="focus-visible:ring-white justify-center rounded-sm  p-0.5 text-xl text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75">
            <HiOutlineMenuAlt3 />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className=" ring-black absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md bg-white-100 shadow-lg ring-1 ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/public"}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <h4>Public Boxes</h4>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/features"}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <h4>Features</h4>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/contact"}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <h4>Contact</h4>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default BurgerMenu;
