import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dataset } from './models/dataset';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
providedIn: 'root'
})
export class DatasetService {

	constructor(private httpClient : HttpClient) { }

	/**
	 * Retrieves datasets associated with a specific resource.
	 * 
	 * Throws an error if the request is unsuccessful.
	 * 
	 * @param resourceId The ID of the resource for which datasets are to be retrieved.
	 * @returns {Observable<Dataset[]>} An observable of an array of datasets.
	 */
	getDatasetForResource(resourceId : number) : Observable<Dataset[]> {
		return this.httpClient.get<Dataset[]>(environment.apiUrl+`/api/dataset/withresource/${resourceId}`).pipe(
			catchError((error: any) => {
				if(error.status == 404)
					return throwError( () => new Error("Ilyen erőforrás nem található!"));	 
				return throwError( () => new Error("Az adatok betöltése sikertelen volt!"));
			})
		);
	}

	/**
	 * Retrieves datasets associated with a specific resource within a specific date range.
	 * 
	 * Throws an error if the request is unsuccessful.
	 * 
	 * @param resourceId The ID of the resource for which datasets are to be retrieved.
	 * @param startDate The start date of the date range.
	 * @param endDate The end date of the date range.
	 * @returns {Observable<Dataset[]>} An observable of an array of datasets.
	 */
	getDataSetBySpecificDate(resourceId : number,startDate: string, endDate: string) : Observable<Dataset[]>{
		return this.httpClient.get<Dataset[]>(environment.apiUrl+`/api/dataset/withresource/${resourceId}/withdate?dateStart=${startDate}&dateEnd=${endDate}`).pipe(
			catchError((error: any) => {
				if(error.status == 404)
					return throwError( () => new Error("Ilyen erőforrás nem található!"));	 
				return throwError( () => new Error("Az adatok betöltése sikertelen volt!"));
			})
		);;
	}
}
