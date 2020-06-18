import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dialogTitle: string = 'Удаление задачи';
  message: string = 'Подтвердите удаление';

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    // @inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string }
  ) {
    // this.dialogTitle = data.dialogTitle;
    // this.message = data.message;
  }

  ngOnInit(): void {
  }

  private onConfirm(): void {
    this.dialogRef.close(true);
  }

  private onCancel(): void {
    this.dialogRef.close(false);
  }
}
