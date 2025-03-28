import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDemandsListComponent } from './manager-demands-list.component';

describe('ManagerDemandsListComponent', () => {
  let component: ManagerDemandsListComponent;
  let fixture: ComponentFixture<ManagerDemandsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDemandsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDemandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
