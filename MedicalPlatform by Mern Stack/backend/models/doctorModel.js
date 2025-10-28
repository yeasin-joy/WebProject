import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
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
    specialty: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pdfs: {
        type: [[String]]
    }
});

export default mongoose.model('Doctor', doctorSchema);

