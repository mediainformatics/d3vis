const express = require('express');
const router = express.Router();

/* GET beispiel listing. */
router.get('/:id([0-9]{2})', function (req, res, next) {
  let obj = {
    title: 'D3 Beispiel',
    id: +req.params.id
  };
  res.render('beispiel', obj);
});

// CommonJS: make router available
module.exports = router;
