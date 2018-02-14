import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsSwithcerComponent } from './charts-swithcer.component';

describe('ChartsSwithcerComponent', () => {
  let component: ChartsSwithcerComponent;
  let fixture: ComponentFixture<ChartsSwithcerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsSwithcerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsSwithcerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
