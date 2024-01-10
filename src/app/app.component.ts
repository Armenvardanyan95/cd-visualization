import { Component } from '@angular/core';
import { ChildComponent } from './components/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <app-child/>
  `,
})
export class AppComponent {
  title = 'cd-visualization';
}
