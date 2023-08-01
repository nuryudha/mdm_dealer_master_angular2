import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDealerBranchComponent } from './search-dealer-branch.component';

describe('SearchDealerBranchComponent', () => {
  let component: SearchDealerBranchComponent;
  let fixture: ComponentFixture<SearchDealerBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDealerBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDealerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
