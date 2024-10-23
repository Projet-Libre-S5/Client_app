import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  item:number=0;

  public readonly sidebar_elements = [
    { label: "Dashboard", route_path: "/Dashboard", svg_light:"/assets/svg/light/grid.svg",svg_dark:"/assets/svg/dark/grid.svg", childs: [] },
    { label: "Adresses",route_path: "/Adresses" ,svg_light:"/assets/svg/light/map.svg",svg_dark:"/assets/svg/dark/map.svg",childs: []},
    { label: "Laboratoires",route_path: "/Laboratories" ,svg_light:"/assets/svg/light/building.svg",svg_dark:"/assets/svg/dark/building.svg",childs: [
      { label: "Contacts", route_path: "/"},
    ]},
    { label: "Analyses",route_path: "/Analyses",svg_light:"/assets/svg/light/clipboard.svg",svg_dark:"/assets/svg/dark/clipboard.svg",childs: [
      { label: "Patients", route_path: "/"},
      { label: "Epreuves", route_path: "/"},
      { label: "Tests", route_path: "/"},
    ]},
    ]


}
