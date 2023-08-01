import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
// import { PageNumberParameterGuard } from './guards/page-number-parameter.guard';
// import { SearchTextParameterGuard } from './guards/search-text-parameter.guard';
import { HomeComponent } from './components/home/home.component';
import { PageNumberParameterGuard } from './guards/page-number-parameter.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'cities', component: CityComponent, pathMatch: 'full', canActivate: [PageNumberParameterGuard]},
  { path: 'cities', component: CityComponent, data: { queryParams: ['pageNumber', 'searchText'] } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PageNumberParameterGuard]
})
export class AppRoutingModule { }
