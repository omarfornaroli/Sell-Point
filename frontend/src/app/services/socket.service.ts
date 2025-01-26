// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Ent } from '@shared/contracts';
import { DalService } from '../dal/db.service';
import { AuthGuard } from './auth.services';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor(
    private dal: DalService,
    private authService: AuthGuard,
  ) {
    this.socket = io('http://localhost:3000'); // Cambia la URL al endpoint de tu servidor
  }

  // Método para emitir eventos al servidor
  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  // Método para escuchar eventos del servidor
  listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  listenDBChanges() {
    this.listen('db change').subscribe((data) => {
      console.log('db change', data);
    });
  }

  listenEnts() {
    const token = this.authService.getToken();
    if (!token) return;
    this.listen('ents').subscribe(async (entsBK: Ent[]) => {
      const entBkIDS = entsBK.map(ent => ent._id);
      const entFTIDS = (await this.dal.findAllEnts())?.map(ent => ent._id);
      const idsToSave = entBkIDS.filter(id => !entFTIDS.includes(id));
      if (idsToSave.length > 0) {
        const entsToSaveBySchema: { [_schema: string]: Ent[] } = {};
        entsBK.map(ent => {
          if (idsToSave.includes(ent._id)) entsToSaveBySchema[ent._schema] = [...entsToSaveBySchema?.[ent._schema] ?? [], ent];
        });
        for (const ents of Object.values(entsToSaveBySchema)) {
          await this.dal.insertMany(ents);
          console.log('ents saved', ents.length);
        }
      }
    });
  }

  // Método para cerrar la conexión cuando el servicio no esté en uso
  disconnect(): void {
    this.socket.disconnect();
  }
}
