import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../Screens/Signup";
import Login from "../Screens/Login";
import Dashboard from "../Screens/Entrepreneur/Dashboard";
import "../Screens/CSS/variableCss.css";
import Welcome from "../Components/welcome";
import Message from "../Screens/Entrepreneur/Message";
import Wallet from "../Screens/Entrepreneur/Wallet";
import Profile from "../Screens/Entrepreneur/Profile";
import NavbarEntrep from "../Components/navbarEntrep";
import Business from "../Screens/Entrepreneur/Business";
import Notification from "../Screens/Entrepreneur/Notification";
import NavbarInvestor from "../Components/investorNavbar";
import DashboardInvestor from "../Screens/Investor/Dashboard";
import Feeds from "../Screens/Investor/Feeds";
import Investment from "../Screens/Investor/Investment";
import MessageInvestor from "../Screens/Investor/Message";
import NotificationInvestor from "../Screens/Investor/Notification";
import ProfileInvestor from "../Screens/Investor/Profile";
import WalletInvestor from "../Screens/Investor/Wallet";
import ListOfBusiness from "../Components/listBusiness";
import Invest from "../Components/invest";
import Post from "../Components/post";
import ViewBusiness from "../Components/entrepBusiness";
import Payreturn from "../Components/payreturn";
import ChatContact from "../Components/ChatContact";
import Messages from "../Components/Messages";
import VerifyAccount from "../Components/VerifyAccount";
import VerifyAccountEntrep from "../Components/VerifyAccountEntrep";

import UnauthorizedAlert from "../Utils/UnauthorizedAlert";
import ViewInvestorInvt from "../Components/ViewInvestorInvt";
function Router(props) {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/error" element={<UnauthorizedAlert />} />

      <Route path="/entrepreneur" element={<NavbarEntrep />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="business" element={<Business />}>
          <Route index element={<Post />} />
          <Route path="view/:id" element={<ViewBusiness />} />
          <Route path="v/:id" element={<ViewInvestorInvt />} />
          <Route path="r/:id" element={<Payreturn />} />
        </Route>
        <Route path="wallet" element={<Wallet />} />
        <Route path="chat" element={<Message />}>
          <Route path="t/:id" element={<Messages />} />
        </Route>
        <Route path="profile" element={<Profile />}>
          <Route path="v/:id" element={<VerifyAccountEntrep />} />
        </Route>
        <Route path="notification" element={<Notification />} />
      </Route>

      <Route path="/investor" element={<NavbarInvestor />}>
        <Route path="dashboard" element={<DashboardInvestor />} />
        <Route path="feeds" element={<Feeds />}>
          <Route index element={<ListOfBusiness />} />
          <Route path="i/:business" element={<Invest />} />
        </Route>
        <Route path="investment" element={<Investment />} />
        <Route path="chat" element={<Message />}>
          <Route path="t/:id" element={<Messages />} />
        </Route>
        <Route path="notification" element={<NotificationInvestor />} />
        <Route path="profile" element={<ProfileInvestor />}>
          <Route path="p/:id" element={<VerifyAccount />} />
        </Route>
        <Route path="wallet" element={<WalletInvestor />} />
      </Route>
    </Routes>
  );
}

export default Router;
