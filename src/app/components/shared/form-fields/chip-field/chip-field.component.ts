import {Component, inject, Input} from '@angular/core';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {TitleCasePipe} from "@angular/common";
@Component({
  selector: 'app-chip-field',
  standalone: true,
  imports: [MatChipsModule, MatFormFieldModule, MatIconModule, FormsModule, ReactiveFormsModule, MatOption, MatSelect, MatInput, TitleCasePipe],
  templateUrl: './chip-field.component.html',
  styleUrl: './chip-field.component.scss'
})
export class ChipFieldComponent {
  @Input() control!: FormControl;
  @Input() controlTitle!: string;
  keywords: string[] = [];
  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    event.chipInput!.clear();
  }
}
