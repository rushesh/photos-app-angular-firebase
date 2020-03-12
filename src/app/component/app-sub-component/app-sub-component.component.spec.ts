import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubComponentComponent } from './app-sub-component.component';

describe('AppSubComponentComponent', () => {
  let component: AppSubComponentComponent;
  let fixture: ComponentFixture<AppSubComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSubComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSubComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
