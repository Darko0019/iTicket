import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDemandDetailsComponent } from './manager-demand-details.component';

describe('ManagerDemandDetailsComponent', () => {
  let component: ManagerDemandDetailsComponent;
  let fixture: ComponentFixture<ManagerDemandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDemandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDemandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
