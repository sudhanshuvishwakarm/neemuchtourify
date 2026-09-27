import mongoose from "mongoose";

const gramPanchayatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    headerImage: {
        type: String,
        required: true
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "districts",
        required: true
    },
    block: {
        type: String,
        required: true,
        trim: true
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

    basicInfo: {
        establishmentYear: {
            type: Number
        },
        population: {
            type: Number
        },
        area: {
            type: Number // in sq km
        },
        majorRivers: [{
            type: String,
            trim: true
        }],
        languagesSpoken: [{
            type: String,
            trim: true
        }]
    },

    culturalInfo: {
        historicalBackground: {
            type: String,
            trim: true
        },
        traditions: {
            type: String,
            trim: true
        },
        localCuisine: {
            type: String,
            trim: true
        },
        localArt: {
            type: String,
            trim: true
        }
    },

    // name/designation/contactNumber are the primary fields shown to users
    // (name -> designation -> contact). heading/description are kept for
    // backward compatibility with existing panchayat records.
    politicalOverview: [{
        name: {
            type: String,
            trim: true
        },
        designation: {
            type: String,
            trim: true
        },
        contactNumber: {
            type: String,
            trim: true
        },
        heading: {
            type: String
        },
        description: {
            type: String
        }
    }],

    transportationServices: [{
        name: {
            type: String,
            trim: true
        },
        type: {
            type: String
        },
        location: {
            type: String
        }
    }],

    hospitalityServices: [{
        name: {
            type: String,
            trim: true
        },
        type: {
            type: String
        },
        location: {
            type: String
        },
        contact: {
            phone: String
        }
    }],

    emergencyDirectory: [{
        service: {
            type: String
        },
        contactNumber: {
            type: String
        }
    }],

    specialPersons: [{
        name: {
            type: String,
            trim: true
        },
        achievement: {
            type: String
        },
        description: {
            type: String
        }
    }],

    mediaGallery: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "media"
    }],


    status: {
        type: String,
        enum: ['Verified', 'Pending', 'Draft'],
        default: 'Pending'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
        required: true
    }
}, {
    timestamps: true
});

gramPanchayatSchema.index({ slug: 1 });
gramPanchayatSchema.index({ district: 1 });
gramPanchayatSchema.index({ status: 1 });
gramPanchayatSchema.index({ district: 1, status: 1 });
gramPanchayatSchema.index({ createdAt: -1 });

const GramPanchayat = mongoose.models.gramPanchayats || mongoose.model("gramPanchayats", gramPanchayatSchema);
export default GramPanchayat;
