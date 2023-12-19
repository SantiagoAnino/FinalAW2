import express from 'express'
import mozoRoutes from "./routes/mozo.routes.js"
import pedidosRoutes from "./routes/pedidos.routes.js"
import sectoresRoutes from "./routes/sectores.routes.js"


const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})


app.use('/mozos', mozoRoutes)
app.use('/sectores', sectoresRoutes)
app.use('/pedidos', pedidosRoutes)