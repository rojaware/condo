import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  MatTabsModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTooltipModule,
];

@NgModule({
  exports: [material],
  imports: [material],
})
export class MaterialModule {}
