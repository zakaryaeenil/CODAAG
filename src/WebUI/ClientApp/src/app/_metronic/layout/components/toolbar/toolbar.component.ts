import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import {ActivationStart, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';

  private routeData : any;

  constructor(private layout: LayoutService, private router: Router) {

  }

  ngOnInit(): void {
    this.toolbarContainerCssClasses =
      this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
  }

  onSubmit(){
    this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        console.log(`Custom data`, data.snapshot.data);
      }
    });
  }
  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }
}
