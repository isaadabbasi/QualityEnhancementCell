import { modalOptionsModel } from './modal.interface';
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
  @Input('options') options : modalOptionsModel;
  @Input('main-title') mainTitle: string = '';
  @Output('output') output: EventEmitter<Map<string, any>> = new EventEmitter();
  @ViewChild('modal', {read: ElementRef}) modal: ElementRef;
  @HostBinding('class.set-on-top') onTop: boolean = true;
  outputMaps: Map<string, any> = new Map();                              //Bindined with template
  _ref: any;

  constructor(private vcRef: ViewContainerRef) { }

  ngOnInit() {
    this.onTop = this.options["metaData"].setOnTop;
  }

  buttonClicked(buttonId){
    this._ref.destroy();
    console.log(buttonId);    
    this.outputMaps.set('status', buttonId);
    this.output.emit(this.outputMaps);
  }
}