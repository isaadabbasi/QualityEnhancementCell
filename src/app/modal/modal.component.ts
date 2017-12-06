import { Component, 
         OnInit, 
         Input, 
         HostBinding, 
         ViewChild,
         ElementRef, 
         ViewContainerRef, 
         Output,
         EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input('options') options : Object = {};
  @Input('main-title') mainTitle: string = '';
  @Output('output') output: EventEmitter<Map<string, any>> = new EventEmitter();
  @ViewChild('modal', {read: ElementRef}) modal: ElementRef;
  @HostBinding('class.set-on-top') onTop: boolean = true;

  _ref: any;

  constructor(private vcRef: ViewContainerRef) { }

  ngOnInit() {
    this.onTop = this.options["metaData"].setOnTop;
  }

  buttonClicked(buttonId){
    this._ref.destroy();
    console.log(buttonId);
    if(buttonId === 'cancel'){
      let output = new Map();
      output.set('buttonClicked', buttonId);
      this.output.emit(output)
    }
  }

}
