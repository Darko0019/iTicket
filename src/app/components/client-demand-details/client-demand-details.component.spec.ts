import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDemandDetailsComponent } from './client-demand-details.component';

describe('ClientDemandDetailsComponent', () => {
  let component: ClientDemandDetailsComponent;
  let fixture: ComponentFixture<ClientDemandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDemandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDemandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
