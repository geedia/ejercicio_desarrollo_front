import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TitularComponent } from './titulares/titular.component';
import { TitularService } from './titulares/titular.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormTitularComponent } from './titulares/form/form-titular/form-titular.component';

const routes: Routes = [
  {path: '', redirectTo: '/titulares', pathMatch: 'full' },
  {path: 'titulares', component: TitularComponent},
  {path: 'titulares/form/:cuit', component: FormTitularComponent},
  {path: 'titulares/form', component: FormTitularComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TitularComponent,
    FormTitularComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TitularService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
