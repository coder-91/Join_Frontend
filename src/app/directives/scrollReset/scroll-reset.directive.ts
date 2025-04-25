import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Directive({
  selector: '[appScrollReset]',
  standalone: true
})
export class ScrollResetDirective implements OnDestroy {
  private subscription: Subscription;

  constructor(private el: ElementRef, private router: Router) {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.el.nativeElement.scrollTop = 0;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
