import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateLayoutComponent } from './alternate-layout.component';

describe('AlternateLayoutComponent', () => {
  let component: AlternateLayoutComponent;
  let fixture: ComponentFixture<AlternateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternateLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
