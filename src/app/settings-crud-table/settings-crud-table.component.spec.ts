import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCrudTableComponent } from './settings-crud-table.component';

describe('SettingsCrudTableComponent', () => {
  let component: SettingsCrudTableComponent;
  let fixture: ComponentFixture<SettingsCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
