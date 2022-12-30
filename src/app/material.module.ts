import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'

const materialModules: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule
]

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
