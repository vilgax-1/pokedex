import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  
  private page$ = new BehaviorSubject<number>(1);
  private lastPage$ = new BehaviorSubject<number>(1);
  count$ = new BehaviorSubject<number>(0);

  current_Page: number = 1;
  last_Page: number = 0;
  
  @Output() updateData = new EventEmitter<number>();

  @Input() set currentPage(value: number){
    this.page$.next(value);
  }
  
  @Input() set lastPage(value: number){
    this.lastPage$.next(value);
  }
  
  @Input() set count(value: number){
    this.count$.next(value);
  }

  ngAfterViewInit(): void{
    this.dataSubjects();
  }

  dataSubjects(): void{
    combineLatest([
      this.page$,
      this.lastPage$
    ]).subscribe(([current, last]:[number,number]) => {      
      this.current_Page = current > 0 ? current : 1 ;
      this.last_Page = last > 0 ? last : 1;
    });
  }

  getModValue(value: any): number{
    return Math.ceil(value / 18);
  }

  changeSelectedPage(value: any): void {
    this.updateData.emit(value);
  }

}
