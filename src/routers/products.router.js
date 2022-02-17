const {Router} =  require("express")
const router = Router()
const {renderniños,
    renderMujeres,
    renderHombres
} = require("../controllers/products.controllers")

router.get("/productos_nenes", renderniños)
router.get("/productos_mujeres", renderMujeres)
router.get("/productos_hombres", renderHombres )
module.exports =  router
