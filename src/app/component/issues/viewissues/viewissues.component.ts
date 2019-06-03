import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Issue } from '../../../model/issue';
import { DataService } from '../../../service/data.service';
import { FilterType } from '../../../model/filtertype';

@Component({
  selector: 'app-viewissues',
  templateUrl: './viewissues.component.html',
  styleUrls: ['./viewissues.component.css']
})
export class ViewissuesComponent implements OnInit, AfterViewInit {

  issues = Array<Issue>();
  displayedColumns: string[] = ['Description', 'Severity',
    'Status', 'CreatedDate', 'ResolvedDate', 'Action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<Issue>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  severityFilter = new FilterType('', '');
  severityTypes = Array<FilterType>();

  statusFilter = new FilterType('', '');
  statusTypes = Array<FilterType>();

  issueDescription = '';
  issueSeverity = 'All';
  issueStatus = 'All';

  constructor(private dataservice: DataService,
    private router: Router) { }

  ngOnInit() {
    this.severityFilter = new FilterType('All', 'All');
    this.severityTypes.push(new FilterType('All', 'All'));
    this.severityTypes.push(new FilterType('Major', 'Major'));
    this.severityTypes.push(new FilterType('Minor', 'Minor'));
    this.severityTypes.push(new FilterType('Critical', 'Critical'));
    this.statusFilter = new FilterType('All', 'All');
    this.statusTypes.push(new FilterType('All', 'All'));
    this.statusTypes.push(new FilterType('Open', 'Open'));
    this.statusTypes.push(new FilterType('In Progress', 'In Progress'));
    this.statusTypes.push(new FilterType('Closed', 'Closed'));
  }

  addColumn() {
    const len = this.columnsToDisplay.length;
    if (!this.columnsToDisplay.includes(this.displayedColumns[len]) && this.columnsToDisplay.length < this.displayedColumns.length) {
      this.columnsToDisplay.push(this.displayedColumns[len]);
    }
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  filterColumns(element, index, array) {
    return (element !== 'Action');
  }

  ngAfterViewInit() {
    // this.loadIssues();
  }

  loadIssues() {
    this.dataservice.getIssues()
      .subscribe(response => {
        console.log(response);
        const tempActivityPoints: any = response;
        this.issues = Array<Issue>();
        tempActivityPoints.forEach(element => {
          const issue = new Issue();
          issue.id = element.id;
          issue.Description = element.Description;
          issue.Severity = element.Severity;
          issue.Status = element.Status;
          issue.CreatedDate = element.CreatedDate;
          issue.ResolvedDate = element.ResolvedDate;
          this.issues.push(issue);
        });
        this.filter();
        this.dataSource = new MatTableDataSource<Issue>(this.issues);
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log(err);
      });
  }

  onSearch(event: any) {
    this.loadIssues();
  }

  filter() {
    const issuesList = this.issues.filter((issue: Issue) =>
      issue.Description.includes(this.issueDescription)
      && (this.issueSeverity !== 'All' ? issue.Severity === this.issueSeverity : true)
      && (this.issueStatus !== 'All' ? issue.Status === this.issueStatus : true));
    this.issues = issuesList;
  }

  onEdit(event: any) {
    this.router.navigate(['/updateissue/' + event.target.id]);
  }

  onAdd(event: any) {
    this.router.navigate(['/addissue']);
  }

  onDelete(event: any) {
    console.log(event);
    this.dataservice.deleteIssue(event.target.id)
      .subscribe(Response => {
        console.log('successfully deleted');
        this.loadIssues();
      }, err => {
        console.log(err);
      });
  }
}
