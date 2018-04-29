import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferringOrgListComponent } from './referring-org-list.component';

describe('ReferringOrgListComponentComponent', () => {
  let component: ReferringOrgListComponent;
  let fixture: ComponentFixture<ReferringOrgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferringOrgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferringOrgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
