import { Directive, ElementRef, Input, DoCheck, OnChanges, OnInit, Renderer } from '@angular/core'

@Directive({
  selector: '[ngShow]',
})
export class NgShowDirective implements OnInit, OnChanges {
  @Input('ngshow') ngshow;
  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    console.log('ngOnInit', this.el, this.ngshow, this.el.nativeElement.style);
  }

  ngOnChanges() {
    let display = 'none';
    if (this.ngshow) {
      display = 'block'
    }
    console.log('ngOnChanges', display);
    this.renderer.setElementStyle(this.el.nativeElement, 'display', display)
  }
}
