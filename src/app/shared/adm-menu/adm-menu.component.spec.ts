import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMenuComponent } from './adm-menu.component';

describe('AdmMenuComponent', () => {
  let component: AdmMenuComponent;
  let fixture: ComponentFixture<AdmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
