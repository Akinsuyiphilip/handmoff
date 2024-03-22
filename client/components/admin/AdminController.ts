import { serverUrl } from "@/config/server.config";

export const GetRooms = async () => {
  try {
    const res = await fetch(`${serverUrl}/rooms/`);
    const data = await res.json();
    return res.ok ? { success: true, ...data } : { success: false, ...data };
  } catch (error) {
    return {
      success: false,
      message: "An error occured. Try again"
    };
  }
};
export const GetARoom = async (roomId: string) => {
  try {
    const res = await fetch(`${serverUrl}/rooms/getroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ roomId })
    });
    const data = await res.json();
    console.log(data);
    return res.ok ? { success: true, ...data } : { success: false, ...data };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured. Try again"
    };
  }
};
