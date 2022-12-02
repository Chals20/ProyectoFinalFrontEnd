import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroIndexComponent } from './intro-index.component';

describe('IntroIndexComponent', () => {
  let component: IntroIndexComponent;
  let fixture: ComponentFixture<IntroIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
