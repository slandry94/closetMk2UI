import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';

@Component({
  selector: 'app-referring-org-list-dialog-component',
  templateUrl: 'referring-org-list-dialog.component.html'
})
export class ReferringOrgListDialogComponent {
  constructor(public dialogRef: MatDialogRef<ReferringOrgListDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {}
}
