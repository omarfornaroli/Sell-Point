import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeedingService } from '../../services/seeding.service';
import { DalService } from '../../dal/db.service';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  isFinishedInit: boolean;

  constructor(
    private dalService: DalService,
    private seedingService: SeedingService,
    private socketService: SocketService
  ) {
    this.init()
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  async init() {
    await this.dalService.initDB();
    this.socketService.listenDBChanges();
    this.socketService.listenEnts();
    this.seedingService.seed();
    this.isFinishedInit = true;
  }

  finishInit() {
    return this.isFinishedInit;
  }
}