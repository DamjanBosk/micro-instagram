import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { PostsComponent } from "./components/posts/posts.component";
import { ExporePostsComponent } from "./components/expore-posts/expore-posts.component";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { DirtyFormGuard } from "./guards/dirty-form.guard";

const routes: Routes = [
    { path: "", component: PostsComponent },
    { path: "explore", component: ExporePostsComponent },
    { path: ":id/details", component: PostDetailsComponent },
    {
        path: ":id/edit",
        component: PostFormComponent,
        canDeactivate: [DirtyFormGuard],
    },
    {
        path: "create",
        component: PostFormComponent,
        canDeactivate: [DirtyFormGuard],
    },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
