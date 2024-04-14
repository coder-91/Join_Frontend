import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoticeViewComponent } from './legal-notice-view.component';

describe('LegalNoticeViewComponent', () => {
  let component: LegalNoticeViewComponent;
  let fixture: ComponentFixture<LegalNoticeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalNoticeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
