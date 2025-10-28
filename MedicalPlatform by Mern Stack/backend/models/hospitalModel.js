import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    appointments: {
        type: [[String]],
        required: true
    }
});

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    departments: {
        type: Map,
        of: [departmentSchema] 
    },
    description: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    announcements: {
        type: [[String]]
    },
    fee: {
        type: String,
        required: true
    },
});

export default mongoose.model('Hospital', hospitalSchema);
