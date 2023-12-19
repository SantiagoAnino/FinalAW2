import { Router } from "express"
import { readFile, writeFile } from "fs/promises"
import path from "path"; 

const __dirname = path.resolve();
const fileSectores = await readFile(path.join(__dirname, './data', 'sectores.JSON'), 'utf-8');
const SectoresData = JSON.parse(fileSectores);

const fileMozo = await readFile(path.join(__dirname, './data', 'mozos.JSON'), 'utf-8');
const MozosData = JSON.parse(fileMozo);
const router = Router()


router.get('/infoSector/:id', (req, res) => {
    const sectorId = parseInt(req.params.id);
    const sector = SectoresData.find((s) => s.id === sectorId);

    if (sector) {
        // Reemplazar IDs de mozos por sus nombres
        const mozosConNombres = sector.mozos.map((mozoId) => {
            const mozo = MozosData.find((m) => m.id === mozoId);
            return mozo ? mozo.nombre : "Desconocido";
        });

        const sectorConNombres = {
            ...sector,
            mozos: mozosConNombres,
        };

        res.json(sectorConNombres);
    } else {
        res.status(404).json({ mensaje: 'Sector no encontrado' });
    }
});

export default router