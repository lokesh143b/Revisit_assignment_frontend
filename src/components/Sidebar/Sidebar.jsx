import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingCart,
  MdInventory,
  MdCategory,
  MdPeople,
  MdAssessment,
  MdCardGiftcard,
  MdEmail,
  MdHelpOutline,
  MdUpdate,
  MdPerson,
  MdSettings,
  MdMenu,
  MdClose, // import the close icon
} from "react-icons/md";

import "./Sidebar.css";

const options = [
  { id: 1, name: "Dashboard", icon: <MdDashboard /> },
  { id: 2, name: "Orders", icon: <MdShoppingCart /> },
  { id: 3, name: "Products", icon: <MdInventory /> },
  { id: 4, name: "Categories", icon: <MdCategory /> },
  { id: 5, name: "Customers", icon: <MdPeople /> },
  { id: 6, name: "Reports", icon: <MdAssessment /> },
  { id: 7, name: "Coupons", icon: <MdCardGiftcard /> },
  { id: 8, name: "Inbox", icon: <MdEmail /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MdClose /> : <MdMenu />}
      </button>

      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        {/* Top Block */}
        <ul>
          {options.map((eachOption) => (
            <li
              onClick={() => {
                navigate(`/${eachOption.name.toLowerCase().replace(/\s+/g, "-")}`);
                setIsOpen(false);
              }}
              key={eachOption.id}
            >
              {eachOption.icon}
              <p>{eachOption.name}</p>
            </li>
          ))}
        </ul>

        {/* Center Block */}
        <h4>Other Information</h4>
        <ul>
          <li>
            <MdHelpOutline />
            <p>Knowledge Base</p>
          </li>
          <li>
            <MdUpdate />
            <p>Product Updates</p>
          </li>
        </ul>

        {/* Bottom Block */}
        <h4>Settings</h4>
        <ul>
          <li>
            <MdPerson />
            <p>Personal Settings</p>
          </li>
          <li>
            <MdSettings />
            <p>Global Settings</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
