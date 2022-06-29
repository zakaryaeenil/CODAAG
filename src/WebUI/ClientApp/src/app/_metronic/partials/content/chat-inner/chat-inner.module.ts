import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInnerComponent } from './chat-inner.component';
import {InlineSVGModule} from "ng-inline-svg-2";

@NgModule({
  declarations: [ChatInnerComponent],
  imports: [CommonModule, InlineSVGModule],
  exports: [ChatInnerComponent],
})
export class ChatInnerModule {}
