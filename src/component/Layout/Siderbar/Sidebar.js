import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import { RiGitPullRequestFill } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import { IoReceiptOutline } from "react-icons/io5";
import { LuClipboardSignature } from "react-icons/lu";
import { MdPersonalInjury, MdOutlineTask } from "react-icons/md";
import { BsClipboardData, BsFillPersonCheckFill, BsCartCheck } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaUserTag, FaUserPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoOrganization } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";





import SidebarMenu from "./SidebarMenu";
import './Sidebar.css';

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
    roles: ["Admin", "StoreKeeper","SuperAdmin"]
    
  },
  {
    path: "/requests",
    name: "Requests",
    icon: <RiGitPullRequestFill />,
    roles: ["StoreKeeper"]
  },
  {
    path: "/demand",
    name: "Demand",
    icon: <BiPurchaseTag />,
    roles: ["StoreKeeper"]
  },
  {
    path: "/viewDemand",
    name: "View Demand",
    icon: <IoReceiptOutline />,
    roles: ["StoreKeeper"]
  },
  {
    name: "Role",
    icon: <FaUserShield />,
    roles: ["Admin"],
    subRoutes: [
      {
        path: "/role",
        name: "Role",
        icon: <FaUser />,
        roles: ["Admin"]
      },
      {
        path: "/roletaskedit",
        name: "Role Task Edit",
        icon: <FaLock />,
        roles: ["Admin"]
      }
    ]
  },
  {
    name: "User",
    icon: <FaUserCircle />,
    roles: ["Admin"],
    subRoutes: [
      {
        path: "/registrationApproval",
        name: "User Approval",
        icon: <FaUserTag />,
        roles: ["Admin"]
      },
      {
        path: "/userStatus",
        name: "User Status",
        icon: <BsFillPersonCheckFill />,
        roles: ["Admin"]
      },
      {
        path: "/viewuser",
        name: "View User",
        icon: <FaUserPen />,
        roles: ["Admin"]
      }
    ]
  },
  
  // {
  //   path: "/addtask",
  //   name: "Add Task",
  //   icon: <MdOutlineTask />,
  //   roles: ["Admin"]
  // },
  
  // {
  //   path: "/registrationApproval",
  //   name: "User Approval",
  //   icon: <FaUserTag />,
  //   roles: ["Admin"]
  // },
  // {
  //   path: "/userStatus",
  //   name: "User Status",
  //   icon: <FaUserPen />,
  //   roles: ["Admin"]
  // },
  {
    name: "product",
    icon: <TbBrandProducthunt />,
    roles: ["StoreKeeper"],
    subRoutes: [
      {
        path: "/products",
        name: "Products",
        icon: <FaUser />,
        roles: ["StoreKeeper"]
      },
      {
        path: "/producttype",
        name: "Product Type",
        icon: <FaLock />,
        roles: ["StoreKeeper"]
      },
      {
        path: "/availableproduct",
        name: "Available Product",
        icon: <BsClipboardData />,
        roles: ["StoreKeeper"]
      }
    ]
  },
  {
    path: "/task",
    name: "Task",
    icon: <MdOutlineTask />,
    roles: ["Admin"]
  },
  {
    name: "Signature Record",
    path: "/viewSignatureRecord",
    icon: <LuClipboardSignature />,
    roles: ["StoreKeeper"],
    // subRoutes: [
    //   {
    //     path: "/addSignatureRecord",
    //     name: "Add Record",
    //     icon: <MdPersonalInjury />,
    //     roles: ["StoreKeeper"]
    //   },
    //   {
    //     path: "/viewSignatureRecord",
    //     name: "View Record",
    //     icon: <BsClipboardData />,
    //     roles: ["StoreKeeper"]
    //   }
    // ]
  },
  // {
  //   path: "/viewuser",
  //   name: "View User",
  //   icon: <FaLock />,
  //   roles: ["Admin"]
  // },
  {
    path: "/company",
    name: "Company",
    icon: <GoOrganization />,
    roles: ["StoreKeeper"]
  },
  {
    path: "/designation",
    name: "Designation",
    icon: <BsCartCheck />,
    roles: ["Admin"]
  }
];

const SideBar = ({ children, role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      marginTop:'5px',
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

  const filteredRoutes = role === "SuperAdmin" ? routes : routes.filter(route => route.roles.includes(role));

  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "17%" : "4%",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="sidebar"
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

        <section className="routes">
          {filteredRoutes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  key={index}
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

      <main style={{ height: "100vh", overflowY: "auto" }}>{children}</main>
    </div>
  );
};

export default SideBar;
