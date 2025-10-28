import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    prescriptions: [{
        date: {
            type: Date,
            required: true
        },
        doctorName: {
            type: String,
            required: true
        },
        prescription: {
            type: String,
            required: true
        }
    }],
    pdfs: {
        type: [[String]],
    },
    appointments: {
        type: [[String]],
    }
});

export default mongoose.model('Patient', patientSchema);