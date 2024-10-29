const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// URL de conexión con tus credenciales
const uri = "mongodb+srv://steban1:oNPck0VZg4r0pgkM@cluster0.m0cif.mongodb.net/premios?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((err) => console.error("Error al conectar con MongoDB Atlas:", err));

const usuariosSchema = new mongoose.Schema({
    username: String,
    fechaNacimiento: Date,
    cedula: Number,
    correo: String,
    celular: Number,
    ciudad: String,
    password: String,
    role: String
}, { versionKey: false });

usuariosSchema.pre('save', async function(next) {
    console.log("bro??")
    if (!this.isModified('password')) return next(); // Solo encripta si la contraseña ha sido modificada
    const saltRounds = 10; // Número de saltos para el hash
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash; // Reemplaza la contraseña en texto plano por el hash
    next();
  });

const Usuario = mongoose.model("users", usuariosSchema);


const codigoSchema = new mongoose.Schema({
    codigo: Number,
    premio: Number,
    activo: Boolean,
    fechaRegistro: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  // Nombre del modelo al que hace referencia
      }
}, { versionKey: false });

const Codigo = mongoose.model("codigos", codigoSchema);


module.exports = {
    Usuario, 
    Codigo};
