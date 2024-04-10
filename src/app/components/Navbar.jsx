"use client";
import React, { useState, useEffect } from "react";
import netflix from "../images/netflix.svg";
import userImage from "../images/Netflix-avatar.png";
import Image from "next/image";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar-container ${
        isScrolled ? "bg-black bg-opacity-85" : "bg-transparent"
      } w-full h-16 flex justify-between fixed z-10 transition-bg duration-500 top-0`}
    >
      <Image
        className="w-36 p-3 fixed left-2"
        src={netflix}
        alt="netflix logo"
      />
      <Image
        className="w-16 p-3 fixed right-2"
        src={userImage}
        alt="netflix logo"
      />
    </div>
  );
}

export default Navbar;
