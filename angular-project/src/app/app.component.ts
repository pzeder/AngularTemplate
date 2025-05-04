import { Component, inject } from '@angular/core';
import { GameService } from './core/game.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected game = inject(GameService);
}
