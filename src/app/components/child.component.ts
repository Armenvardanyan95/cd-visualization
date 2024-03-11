import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NestedChild1Component } from './nested-child1.component';
import { NestedChild2Component } from './nested-child2.component';

@Component({
  selector: `app-child`,
  template: `
    <div #root>
      <h2 #title></h2>
      <input [(ngModel)]="text"/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor,
        sapien quis tempor vehicula, elit nunc ultrices arcu, vitae consectetur
        massa risus quis eros. Nulla facilisi. Sed euismod, felis quis aliquam
        ultricies, nisl diam aliquet odio, quis bibendum ante justo vel augue.
        Sed non dolor. Nulla facilisi. Nulla
        <button (click)="triggerCD()">Trigger!</button>
      </p>
    </div>
    <app-nested-child1/>
    <app-nested-child2 [someInput]="text"/>
    {{onChangeDetection()}}
  `,
  standalone: true,
  styles: `
    .detecting {
      opacity: 0.2;
      color: red;
    }
  `,
  imports: [NestedChild1Component, NestedChild2Component, FormsModule],
})
export class ChildComponent {
  name = 'Child Component';
  @ViewChild('root') rootElementRef?: ElementRef<HTMLDivElement>;
  @ViewChild('title') titleElementRef?: ElementRef<HTMLHeadingElement>;
  ngZone = inject(NgZone);
  count = 0;
  text = 'Text';

  onChangeDetection() {
    this.ngZone.runOutsideAngular(() => {
      this.count++;
      if (this.titleElementRef?.nativeElement) {
        this.titleElementRef.nativeElement.innerText = `${this.name}, Change detected ${this.count} times`;
      }
      if (!this.rootElementRef?.nativeElement.classList.contains('detecting')) {
        this.rootElementRef?.nativeElement.classList.add('detecting');
      }

      setTimeout(() => {
        this.rootElementRef?.nativeElement.classList.remove('detecting');
      }, 1000);
    });

    return '';
  }

  triggerCD() {}
}
