import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CourseModule } from './course/course.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { NgForm } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticateComponent,
    CoursesListComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    HttpClientModule,
    CourseModule
    
  ],
  providers: [appInterceptorProvider,NgForm],
  bootstrap: [AppComponent]
})
export class AppModule { }
