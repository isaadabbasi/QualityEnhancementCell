import { Component, 
         OnInit, 
         Input, 
         HostBinding, 
         ViewChild,
         ElementRef, 
         ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input('options') options : Object = {};
  @Input('main-title') mainTitle: string = '';
  
  @ViewChild('modal', {read: ElementRef}) modal: ElementRef;
  @HostBinding('class.set-on-top') onTop: boolean = true;

  constructor(private vcRef: ViewContainerRef) { }

  ngOnInit() {
    this.onTop = this.options["metaData"].setOnTop;
  }

  buttonClicked(buttonId){
    console.log(buttonId);
    if(buttonId === 'cancel'){
      console.log(this.modal);  
      let parentComponent = this.vcRef.parentInjector;
      console.log(parentComponent)  
    }
  }

}
