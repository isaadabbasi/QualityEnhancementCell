import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-crud-table',
  templateUrl: './settings-crud-table.component.html',
  styleUrls: ['./settings-crud-table.component.css']
})
export class SettingsCrudTableComponent implements OnInit {
  @Input('options') options = {} /*:Map<string, any> = new Map()*/;
  constructor() { }

  ngOnInit() {
  }

}
