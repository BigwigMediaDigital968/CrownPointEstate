"use client";
import React from "react";
import EnquiryForm from "./EnquiryForm";

export default function SidebarSimpleForm() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <p className="text-sm text-gray-500 mb-4">
        Fill the form & verify via OTP
      </p>

      <EnquiryForm variant="default" btnText="Send OTP" />
    </div>
  );
}
