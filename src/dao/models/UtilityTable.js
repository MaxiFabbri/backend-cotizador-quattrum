import mongoose from "mongoose";

const collection = "UtilityTable";

const schema = new mongoose.Schema(
  {
    tableName: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    rows: [
      {
        upTo: { type: Number, required: true },
        productUtility: { type: Number, required: true },
        productMinimum: { type: Number, required: true },
        kitUtility: { type: Number, required: true },
        kitMinimum: { type: Number, required: true },
        id: { type: String, required: true}
      },
    ],
  },
  { timestamps: true }
);

const UtilityTableModel = mongoose.model(collection, schema);

export default UtilityTableModel;
