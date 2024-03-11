import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  ViewChild,
  inject,
} from '@angular/core';
import { NestedNestedComponent } from './nested-nested.component';

@Component({
  selector: `app-nested-child2`,
  template: `
    <div class="root" #root>
      <h3 #title></h3>
      <h4>Text value is: {{ someInput }}</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor,
        sapien quis tempor vehicula, elit nunc ultrices arcu, vitae consectetur
        massa risus quis eros. Nulla facilisi. Sed euismod, felis quis aliquam
        ultricies, nisl diam aliquet odio, quis bibendum ante justo vel augue.
        Sed non dolor. Nulla facilisi. Nulla
        <button (click)="triggerCD()">Trigger!</button>
      </p>
    </div>

    <app-nested-nested />

    {{onChangeDetection()}}
  `,
  styles: `
    .detecting {
      opacity: 0.2;
      color: blue;
    }
  `,
  standalone: true,
  imports: [NestedNestedComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedChild2Component implements AfterViewInit {
  name = 'Nested Child 2 Component';
  @Input() someInput = 'Text';
  previousValue = 'Text';
  @ViewChild('root') rootElementRef?: ElementRef<HTMLDivElement>;
  @ViewChild('title') titleElementRef?: ElementRef<HTMLHeadingElement>;
  count = 0;
  ngZone = inject(NgZone);
  detecting = false;

  onChangeDetection() {
    this.ngZone.runOutsideAngular(() => {
      console.log('detectin')
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
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.titleElementRef!.nativeElement.innerText = `${this.name}, Change detected ${this.count} times`;
    });
  }

  triggerCD() {
    // this.ngZone.runOutsideAngular(() => {
    //   this.detecting = true;
    //   setTimeout(() => {
    //     this.detecting = false;
    //   }, 1000);
    // });
  }
}
