import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetodoRetiroComponent } from './add-metodo-retiro.component';

describe('AddMetodoRetiroComponent', () => {
  let component: AddMetodoRetiroComponent;
  let fixture: ComponentFixture<AddMetodoRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMetodoRetiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMetodoRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
