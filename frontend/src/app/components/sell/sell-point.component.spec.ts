import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPointComponent } from './sell-point.component';

describe('SellPointComponent', () => {
  let component: SellPointComponent;
  let fixture: ComponentFixture<SellPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellPointComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SellPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
