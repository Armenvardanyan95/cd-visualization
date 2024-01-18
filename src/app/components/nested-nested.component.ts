import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  ViewChild,
  inject
} from '@angular/core';

@Component({
  selector: `app-nested-nested`,
  template: `
    <div class="root" #root>
      <h2>{{ name }}</h2>
      <h3>Text value is: {{ someInput }}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor,
        sapien quis tempor vehicula, elit nunc ultrices arcu, vitae consectetur
        massa risus quis eros. Nulla facilisi. Sed euismod, felis quis aliquam
        ultricies, nisl diam aliquet odio, quis bibendum ante justo vel augue.
        Sed non dolor. Nulla facilisi. Nulla
        <button (click)="triggerCD()">Trigger!</button>
        <button (click)="triggerHTTP()">Make HTTP call</button>
      </p>
    </div>

    {{onChangeDetection()}}
  `,
  styles: `
    .detecting {
      opacity: 0.2;
      color: purple;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedNestedComponent {
  name = 'Nested Nested Component';
  @Input() someInput = 'Text';
  previousValue = 'Text';
  @ViewChild('root') rootElementRef?: ElementRef<HTMLDivElement>;
  ngZone = inject(NgZone);
  cdRef = inject(ChangeDetectorRef);
  detecting = false;

  triggerCD() {
    this.ngZone.runOutsideAngular(() => this.cdRef.detectChanges());
  }

  triggerHTTP() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });

  }

  onChangeDetection() {
    if (!this.rootElementRef?.nativeElement.classList.contains('detecting')) {
      this.rootElementRef?.nativeElement.classList.add('detecting');
    }

    setTimeout(() => {
      this.rootElementRef?.nativeElement.classList.remove('detecting');
    }, 1000);

    return '';
  }
}
