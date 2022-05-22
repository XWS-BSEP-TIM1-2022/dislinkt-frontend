import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForAdminComponent } from './page-for-admin.component';

describe('PageForAdminComponent', () => {
  let component: PageForAdminComponent;
  let fixture: ComponentFixture<PageForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
