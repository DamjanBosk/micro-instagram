import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { PostFormComponent } from "../components/post-form/post-form.component";

@Injectable({
    providedIn: "root",
})
export class DirtyFormGuard implements CanDeactivate<unknown> {
    canDeactivate(
      component: PostFormComponent,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (component.canDeactivate()) {
        return confirm(
          'There are changes made to this page. Are you sure you want to leave?'
        );
      }
      return true;
    }
  }
  
