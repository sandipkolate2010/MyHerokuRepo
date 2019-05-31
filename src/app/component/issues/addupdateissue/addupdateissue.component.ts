import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/model/issue';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Route } from '@angular/compiler/src/core';
import { load } from '@angular/core/src/render3/instructions';
import { formatDate } from '@angular/common';
import { FilterType } from 'src/app/model/filtertype';

@Component({
  selector: 'app-addupdateissue',
  templateUrl: './addupdateissue.component.html',
  styleUrls: ['./addupdateissue.component.css']
})
export class AddupdateissueComponent implements OnInit {

  issue = new Issue();
  issueId = 0;
  severityFilter = new FilterType('', '');
  severityTypes = Array<FilterType>();

  statusFilter = new FilterType('', '');
  statusTypes = Array<FilterType>();

  constructor(private router: Router, private dataservice: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.issueId = params['id'] || 0;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    });
  }

  ngOnInit() {
    if (this.issueId !== 0){
      this.loadSelectedIssue();
    }
    this.severityTypes.push(new FilterType('Major', 'Major'));
    this.severityTypes.push(new FilterType('Minor', 'Minor'));
    this.severityTypes.push(new FilterType('Critical', 'Critical'));
    this.severityFilter = new FilterType('Major', 'Major');
    this.statusFilter = new FilterType('Open', 'Open');
    this.statusTypes.push(new FilterType('Open', 'Open'));
    this.statusTypes.push(new FilterType('In Progress', 'In Progress'));
    this.statusTypes.push(new FilterType('Closed', 'Closed'));
    this.issue.Severity = this.severityFilter.value;
    this.issue.Status = this.statusFilter.value;
  }

  loadSelectedIssue() {
    this.dataservice.getIssue(this.issueId)
    .subscribe(response => {
      console.log('response');
      console.log(response);
      this.issue = response as Issue;
    });
  }

  onSeverityChange(event: any) {

  }

  onStatusChange(event: any) {

  }

  addupdateissue(issue: Issue) {
    if (this.issueId !== 0) {
      issue.ResolvedDate = issue.Status === 'Closed' ? formatDate(new Date(), 'yyyy/MM/dd', 'en') : '';
      this.dataservice.updateIssue(issue)
        .subscribe(data => {
          console.log('successful update');
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        });
    } else {
      issue.CreatedDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
      issue.ResolvedDate = issue.Status === 'Closed' ? formatDate(new Date(), 'yyyy/MM/dd', 'en') : '';
      this.dataservice.addIssue(issue)
        .subscribe(data => {
          console.log('successful entry');
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
