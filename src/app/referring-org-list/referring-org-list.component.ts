import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReferringOrg } from '../referring-org/referring-org.component';
import {ReferringOrgService} from '../referring-org/referring-org.service';
import { MatDialog } from '@angular/material/dialog';
import { ReferringOrgListDialogComponent } from './referring-org-list-dialog.component';
@Component({
  selector: 'app-referring-org-list',
  templateUrl: './referring-org-list.component.html',
  styleUrls: ['./referring-org-list.component.css'],
  providers: [ReferringOrgService]
})
export class ReferringOrgListComponent implements OnInit {
  public refOrgs: ReferringOrg[];
  public colsToDisplay = ['orgName', 'progLoc', 'options'];
  constructor(private refOrgService: ReferringOrgService, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    // get list of referring orgs from the backend
    this.refOrgService.get().subscribe(
      // get the array of organizations back
      (res) => {console.log(res); this.onGetSuccess(res); },
      (error) => this.onGetError(error)
    );
  }
  public deleteOrg(orgName: string, progLoc: string) {
    console.log('deleteing organization: ' + orgName + ', Location: ' + progLoc);
    let dialogRef = this.dialog.open(ReferringOrgListDialogComponent, {
      width: '300px',
      data: {org: orgName, prog: progLoc},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      if (result) {
        // delete the organization
        console.log('User deleted the organization');
        this.refOrgService.delete(orgName, progLoc).subscribe(
          data => {console.log(data); this.refreshDataSource(orgName, progLoc); },
          error => console.log(error)
        );
      }
    });

  }
  private refreshDataSource(orgName: string, progLoc: string) {
    this.refOrgs = this.refOrgs.filter(x => x.orgName !== orgName && x.programOrLocation !== progLoc);
    this.changeDetectorRefs.detectChanges();
  }
  private onGetSuccess(body: ReferringOrg[]) {
    this.refOrgs = body;
    console.log(this.refOrgs);
  }
  private onGetError(error: any) {
    console.log('Failed to load organizations from database');
  }
}
