import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//MÓDULOS
import { PagesModule } from './pages/pages.module';

// RUTAS
import { APP_ROUTES } from './app.routes';

// TEMPORAL
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
