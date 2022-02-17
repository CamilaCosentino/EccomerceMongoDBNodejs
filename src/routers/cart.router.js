const {Router} =  require("express")
const router = Router()
const {renderCart,
    addCart,
    updateS,
    updateR,
    deleteI,
    deleteP
} = require("../controllers/cart.controller")
const auth =require("../controllers/auth.controller")
router.get("/cart",auth,renderCart)

router.post("/cart",auth, addCart)
router.put("/updateSuma/:id",updateS)
router.put("/updateResta/:id",updateR)
router.delete("/deleteI/:id", auth, deleteI)

module.exports = router