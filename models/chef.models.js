const { Schema, model } = require('mongoose');


const ChefSchema = new Schema({
    specialty: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }, 
    experienceYears: {
        type: Number,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaActualizacion: {
        type: Date,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

// Método para modificar la respuesta JSON del modelo
ChefSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...chef } = this.toObject();
    chef.uid = _id;
    return chef;
}

module.exports = model('Chef', ChefSchema);
