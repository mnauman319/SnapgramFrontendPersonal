import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Tag } from '../models/tag';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  async createTag(tag:Tag,uId:number, pId:number):Promise<Tag>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    tag = await this.http.post<Tag>(`${this.baseUrl}/users/${uId}/photos/${pId}/tags`,tag,{headers}).toPromise();
    return tag;
  }

  async deleteTag(tId:number):Promise<boolean>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    return await this.http.delete<boolean>(`${this.baseUrl}/users/0/photos/0/tags/${tId}`,{headers}).toPromise();
  }                                                                                                                                                                                                                                                                                                                                                                           
}
