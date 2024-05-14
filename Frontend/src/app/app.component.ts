import { Component, Injector } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { createCustomElement } from '@angular/elements';
import { PopUpWindowComponent } from './pop-up-window/pop-up-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResourceListComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';

  constructor(private injector : Injector)
  {
    const PopUpWindow = createCustomElement(PopUpWindowComponent,{injector: this.injector});
    customElements.define('popup-window',PopUpWindow);
  }

}
