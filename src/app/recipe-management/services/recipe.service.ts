import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  serverUrl: String = `${environment.baseUrl}/ap1/v1/recipes`;

  constructor(
    private _http: HttpClient
  ) { }

  /***********************************************************************************************************
 * Server integration
 */
  postNewRecipe(recipeDetails: any): Observable<any> {
    console.log("RECIPE DETAILSSSS:::", recipeDetails);
    const url = `${this.serverUrl}/post`;
    return this._http.post<any>(url, recipeDetails);
  }

  fetchAllRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/all`;
    return this._http.get<any>(url);
  }

  fetchFavRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/favRecipes`;
    return this._http.get<any>(url);
  }

  fetchNewRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/newRecipes`;
    return this._http.get<any>(url);
  }

  fetchMyRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/myRecipes`;
    return this._http.get<any>(url);
  }

  searchRecipeById(params: any): Observable<any> {
    const url = `${this.serverUrl}/get/id`;
    return this._http.get<any>(url, { params: params });
  }

  updateRecipe(recipeDetails: any): Observable<any> {
    const url = `${this.serverUrl}/update`;
    return this._http.put<any>(url, recipeDetails)
  }

  deleteRecipe(params: any): Observable<any>{
    const url = `${this.serverUrl}/delete`;
    return this._http.delete<any>(url, { params: params });
  }
}
