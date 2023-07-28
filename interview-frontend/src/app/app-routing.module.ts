import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { AppComponent } from './app.component';
import { PageNumberParameterGuard } from './guards/page-number-parameter.guard';
import { SearchTextParameterGuard } from './guards/search-text-parameter.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'cities/searchResult/:searchText/:pageNumber', component: CityComponent, canActivate: [SearchTextParameterGuard]},
  { path: 'cities/:pageNumber', component: CityComponent, canActivate: [PageNumberParameterGuard] },
  { path: 'cities/searchResult/:searchText', redirectTo: '/cities/searchResult/:searchText/1'},
  { path: 'cities', redirectTo: '/cities/1'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PageNumberParameterGuard, SearchTextParameterGuard]
})
export class AppRoutingModule { }
