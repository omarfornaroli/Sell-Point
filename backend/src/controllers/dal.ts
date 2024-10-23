import { Model, Models } from 'mongoose';
import { DAL, DALModelKeys } from '../models/models';
import { Request, Response } from 'express';

export class DALController {
    static insert(req: Request, res: Response) {
        if (!req.params?.schema) return;
        const model = DAL[`${req.params.schema}Model` as DALModelKeys] as Model<any>;
        model.create(req.body).then(() => res.send({ result: 'ok' }))
            .catch((err: any) => res.send(err));
    };

    static getMany(req: Request, res: Response) {
        if (!req.params?.schema) return;
        const model = DAL[`${req.params.schema}Model` as DALModelKeys] as Model<any>;
        const paths = Object.keys(model.schema.paths);
        model.find({ enterprise: (req as any).user.enterprise })
            .populate(paths)
            .then((result: any) => res.send(result))
            .catch((err: any) => res.send(err));
    };

    static getOne(req: Request, res: Response) {
        if (!req.params?.schema) return;
        const model = DAL[`${req.params.schema}Model` as DALModelKeys] as Model<any>
        model.findById(req.params.id)
            .then((result: any) => res.json(result))
            .catch((err: any) => res.send(err));
    };

    static updateOne(req: Request, res: Response) {
        if (!req.params?.schema) return;
        const model = DAL[`${req.params.schema}Model` as DALModelKeys] as Model<any>
        model.updateOne({ _id: req.params.id }, { $set: req.body })
            .then(result => res.send({ result: 'ok' }))
            .catch(err => res.send(err));
    };

    static delete(req: Request, res: Response) {
        if (!req.params?.schema) return;
        const model = DAL[`${req.params.schema}Model` as DALModelKeys] as Model<any>
        model.deleteOne({ _id: req.params.id })
            .then((result: any) => res.send({ result: 'ok' }))
            .catch((err: any) => res.send(err));
    };
}