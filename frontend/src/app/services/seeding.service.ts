import { Injectable } from "@angular/core";
import { DalService } from "../dal/db.service";
import { seedProducts } from "./products.seed";
import { ID_PREFIX, SCHEMA_PREFIX } from "@shared/constants";
import { Ent } from "@shared/contracts";

@Injectable({
    providedIn: 'root',
})
export class SeedingService {
    constructor(private dalService: DalService) { }
    async seed() {

        seedProducts.map((product) => {
            product['_id'] = `${ID_PREFIX}:${product._label}`;
            product['_schema'] = `${SCHEMA_PREFIX}:product`;
            product['_c'] = new Date().toISOString();
            return product as Partial<Ent>;
        })
        await this.dalService.insertMany(seedProducts as any)
    }
}