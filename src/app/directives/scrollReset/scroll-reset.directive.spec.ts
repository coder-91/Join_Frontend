import { ScrollResetDirective } from './scroll-reset.directive';
import {ElementRef} from "@angular/core";
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('ScrollResetDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const mockRouter = { events: of() } as unknown as Router;
    const directive = new ScrollResetDirective(mockElementRef, mockRouter);
    expect(directive).toBeTruthy();
  });
});
