import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahDealerBranchComponent } from './tambah-dealer-branch.component';

describe('TambahDealerBranchComponent', () => {
  let component: TambahDealerBranchComponent;
  let fixture: ComponentFixture<TambahDealerBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahDealerBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahDealerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
