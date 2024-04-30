import express, { urlencoded, Express, json, Response, NextFunction, Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routerUsers from './http/routes'
import { ZodError } from 'zod';
// import cookie from "cookie-parser"
 

export const app: Express = express();
 
app.use(cors({ 
    origin: "*",
})); 

app.use(json());

app.use(urlencoded({
    extended: false
}));  

app.use(morgan('dev'));

// app.use(cookie())

app.use((error: any, _: Request, res: Response, __: NextFunction) => {
    // linha para exessao de erro global da aplicação
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() });
    }
  
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    } else {
      // TODO:
    }
  
    return res.status(500).send({ message: 'Internal server Error' });
  });

app.use("/api", routerUsers)


