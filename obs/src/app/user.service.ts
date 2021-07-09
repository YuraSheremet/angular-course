import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
// activate = new EventEmitter<boolean>();
activate = new Subject<boolean>();
}