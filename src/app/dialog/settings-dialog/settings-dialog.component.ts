import {Component, OnInit} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandler: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities =>
      this.priorities = priorities);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  private onAddPriority(priority: Priority) {
    this.dataHandler.addPriority(priority).subscribe();
  }

  private onDeletePriority(priority: Priority) {
    this.dataHandler.deletePriority(priority.id).subscribe();
  }

  private onUpdatePriority(priority: Priority) {
    this.dataHandler.updatePriority(priority).subscribe();
  }
}
