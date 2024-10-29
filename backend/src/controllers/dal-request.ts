import { Request, Response } from 'express';
import { DALController } from './dal';
import { InstanceSchemaType, Ent } from '../../../shared/contracts';

export class DALRequestController {
    static insert(req: Request, res: Response) {
        DALController.insert(req.params?.schema as InstanceSchemaType, req.body).then(() => res.send({ result: 'ok' }))
            .catch((err: any) => res.send(err));
    };

    static getMany(req: Request, res: Response) {
        const filter = { _id: { $in: (req as any).body._ids } }; //TODO: this is wrong const 
        DALController.getMany(req.params.schema as InstanceSchemaType, filter)
            .then((result: any) => res.send(result))
            .catch((err: any) => res.send(err));
    };

    static getById(req: Request, res: Response) {
        DALController.getById(req.params.schema as InstanceSchemaType, req.params.id)
            .then((result: any) => res.json(result))
            .catch((err: any) => res.send(err));
    };

    static updateById(req: Request, res: Response) {
        DALController.update(req.body as Ent)
            .then(result => res.send({ result: 'ok' }))
            .catch(err => res.send(err));
    };

    static deleteById(req: Request, res: Response) {
        DALController.deleteById(req.params.schema as InstanceSchemaType, req.params.id)
            .then((result: any) => res.send({ result: 'ok' }))
            .catch((err: any) => res.send(err));
    };
}