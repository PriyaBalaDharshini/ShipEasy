import mongoose from "mongoose";

const parcelSchema = mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    weight: { type: Number, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
    feedback: { type: String },
    status: { type: Number, default: 0 }
}, {
    timestamps: true
});

const parcelModel = mongoose.model("Parcel", parcelSchema);
export default parcelModel;
