import React from "react";
// import {  Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AddMoeny from "../Support/AddMoeny";
import Creaditcard from "../Home/Creaditcard";
import CreaditCard_Reports from "../CC_bill/CreaditCard_Reports";
import Login from "../Login/Login";
import Money_transfer1 from "../Services/Money_transfer1";
import MoneyTransfer1BeneficiaryList from "../Services/MoneyTransfer1BeneficiaryList";
import LastTransaction from "../last_transaction/LastTransaction";
import Layout from "../Layout/Layout";
import Transcation_Details_Reports from "../Report/Transcation_Details_Reports";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Money_transfer2 from "../Services/Money_transfer2";
import Money_Transfer3 from "../Services/Money_Transfer3";
import Money_Transfer4 from "../Services/Money_Transfer4";
import Add_money_ccbill from "../CC_bill/Add_money_ccbill";
import CC_Credit_card from "../CC_bill/CC_Credit_card";
import Change_Password from "../Account/Change_Password";
import Change_tpi from "../Account/Change_tpi";
import UserProfile from "../Account/UserProfile";
import Login_History from "../Account/Login_History";
import Tranasction_list from "../CMS/Tranasction_list";
import Booking from "../../Booking/Booking";
import Recharge from "../../Recharge/Recharge";

const RoutePage = () => {
  return (
   

      <Routes>
        <Route path="/" element={<LastTransaction />} />
        {/* <Route path="/Layout" element={<Layout />} /> */}
        <Route path="/AddMoeny" element={<AddMoeny />} />
        <Route path="/Creaditcard/:amount" element={<Creaditcard />} />
        <Route path="/CreaditCard_Reports" element={<CreaditCard_Reports />} />
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/Money_transfer1" element={<Money_transfer1 />} />
        <Route path="/MoneyTransfer1BeneficiaryList" element={<MoneyTransfer1BeneficiaryList />} />
        <Route path="/LastTransaction" element={<LastTransaction />} />
        <Route path="/Transcation_Details_Reports" element={<Transcation_Details_Reports />} />
        <Route path="/Money_transfer2" element={<Money_transfer2 />} />
        <Route path="/Money_Transfer3" element={<Money_Transfer3 />} />
        <Route path="/Money_Transfer4" element={<Money_Transfer4 />} />
        <Route path="/Add_money_ccbill" element={<Add_money_ccbill />} />
        <Route path="/CC_Credit_card/:amount" element={<CC_Credit_card />} />
        <Route path="/Change_Password" element={<Change_Password />} />
        <Route path="/Change_tpi" element={<Change_tpi />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Login_History" element={<Login_History />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Recharge" element={<Recharge />} />
        <Route path="/Tranasction_list" element={<Tranasction_list />} />
      </Routes>
      

  );
};

export default RoutePage;
