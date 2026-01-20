"use client";

import EnquiryForm from "./EnquiryForm";

export default function QuickEnquiry() {
  return (
    <div className="w-full max-w-md ml-auto mt-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Quick Enquiry</h3>
      
      <EnquiryForm variant="glass" btnText="Request Call Back" />
    </div>
  );
}
