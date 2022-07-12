import type { Request, Response } from "express";

/* Controller */
const controller = () => {
  /* Public */
  return {
    /* Show welcome */
    index: (req: Request, res: Response) => {
      res.json({ message: "Welcome to Alvion!" });
    },
  };
};

export default controller;
