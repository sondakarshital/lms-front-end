import { Injectable } from '@angular/core';
import {UserDetail } from '../domain/user-detail'
@Injectable()
export class AppGlobals{
    public profile : UserDetail;
    public avatar : Blob; 
}