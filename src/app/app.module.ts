import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewissuesComponent } from '../app/component/issues/viewissues/viewissues.component';
import { AddupdateissueComponent } from '../app/component/issues/addupdateissue/addupdateissue.component';
import { MaterialModule } from './module/app.material.module';

import { DataService } from '../app/service/data.service';
import { AppRoutingModule } from './module/app.router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ViewissuesComponent,
    AddupdateissueComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
