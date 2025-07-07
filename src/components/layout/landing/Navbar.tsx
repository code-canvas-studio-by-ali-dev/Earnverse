import React from "react";
import { RiMenu2Line } from "react-icons/ri";
import { LiaDollarSignSolid } from "react-icons/lia";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-xl">
            <RiMenu2Line />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
              <ul className="p-2">
                <li>
                  <a>Porfolio</a>
                </li>
                <li>
                  <a>Website</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Services</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <LiaDollarSignSolid
            className="text-2xl -mx-1.5"
            style={{ strokeWidth: 1 }}
          />{" "}
          EarnVerse
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>About</a>
          </li>
          <li>
            <details>
              <summary>Contact</summary>
              <ul className="p-2">
                <li>
                  <a>Portfolio</a>
                </li>
                <li>
                  <a>Website</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Services</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <Link href="/login" className="btn btn-outline btn-xs">
          Login
        </Link>
        <Link href="/get-started" className="btn btn-primary btn-xs">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
