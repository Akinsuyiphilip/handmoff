import SingleRoomDisplay from "@/components/admin/SingleRoomDisplay";
import React from "react";

function page({ params }: any) {
  return (
    <div>
      <SingleRoomDisplay roomId={params.id} />
    </div>
  );
}

export default page;
