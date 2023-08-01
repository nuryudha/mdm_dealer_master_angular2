import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTabComponent } from './branch-tab.component';

describe('BranchTabComponent', () => {
  let component: BranchTabComponent;
  let fixture: ComponentFixture<BranchTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
