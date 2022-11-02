const express = require('express')
const router = express.Router()
const {Home,register,createStudent,login, Login1, getAll,getSingle,updateSingle,deleteSingle} =  require('../controller/Studentcontrol')

router.get('/', Home)
router.get('/register', register)
router.post('/register', createStudent)
router.get('/login', login)
router.post('/login', Login1)
router.get('/getAll', getAll)
router.get('/getSingle/:id', getSingle)
router.put('/updateSingle/:id', updateSingle)
router.delete('/deleteSingle/:id', deleteSingle)

module.exports = router