import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedicationComponent } from './search-medication.component';

describe('SearchMedicationComponent', () => {
  let component: SearchMedicationComponent;
  let fixture: ComponentFixture<SearchMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMedicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
