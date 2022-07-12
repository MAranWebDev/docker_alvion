import type { Request, Response } from "express";
import fileFormat from "../utils/fileFormat";

/* Controller */
const controller = (filename: string) => {
  /* Setup */
  const file = fileFormat(filename);

  /* Public */
  return {
    /* Show json */
    index: async (req: Request, res: Response) => {
      const data = await file.json();
      res.json({ filename, data });
    },

    /* Show json skeleton and values */
    showValues: async (req: Request, res: Response) => {
      const data = await file.values();
      res.json({ filename, data });
    },

    /* Show json skeleton*/
    showSkeleton: async (req: Request, res: Response) => {
      const data = await file.skeleton();
      res.json({ filename, data });
    },

    /* Show json template */
    showTemplate: async (req: Request, res: Response) => {
      const data = await file.template();
      res.json({ filename, data });
    },
  };
};

export default controller;
