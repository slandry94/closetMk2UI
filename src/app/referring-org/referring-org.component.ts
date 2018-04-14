import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferringOrgService } from './referring-org.service';
import { isNull } from 'util';
export class ReferringOrg {
  public organizationName: string;
  public organizationProgLoc: string;
  public orgAddressOne: string;
  public orgAddressTwo: string;
  public orgAddressCity: string;
  public orgAddressState: string;
  public orgAddressZip: string;
}
@Component({
  selector: 'app-referring-org',
  templateUrl: './referring-org.component.html',
  providers: [ReferringOrgService],
  styleUrls: ['./referring-org.component.css']
})
export class ReferringOrgComponent implements OnInit, OnDestroy {
  public refOrgInstance: ReferringOrg;
  public modType: string;
  public header: string;
  public loading = true;
  private id: string;
  private prog: string;
  private sub: any;
  private _orgService: ReferringOrgService;
  constructor(private route: ActivatedRoute, orgService: ReferringOrgService) {
    this._orgService = orgService;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['prog']) {
        this.prog = params['prog'];
      } else {
        this.prog = null;
      }
      if (!isNull(this.prog)) {
        // we can retrieve the program information for updating
        this.getRefOrg(this.id, this.prog);
      }
      if (this.id === 'create' && isNull(this.prog)) {
        this.modType = 'Create';
        this.header = 'Add New Referring Program';
      } else {
        this.modType = 'Update';
        this.header = 'Update Existing Referring Program';
      }
      console.log(this.id);
      console.log(this.prog);
    });
    this.refOrgInstance = new ReferringOrg();
  }
  public retrieveClick() {
    // this.getRefOrg(this.id, this.prog);
  }
  private getRefOrg(orgName: string, program: string) {
    return this._orgService.find(orgName, program).subscribe(
      data => this.onGetOrgSuccess(data),
      error => this.onGetOrgFailure(error)
    );
  }
  private onGetOrgSuccess(data: any) {
    this.refOrgInstance.organizationName = data['referringOrganization'];
    this.refOrgInstance.organizationProgLoc = data['referringProgOrLocation'];
    this.refOrgInstance.orgAddressOne = data['orgAddressOne'];
    this.refOrgInstance.orgAddressTwo = data['orgAddressTwo'];
    this.refOrgInstance.orgAddressCity = data['orgAddressCity'];
    this.refOrgInstance.orgAddressState = data['orgAddressState'];
    this.refOrgInstance.orgAddressZip = data['orgAddressZip'];
    console.log(this.refOrgInstance);
  }
  private onGetOrgFailure(error: any) {
    console.log(error);
  }
  submit() {
    return this._orgService.update(this.refOrgInstance).subscribe(
      data => this.onUpdateOrgSuccess(data),
      error => this.onUpdateOrgFailure(error)
    );
  }
  private onUpdateOrgSuccess(data: any) {

  }
  private onUpdateOrgFailure(error: any) {

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
