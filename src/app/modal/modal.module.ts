import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalComponentFactory } from './modal.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent
    ],
    exports: [
        ModalComponent
    ],
    entryComponents: [
        ModalComponent
    ]
})
export class ModalModule {
static forRoot(): ModuleWithProviders{
    return {
        ngModule: ModalModule,
        providers: [ModalComponentFactory]
    }
}
}