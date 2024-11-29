import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() initials: string = '';
  @Input() size: number=0;
  @Input() backgroundColor: string = '';
}
