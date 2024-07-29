import parcelModel from "../models/parcelModel.js";

// Add Parcel
const addParcel = async (req, res) => {
    try {
        const newParcel = new parcelModel(req.body);
        await newParcel.save();
        res.status(200).json({ message: "New Parcel Created", newParcel });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Get All Parcels
const getAllParcels = async (req, res) => {
    try {
        const allParcels = await parcelModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "All parcel details fetched successfully", allParcels });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Update Parcel
const updateParcel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedParcel = await parcelModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedParcel) {
            return res.status(404).json({ message: "Parcel Not Found" });
        }
        res.status(200).json({ message: "Parcel details updated successfully", updatedParcel });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Get One Parcel
const getOneParcel = async (req, res) => {
    try {
        const { id } = req.params;
        const parcel = await parcelModel.findById(id);

        if (!parcel) {
            return res.status(404).json({ message: "Parcel Not Found" });
        }
        res.status(200).json({ message: "Parcel details fetched successfully", parcel });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Delete Parcel
const deleteParcel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedParcel = await parcelModel.findByIdAndDelete(id);

        if (!deletedParcel) {
            return res.status(404).json({ message: "Parcel Not Found" });
        }
        res.status(200).json({ message: "Parcel deleted successfully", deletedParcel });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Get User's Parcels
const userParcel = async (req, res) => {
    try {
        const { senderEmail } = req.query;

        if (!senderEmail) {
            return res.status(400).json({ message: "senderEmail query parameter is required" });
        }

        const userParcels = await parcelModel.find({ senderEmail });

        if (!userParcels.length) {
            return res.status(404).json({ message: "No parcels found for this user" });
        }

        res.status(200).json({ message: "Details fetched successfully", userParcels });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};



export default {
    addParcel,
    getAllParcels,
    updateParcel,
    getOneParcel,
    deleteParcel,
    userParcel
};
