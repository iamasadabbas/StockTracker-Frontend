import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiPurchaseTag } from "react-icons/bi";
import { RiGitPullRequestFill } from "react-icons/ri";
import { IoReceiptOutline } from "react-icons/io5";
import { LuClipboardSignature } from "react-icons/lu";
import { MdPersonalInjury } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineTask } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";



import SidebarMenu from "./SidebarMenu.js";

import './Sidebar.css'
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/requests",
    name: "Requests",
    icon: <RiGitPullRequestFill  />,
  },
  {
    path: "/demand",
    name: "Demand",
    icon: <BiPurchaseTag />,
  },
  {
    path: "/viewDemand",
    name: "View Demand",
    icon: <IoReceiptOutline />,
  },

  {
    path: "/Role",
    name: "Role",
    icon: <BsFillPersonCheckFill />,
    subRoutes: [
      {
        path: "/addrole",
        name: "Add Role",
        icon: <FaUser />,
      },
      {
        path: "/roletaskedit",
        name: "Role Task Edit",
        icon: <FaLock />,
      }
    ],
  },

  {
    path: "/addtask",
    name: "Add Task",
    icon: <MdOutlineTask />,
  },
  

  {
    name: "product",
    icon: <TbBrandProducthunt />,
    subRoutes: [
      {
        path: "/addproduct",
        name: "Add Product ",
        icon: <FaUser />,
      },
      {
        path: "/producttype",
        name: "product type",
        icon: <FaLock />,
      },
    ],
  },
  {
    name: "Signature",
    icon: <LuClipboardSignature />,
    subRoutes: [
      {
        path: "/addSignatureRecord",
        name: "Add Record",
        icon: <MdPersonalInjury />,
      },
      {
        path: "/viewSignatureRecord",
        name: "View Record",
        icon: <BsClipboardData />,
      },
    ],
  },
  
      // {
      //   path: "/adduser",
      //   name: "Add User",
      //   icon: <FaUser />,
      // },
      {
        path: "/viewuser",
        name: "view User",
        icon: <FaLock />,
      },
  {
    path: "/adddesignation",
    name: "add designation",
    icon: <BsCartCheck />,
  },
  
  {
    path: "/login",
    name: "login",
    icon: <AiFillHeart />,
  },
  
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "15%" : "3.5%",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  StockTracker
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main style={{height:"100vh", overflowY: "auto"}}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;