import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilTechnicianComponent } from './accueil-technician.component';

describe('AccueilTechnicianComponent', () => {
  let component: AccueilTechnicianComponent;
  let fixture: ComponentFixture<AccueilTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilTechnicianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
