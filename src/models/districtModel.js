import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    headerImage: {
        type: String,
        required: true
    },
    formationYear: {
        type: Number
    },
    area: {
        type: Number // in sq km
    },
    population: {
        type: Number
    },
    coordinates: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    majorRivers: [{
        type: String
    }],
    hills: [{
        type: String
    }],
    naturalSpots: [{
        type: String
    }],
    historyAndCulture: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'draft'],
        default: 'active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
        required: true
    }
}, {
    timestamps: true
});

districtSchema.index({ status: 1 });
districtSchema.index({ createdAt: -1 });

const District = mongoose.models.districts || mongoose.model("districts", districtSchema);
export default District;
