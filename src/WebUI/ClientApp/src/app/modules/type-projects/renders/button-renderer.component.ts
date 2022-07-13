import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `<button class="btn btn-sm btn-outline-primary cursor-pointer" (click)="onClick($event)">Update</button>
                &nbsp;
             <button class="btn btn-sm btn-outline-success cursor-pointer" (click)="onClick($event)">View</button>`
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params : any;
  label: string;

  agInit(params : any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event : any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}
