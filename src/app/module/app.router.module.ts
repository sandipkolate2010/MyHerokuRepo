import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewissuesComponent } from '../component/issues/viewissues/viewissues.component';
import { AddupdateissueComponent } from '../component/issues/addupdateissue/addupdateissue.component';

const routes: Routes = [
  { path: '', redirectTo: '/viewissue', pathMatch: 'full' },
  { path: 'viewissue', component: ViewissuesComponent },
  { path: 'addissue', component: AddupdateissueComponent },
  { path: 'updateissue/:id', component: AddupdateissueComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
