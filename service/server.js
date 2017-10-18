const express = require('express');
const cors = require('cors');
const http = require('http');
const db = require('./database');
const auth = require('./authentification');
const util = require('./util');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;
let server;
let wss;

function fetchPost(req, res, next){
  try{
    let authNo = Number(body.auth);
    let realm = util.withinReason(req.params.realm);
    if(!auth.allowed({action: 1, realm: req.params.realm}, authNo)){
      res.status(403).send("Action not authorised");
    }
    db.tables.post.findAll()
    .then((data) => {
      res.status(200).send(data.map(util.sanitise));
    });
  } catch (e) {
    next(e);
  }
}

function makePost(req, res, next){
  try{
    let authNo = Number(body.auth);
    let realm = util.withinReason(req.params.realm);
    if(!auth.allowed({action: 2, realm: req.params.realm}, authNo)){
      res.status(403).send("Action not authorised");
    }
    let request = util.withinReason(body.request);
    let reward = util.withinReason(body.reward);
    let contact = util.withinReason(body.contact);
    if(request && reward && contact){
      db.tables.post.create({
        request: request, 
        reward: reward, 
        contact: contact,
        realm: realm
      })
      .then((data) => {
        res.status(200).send(util.sanitize(data));
      });
    } else {
      res.status(400).send("Unreasonable demands");
    }
  } catch (e) {
    next(e);
  }
}

function updatePost(req, res, next){
  try{
    let id = Number(body.id);
    let authNo = Number(body.auth);
    let realm = util.withinReason(req.params.realm);
    if(!auth.allowed({action: 3, realm: req.params.realm, id: id}, authNo)){
      res.status(403).send("Action not authorised");
    }
    let request = util.withinReason(body.request);
    let reward = util.withinReason(body.reward);
    let contact = util.withinReason(body.contact);
    db.tables.post.findOne({where: {id: id, realm: realm}})
    .then((entry) => {
      if(request){
        entry.request = request;
      };
      if(reward){
        entry.reward = reward;
      };
      if(contact){
        entry.contact = contact;
      };
      return entry.save();
    })
    .then((data) => {
      res.status(200).send(util.sanitize(data));
    });
  } catch (e) {
    next(e);
  }
}

function purgePost(req, res, next){
  try{
    let id = Number(body.id);
    let authNo = Number(body.auth);
    let realm = util.withinReason(req.params.realm);
    if(!auth.allowed({action: 4, realm: req.params.realm, id: id}, authNo)){
      res.status(403).send("Action not authorised");
    }
    db.tables.post.destroy({where: {id: id, realm: realm}});
    .then(() => {
      res.status(200).send("Clean kill");
    });
  } catch (e) {
    next(e);
  }
}

function init(){
  return new Promise((resolve, reject) => {
    server = express();
    server.use(cors());
    server.use(bodyParser.json());
    server.get('/:realm/post', fetchPost);
    server.post('/:realm/post', makePost);
    server.put('/:realm/post', updatePost);
    server.delete('/:realm/post', purgePost);
    wss = new WebSocket.Server({server: server});
    wss.on('connection', (ws, req) => {
      auth.serve(ws, req);
    });
    server.listen(port, () => {
      console.log('server listening on port ' + port);
      resolve();
    });
  });
}


