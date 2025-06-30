import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../public/logo1.png";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
const Navbar = () => {
  const email = localStorage.getItem("email");
  const secureAxios = useSecureAxios();
    const reloadPage = () => {
    window.location.reload();
  };

  const { data: users } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const { data } = await secureAxios(`/user/${email}`);
      return data;
    },
  });
  console.log(users,"ujsdf") ;
   const logout = () => {
    localStorage.clear();
    reloadPage();
  };
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
      <li>
        <NavLink to="/add-event">Add Event</NavLink>
      </li>
      <li>
        <NavLink to="/my-events">MY Event</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <img className=" w-1/16 rounded-xl" src={logo}></img>
          <Link to="/" className="  font-bold px-1 text-xl">
            EventHub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {email ? (
            <>
              <div className="z-50 dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className=" flex justify-center items-center  mr-3 gap-3 m-1"
                >
                  <img
                    className=" w-12 h-12 rounded-full"
                    referrerPolicy="no-referrer"
                    src={users?.photourl}
                    alt=""
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link>
                      {users?.name
                        ? users?.name
                        : "No Name Available"}
                    </Link>
                  </li>
                  <p className=" mt-6 ml-6 text-red-700 font-medium">
                    <Link onClick={logout}>LogOut</Link>
                  </p>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn">
              Sign IN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
