import express, {Application, Request, Response} from 'express';

export const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send([{name: 'Tenant 1'}, {name: 'Tenant 2'}]);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send({name: `Tenant ${id}`});
});
