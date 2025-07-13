const bodyParser = require('body-parser');
const express = require('express');
const memberRoute = require('./Routes/MemberRoute');
const http=require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend sprint',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
let app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({ limit: '1000mb' }));
app.use(express.static('public'));
app.use('/api/members', memberRoute);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const server=http.createServer(app);

server.listen(5000);