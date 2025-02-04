const { Schema, model } = require('mongoose');

const TournamentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    maxChefs: {
        type: Number,
        required: true,
    },
    chefs: [{
        _id: false,
        type: Schema.Types.ObjectId,
        ref: 'Chef'
    }],
    ranking: [{
        _id: false,
        chef: {
            type: Schema.Types.ObjectId,
            ref: 'Chef'
        },
        score: {
            type: Number,
        }
    }],
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
TournamentSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...tournament } = this.toObject();
    tournament.uid = _id;
    return tournament;
}

module.exports = model('Tournament', TournamentSchema);
