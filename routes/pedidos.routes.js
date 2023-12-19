import { Router } from "express"
import { readFile, writeFile } from "fs/promises"

const filePedidos = await readFile('./data/pedidos.JSON', 'utf-8')
const PedidosData = JSON.parse(filePedidos)
const router = Router()

router.get('/pedidosActivos', (req, res) => {
    const pedidosActivos = PedidosData.filter((pedido) => pedido.estado === true);
    res.json(pedidosActivos);
});

router.post('/abrirNuevaMesa', (req, res) => {
    try {
      // Obtener datos de la nueva mesa desde la solicitud
      const { id_mozo, id_mesa } = req.body;
  
      const nuevoPedido = {
        id: PedidosData.length + 1,
        id_mesa,
        pedido: [],
        id_mozo,
        estado: true,
      };
  
      PedidosData.push(nuevoPedido);
  
      writeFile('.data/pedidos.JSON', JSON.stringify(PedidosData, null, 2), 'utf-8');
  
      res.json({ mensaje: 'Mesa abierta con éxito', nuevoPedido });
    } catch (error) {
      console.error("Error al abrir una nueva mesa:", error.message);
      res.status(500).json({ mensaje: 'Error al abrir una nueva mesa' });
    }
  });

export default router