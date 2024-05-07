import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from './models/resource';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
providedIn: 'root'
})
export class ResourceService {

	constructor(private httpClient : HttpClient) { }

	/**
	 * Retrieves all resources.
	 * 
	 * Throws an error if the request is unsuccessful.
	 * 
	 * @returns {Observable<Resource[]>} An observable of an array of resources.
	 */
	getAllResources() : Observable<Resource[]> 
	{
		return this.httpClient.get<Resource[]>(environment.apiUrl + "/api/resource/all").pipe(
			catchError((error: any) => {
				return throwError(() => new Error('A kért erőforrások betöltése sikertelen!'));
			})
		);
	}

	/**
	 * Adds a new resource.
	 * 
	 * Throws an error if the request is unsuccessful.
	 * 
	 * @param resource The resource to be added.
	 * @returns {Observable<Resource>} An observable of the added resource.
	 */
	addResource(resource: Resource)
	{
		return this.httpClient.post<Resource>(environment.apiUrl + "/api/resource",resource).pipe(
			catchError((error : any) => {
				return throwError(() => new Error("A kérés végrehajtása sikertelen volt!"));
			})
		);
	}

	/**
	 * Deletes a resource.
	 * 
	 * Throws an error if the request is unsuccessful.
	 * 
	 * @param resourceId The ID of the resource to be deleted.
	 * @returns {Observable<Resource>} An observable of the deleted resource.
	 */
	deleteResource(resourceId: number)
	{
		return this.httpClient.delete<Resource>(environment.apiUrl + `/api/resource/${resourceId}`).pipe(
			catchError((error:any) => {
				return throwError(() => new Error("A kérés végrehajtása sikertelen volt!"));
			})
		);
	}

	/**
	 * Modifies a resource.
	 * 
	 * Throws an error if the request is unsuccessful.
	 * 
	 * @param resourceId The ID of the resource to be modified.
	 * @param resourceToModify The resource data to be modified.
	 * @returns {Observable<Resource>} An observable of the modified resource.
	 */
	modifyResource(resourceId : number, resourceToModify : Resource)
	{
		return this.httpClient.put<Resource>(environment.apiUrl + `/api/resource/${resourceId}`,resourceToModify).pipe(
			catchError((error: any) => {
					return throwError(() => new Error("A kérés végrehajtása sikeretelen volt!")); 
			})
		);
	}
}
