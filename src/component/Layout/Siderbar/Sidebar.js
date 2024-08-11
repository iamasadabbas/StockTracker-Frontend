import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import { RiGitPullRequestFill } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import { IoReceiptOutline } from "react-icons/io5";
import { LuClipboardSignature } from "react-icons/lu";
import { MdOutlineTask } from "react-icons/md";
import { BsClipboardData, BsFillPersonCheckFill, BsCartCheck } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaUserTag, FaUserPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoOrganization } from "react-icons/go";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
import './Sidebar.css';

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
    taskName: "View Dashboard",
    alwaysVisible: true,
  },
  {
    path: "/requests",
    name: "Requests",
    icon: <RiGitPullRequestFill />,
    taskName: "View Product Request",
  },
  {
    name: "Demand",
    icon: <IoReceiptOutline />,
    taskName: "View Product Demand",
    subRoutes: [
      {
        path: "/demand",
        name: "Add Demand",
        icon: <BiPurchaseTag />,
        taskName: "Add Product Demand",
      },
      {
        path: "/viewDemand",
        name: "View Demand",
        icon: <IoReceiptOutline />,
        taskName: "View Product Demand",
      },
    ]
  },
  {
    name: "Role",
    icon: <FaUserShield />,
    taskName: "View User Role",
    subRoutes: [
      {
        path: "/role",
        name: "Role",
        icon: <FaUser />,
        taskName: "View User Role",
      },
      {
        path: "/roletaskedit",
        name: "Role Task Edit",
        icon: <FaLock />,
        taskName: "Role Task Edit",
      },
    ]
  },
  {
    name: "User",
    icon: <FaUserCircle />,
    taskName: "View User",
    subRoutes: [
      {
        path: "/registrationApproval",
        name: "User Approval",
        icon: <FaUserTag />,
        taskName: "User Approval",
      },
      {
        path: "/userStatus",
        name: "User Status",
        icon: <BsFillPersonCheckFill />,
        taskName: "User Status",
      },
      {
        path: "/viewuser",
        name: "View User",
        icon: <FaUserPen />,
        taskName: "View User",
      }
    ]
  },
  {
    name: "Product",
    icon: <TbBrandProducthunt />,
    taskName: "View Product",
    subRoutes: [
      {
        path: "/products",
        name: "Products",
        icon: <FaUser />,
        taskName: "View Product",
      },
      {
        path: "/producttype",
        name: "Product Type",
        icon: <FaLock />,
        taskName: "View Product Type",
      },
      {
        path: "/availableproduct",
        name: "Available Product",
        icon: <BsClipboardData />,
        taskName: "View Product",
      }
    ]
  },
  {
    path: "/task",
    name: "Task",
    icon: <MdOutlineTask />,
    taskName: "View Role Task",
  },
  {
    path: "/viewSignatureRecord",
    name: "Signature Record",
    icon: <LuClipboardSignature />,
    taskName: "View Signature Record",
  },
  {
    path: "/company",
    name: "Company",
    icon: <GoOrganization />,
    taskName: "View Product Company",
  },
  {
    path: "/designation",
    name: "Designation",
    icon: <BsCartCheck />,
    taskName: "View User Designation",
  }
];

const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roleTask } = useSelector((state) => state.userData);
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
      marginTop: '5px',
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

  const filteredRoutes = routes.filter(route => {
    const alwaysVisible = route?.alwaysVisible ?? false;

    // Check if the route itself or any of its subRoutes should be visible
    const hasVisibleSubRoute = route.subRoutes?.some(subRoute => 
      roleTask.some(task => task?.task_id?.name === subRoute.taskName && task.status === true)
    );

    const isVisible = alwaysVisible || hasVisibleSubRoute || roleTask.some(task => task?.task_id?.name === route.taskName && task.status === true);

    if (isVisible && route.subRoutes) {
      route.subRoutes = route.subRoutes.filter(subRoute =>
        roleTask.some(task => task?.task_id?.name === subRoute.taskName && task.status === true)
      );
    }

    return isVisible;
  });

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
            if (route.subRoutes?.length) {
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