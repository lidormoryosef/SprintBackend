const bodyParser = require('body-parser');
const express = require('express');
const memberRoute = require('./Routes/MemberRoute');
const groupRoute = require('./Routes/GroupRoute');
const companyRoute = require('./Routes/CompanyRoute');
const eventRoute = require('./Routes/EventRoute');
const http=require('http');
const path = require('path');
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

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });


app.use('/api/members', memberRoute);
app.use('/api/groups', groupRoute);
app.use('/api/company', companyRoute);
app.use('/api/event', eventRoute);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const server=http.createServer(app);

server.listen(5000);