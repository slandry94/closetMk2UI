import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferringOrgService } from './referring-org.service';
import { isNull } from 'util';
export class ReferringOrg {
  public orgName: string;
  public programOrLocation: string;
  public addressOne: string;
  public addressTwo: string;
  public addressCity: string;
  public addressState: string;
  public addressZip: string;
}
@Component({
  selector: 'app-referring-org',
  templateUrl: './referring-org.component.html',
  providers: [ReferringOrgService],
  styleUrls: ['./referring-org.component.css']
})
export class ReferringOrgComponent implements OnInit, OnDestroy {
  private initOrgName: string;
  private initProgOrLocation: string;
  public refOrgInstance: ReferringOrg;
  public modType: string;
  public header: string;
  public loading = true;
  private id: string;
  private prog: string;
  public mode: string;
  public isReadOnly;
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
        if (params['mode']) {
          this.mode = params['mode'];
          if (this.mode === 'view') {
            this.isReadOnly = true;
          } else {
            this.isReadOnly = false;
          }
        } else {
          this.mode = 'view';
          this.isReadOnly = true;
        }
      } else {
        this.prog = null;
        this.mode = null;
        this.isReadOnly = false;
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
    console.log(this.isReadOnly);
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
    this.refOrgInstance.orgName = data['orgName'];
    this.refOrgInstance.programOrLocation = data['programOrLocation'];
    this.refOrgInstance.addressOne = data['addressOne'];
    this.refOrgInstance.addressTwo = data['addressTwo'];
    this.refOrgInstance.addressCity = data['addressCity'];
    this.refOrgInstance.addressState = data['addressState'];
    this.refOrgInstance.addressZip = data['addressZip'];
    this.initOrgName = this.refOrgInstance.orgName;
    this.initProgOrLocation = this.refOrgInstance.programOrLocation;
    console.log(this.refOrgInstance);
  }
  private onGetOrgFailure(error: any) {
    console.log(error);
  }
  submit() {
    return this._orgService.update(this.refOrgInstance, this.initOrgName, this.initProgOrLocation).subscribe(
      data => this.onUpdateOrgSuccess(data),
      error => this.onUpdateOrgFailure(error)
    );
  }
  private onUpdateOrgSuccess(data: any) {
    console.log(data);
  }
  private onUpdateOrgFailure(error: any) {

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
