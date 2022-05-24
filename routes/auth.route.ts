import express, {Application, Request, Response} from 'express';

export const router = express.Router();

let currentUser: any = null;
let token: string = '';

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now());
  next();
});

router.post('/session', (req, res) => {
  console.log(req.body);

  token = 'mock-jwt';

  currentUser = {
    name: 'Derek Wang',
    token,
    email: 'guanghuiw@vmware.com',
    role: 'PROVIDER_ADMIN',
    username: 'guanghuiw',
  };
  res.send({
    user: currentUser,
  });
});

router.delete('/session', (req, res) => {
  currentUser = null;
  token = '';

  res.status(204).send();
});

router.get('/current-user', (req, res) => {
  if (currentUser && token) {
    res.send({user: currentUser});
  }
});
