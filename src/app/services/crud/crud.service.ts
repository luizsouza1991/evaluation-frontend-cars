import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseModel } from 'src/app/models/base/base.model';
import { Constant } from 'src/app/constants/constants';

export class CrudService<T extends BaseModel> {
  baseUrl = Constant.BASE_URL;
  constructor(
    public http: HttpClient,
    public path: string
  ) {
    this.baseUrl += path;
  }

  public index(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  public show(uuid:string): Observable<any> {
    let url = this.baseUrl + uuid;
    return this.http.get(url);
  }

  public create(data: T):Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  public update(uuid: string, data: T) {
    let url = this.baseUrl + uuid;
    return this.http.put(url, data);
  }

  public destroy(uuid: string) {
    let url = this.baseUrl + uuid;
    return this.http.delete(url);
  }

  public search(data):Observable<any> {
    let url = this.baseUrl + 'find?' + this.addParams(data);
    console.log(url)
    return this.http.get(url); 
  }

  public addParams(data) {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => {
      if (data[key] != null && data[key] !== undefined && data[key].toString().length > 0 ) {
        params = params.append(key, data[key]);
      }
    });
    return params.toString();
  }
}
