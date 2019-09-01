var express = require('express');
var router = express.Router();
const config=require('../config/aws_credential.js')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
global.fetch = require('node-fetch');
const poolData = {    
  UserPoolId : config.UserPoolId, // Your user pool id here    
  ClientId : config.ClientId // Your client id here
  }; 
  const pool_region = 'us-east-1';
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

router.post('/register', function(req, res, next) {
  var attributeList = [];
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:req.body.name}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:req.body.gender}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:req.body.birthdate}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:req.body.address}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:req.body.email}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:req.body.phone_number}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:req.body.scope}));

  userPool.signUp(req.body.email, req.body.password, attributeList, null, function(err, result){
      if (err) {
          console.log(err);
          res.status(400).send(err);
          return;
      }
      cognitoUser = result.user;
      if(cognitoUser){
        res.status(200).send("User Successfully Register" )
      }

      // console.log('user name is ' + cognitoUser.getUsername());
  });
});

module.exports = router;
