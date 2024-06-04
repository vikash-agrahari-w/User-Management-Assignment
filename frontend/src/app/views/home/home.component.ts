import { HeaderService } from "./../../components/template/header/header.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: "Home",
      icon: "home",
      routeUrl: "",
    };
  }
  items = [
    {
      title: 'Create User',
      description: 'You can create a new user by entering a few details.',
      image: 'assets/img/create.png'
    },
    {
      title: 'Update User',
      description: 'You can update an existing user\'s information.',
      image: 'assets/img/update.png'
    },
    {
      title: 'Delete User',
      description: 'You can delete an existing user from the system.',
      image: 'assets/img/delete.png'
    },
    {
      title: 'List Users',
      description: 'You can view a list of all the users in the system.',
      image: 'assets/img/read.png'
    },
    {
      title: 'Generate User PDF',
      description: 'You can generate a PDF document containing the details of a user.',
      image: 'assets/img/generate.png'
    },
    {
      title: 'Preview User PDF',
      description: 'You can preview the generated PDF document before downloading it.',
      image: 'assets/img/preview.png'
    },
];
  ngOnInit(): void {}
}
