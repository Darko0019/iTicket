import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDemandsListComponent } from './client-demands-list.component';

describe('ClientDemandsListComponent', () => {
  let component: ClientDemandsListComponent;
  let fixture: ComponentFixture<ClientDemandsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDemandsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDemandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
