import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RankingComponent} from './ranking.component'; 

@NgModule({
    imports:[CommonModule],
    declarations: [RankingComponent],
    exports:[RankingComponent]
})

export class RankingModule{}