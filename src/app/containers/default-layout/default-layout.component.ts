import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
//User created global variable
import { AppGlobals} from '../../service/global'


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  profileUrl;
  constructor(private appGlobals : AppGlobals,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    //profile pic
    this.profileUrl = "assets/img/avatars/6.jpg";
    console.log("appGlobals ",appGlobals.profile.avatar);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();

  }
}
