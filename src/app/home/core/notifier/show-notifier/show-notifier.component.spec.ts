import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNotifierComponent } from './show-notifier.component';

describe('ShowNotifierComponent', () => {
  let component: ShowNotifierComponent;
  let fixture: ComponentFixture<ShowNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
