import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferringOrgComponent } from './referring-org.component';

describe('ReferringOrgComponent', () => {
  let component: ReferringOrgComponent;
  let fixture: ComponentFixture<ReferringOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferringOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferringOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
