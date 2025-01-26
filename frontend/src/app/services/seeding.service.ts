import { Injectable } from "@angular/core";
import { SocketService } from "./socket.service";

@Injectable({
    providedIn: 'root',
})
export class SeedingService {
    constructor(
        private socketService: SocketService,
    ) { }
    async seed() {
        this.socketService.emit('cmd', { type: 'query' });
    }
}