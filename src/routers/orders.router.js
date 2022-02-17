const {Router} = require("express")
const router = Router()
const {saveOrds,delelreOrd, viewO} =require("../controllers/orders.controller")

router.post('/checkout',saveOrds)
router.delete('/deleteO/:id', delelreOrd)
router.get('/viewO/:id', viewO)
module.exports = router