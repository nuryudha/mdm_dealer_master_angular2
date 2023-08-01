import { Directive, ElementRef, Input } from '@angular/core';

import { DatePipe } from '@angular/common';

@Directive({
  selector: '[appDateFormat]',
})
export class DateFormatDirective {
  @Input('appDateFormat')
  format!: string;

  constructor(private el: ElementRef, private datePipe: DatePipe) {}

  ngOnChanges() {
    const value = this.el.nativeElement.value;
    const date = new Date(value);
    const formattedDate = this.datePipe.transform(date, this.format);
    this.el.nativeElement.value = formattedDate;
  }
}
