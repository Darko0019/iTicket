import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandManagerComponent } from './demand-manager.component';

describe('DemandManagerComponent', () => {
  let component: DemandManagerComponent;
  let fixture: ComponentFixture<DemandManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
