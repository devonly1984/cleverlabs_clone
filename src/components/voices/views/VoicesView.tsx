"use client";

import VoicesContent from "../layout/VoicesContent";
import VoicesToolbar from "../layout/VoicesToolbar";

const VoicesView = () => {
  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoicesToolbar />
      <VoicesContent />
    </div>
  );
};
export default VoicesView;
