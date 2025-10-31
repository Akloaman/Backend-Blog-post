const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const db = require('./models/db'); // this will create the DB if not exists
const createTables = require('./models/setup');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');




const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startServer() {
    try {
          await createTables();     
        app.locals.db = db; // Save it globally to use in controllers

        // Routes
        app.use('/users', usersRoutes);
        app.use('/posts', postsRoutes);
        app.use('/comments', commentsRoutes);

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
              console.log(`📘 Swagger docs: http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
    }
}

startServer();
