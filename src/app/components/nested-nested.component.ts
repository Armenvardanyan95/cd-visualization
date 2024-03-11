import {
  AfterViewInit,
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
      <h4 #title></h4>
      <h5>Text value is: {{ someInput }}</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor,
        sapien quis tempor vehicula, elit nunc ultrices arcu, vitae consectetur
        massa risus quis eros. Nulla facilisi. Sed euismod, felis quis aliquam
        ultricies, nisl diam aliquet odio, quis bibendum ante justo vel augue.
        Sed non dolor. Nulla facilisi. Nulla
        <button #btn>Trigger!</button>
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
export class NestedNestedComponent implements AfterViewInit {
  name = 'Nested Nested Component';
  @Input() someInput = 'Text';
  previousValue = 'Text';
  @ViewChild('root') rootElementRef?: ElementRef<HTMLDivElement>;
  @ViewChild('btn') btnElementRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('title') titleElementRef?: ElementRef<HTMLHeadingElement>;
  count = 0;
  ngZone = inject(NgZone);
  cdRef = inject(ChangeDetectorRef);
  detecting = false;

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.btnElementRef?.nativeElement.addEventListener('click', () => {
        this.triggerCD();
      });

      this.titleElementRef!.nativeElement.innerText = `${this.name}, Change detected ${this.count} times`;
    });
  }

  triggerCD() {
    this.ngZone.runOutsideAngular(() => this.cdRef.detectChanges());
  }

  triggerHTTP() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // this.name = 'Changed';
        // this.cdRef.markForCheck();
      });

  }

  onChangeDetection() {
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

    return '';
  }
}
