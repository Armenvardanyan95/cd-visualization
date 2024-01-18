import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';

@Component({
  selector: `app-nested-child1`,
  template: `
    <div class="root" #root>
      <h2>{{ name }}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor,
        sapien quis tempor vehicula, elit nunc ultrices arcu, vitae consectetur
        massa risus quis eros. Nulla facilisi. Sed euismod, felis quis aliquam
        ultricies, nisl diam aliquet odio, quis bibendum ante justo vel augue.
        Sed non dolor. Nulla facilisi. Nulla
        <button (click)="triggerCD()">Trigger!</button>
      </p>
    </div>
    {{onChangeDetection()}}
  `,
  styles: `
    .detecting {
      opacity: 0.2;
      color: green;
    }
  `,
  standalone: true,
})
export class NestedChild1Component {
  name = 'Nested Child 1 Component';
  @ViewChild('root') rootElementRef?: ElementRef<HTMLDivElement>;
  ngZone = inject(NgZone);

  onChangeDetection() {
    this.ngZone.runOutsideAngular(() => {
      if (!this.rootElementRef?.nativeElement.classList.contains('detecting')) {
        this.rootElementRef?.nativeElement.classList.add('detecting');
      }

      setTimeout(() => {
        this.rootElementRef?.nativeElement.classList.remove('detecting');
      }, 1000);
    });

    return '';
  }

  triggerCD() {
    setTimeout(() => {
      Promise.resolve().then(() => {});
    }, 4_000);
  }
}
