import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "resources/:id/datasets/graphs", loadComponent: () => import('./dataset-graph/dataset-graph.component').then(m => m.DatasetGraphComponent)},
    {path: "resources/:id/datasets", loadComponent: () => import('./dataset-list/dataset-list.component').then(m => m.DatasetListComponent)},
    {path: "resources", loadComponent:() => import('./resource-list/resource-list.component').then(m => m.ResourceListComponent),
        children: [
            {path: "datasets", loadComponent: () => import('./dataset-list/dataset-list.component').then(m => m.DatasetListComponent)}
        ]},
    { path: "", redirectTo:"/resources", pathMatch: "full"}
];
