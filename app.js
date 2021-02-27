const express = require('express');
const session = require("express-session");
const path = require("path");
const app = express();
const { Fruits, Auth } = require("./model");

const port = 80;
app.use(session({ secret: '0084A32228A94AC63F990E7443B49E28' }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'fe')))

app.use('*', (req, res, next) => {
  if (req.session.authID || req.originalUrl === '/login') {
    next();
  } else {
    res.status(401).send({msg: 'please login first'});
  }
});

async function getList(pageNum = 1, pageSize = 50) {
  const docs = await Fruits
    .find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  return docs;
}

async function insertList(f) {
  const docs = await new Fruits(f).save()
  return docs;
}

async function checkAuth(Obj) {
  const docs = await Auth.findOne(Obj)
  return docs;
}

app.post('/login', async (req, res) => {
  const rs = await checkAuth(req.body);
  if (rs) {
    req.session.authID = rs._id;
    req.session.cookie.maxAge = 2 * 60 * 60 * 1000;
    req.session.cookie.httpOnly = false;
    res.status(200).send({data: rs, msg: 'success'});
  } else {
    res.status(500).send({msg: 'userName or password wrong!'});
  }
})

app.get('/fruit',async (req, res) => {
  const list = await getList();
  res.send(list);
})

app.post('/fruit',async (req, res) => {
  await insertList(req.body);
  res.send('ok');
})

app.post('/auth',async (req, res) => {
  await new Auth(req.body).save()
  res.send('ok');
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
