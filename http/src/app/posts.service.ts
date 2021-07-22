import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createStorePosts(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post<{ name: string }>('https://http-88752-default-rtdb.firebaseio.com/posts.json', postData, 
        {
            observe: 'response'
        })
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key')
        return this.http
            .get<{ [key: string]: Post }>('https://http-88752-default-rtdb.firebaseio.com/posts.json', {
                headers: new HttpHeaders({'hello': 'world'}),
                // params: new HttpParams().set('print', 'pretty')
                params: searchParams,
                responseType: 'json'
            })
            .pipe(
                map(responseData => {
                    const postArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postArray.push({ ...responseData[key], id: key })
                        }
                    }
                    return postArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    deletePosts() {
        return this.http.delete('https://http-88752-default-rtdb.firebaseio.com/posts.json', 
        {
            observe: 'events',
            responseType: 'json'
        }
        ).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Sent) {
                // console.log(event)
            }
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}