import roomModel from "../models/rooms.model";

export const GetARoomById = async (
  req: { body: { roomId: string } },
  res: any
) => {
  try {
    const { roomId } = req.body;
    const selectedRoom = await roomModel.findById(roomId);
    selectedRoom
      ? res.status(200).json({ selectedRoom })
      : res.status(404).json({ message: "Room not found" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
export const GetRooms = async (req: any, res: any) => {
  try {
    const roomDetails = await roomModel.find();
    roomDetails
      ? res.status(200).json({ roomDetails })
      : res
          .status(501)
          .json({ message: "An error occured, please try again " });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
export const AddRoom = async (
  req: {
    body: {
      roomName: string;
      price: number;
      description: string;
      features: [string];
      image: string;
    };
  },
  res: any
) => {
  try {
    const { roomName, price, description, features, image } = req.body;
    const checkRoom = await roomModel.findOne({ roomName });
    console.log(checkRoom);
    if (!checkRoom) {
      const createRoom = await roomModel.create({
        roomName,
        price,
        description,
        features,
        image
      });
      createRoom.save();
      createRoom
        ? res.status(200).json({ message: "Room Created Successfully" })
        : res
            .status(502)
            .json({ message: "An error occured please try again." });
    } else {
      res
        .status(403)
        .json({ message: "A room has already been created with this name" });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
