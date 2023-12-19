import {Router} from "express"
import { readFile,writeFile } from "fs/promises"
import path from "path";


const fileMozo = await readFile('./data/mozos.JSON', 'utf-8')
const MozosData = JSON.parse(fileMozo)

const __dirname = path.resolve();

const fileSectores = await readFile(path.join(__dirname, './data', 'sectores.JSON'), 'utf-8');
const SectoresData = JSON.parse(fileSectores);

const router = Router()

router.get('/infoMozo/:id', (req, res) => {
    const mozoId = parseInt(req.params.id);
    const mozo = MozosData.find((m) => m.id === mozoId);
  
    if (mozo) {
      const sector = SectoresData.find((s) => s.mozos.includes(mozoId));
  
      res.json({
        id: mozo.id,
        nombre: mozo.nombre,
        sector: sector ? sector.nombre : "No asignado",
      });
    } else {
      res.status(404).json({ mensaje: 'Mozo no encontrado' });
    }
  });

export default router