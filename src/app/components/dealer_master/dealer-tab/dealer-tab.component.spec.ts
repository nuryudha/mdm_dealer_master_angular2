import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTabComponent } from './dealer-tab.component';

describe('DealerTabComponent', () => {
  let component: DealerTabComponent;
  let fixture: ComponentFixture<DealerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
