import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateissueComponent } from './addupdateissue.component';

describe('AddupdateissueComponent', () => {
  let component: AddupdateissueComponent;
  let fixture: ComponentFixture<AddupdateissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddupdateissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddupdateissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
