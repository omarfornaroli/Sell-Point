// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Cambia la URL al endpoint de tu servidor
  }

  // Método para emitir eventos al servidor
  emit(event: string, data: any): void {
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

  // Método para cerrar la conexión cuando el servicio no esté en uso
  disconnect(): void {
    this.socket.disconnect();
  }
}
