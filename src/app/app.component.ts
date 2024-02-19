import { map, filter} from 'rxjs/operators';
import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OneView } from './modules/home/model/home';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Order Details Dashboard';
  showLoader = false;
  isDesktopScreen: boolean = true;
  orderId: string;
  constructor( private router: Router,
    private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    window.innerWidth <= 1024 ? this.isDesktopScreen = false : this.isDesktopScreen = true;
    
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route: ActivatedRoute = this.router.routerState.root;
        let routeTitle = '';

        //loop that returns child of active routes
        while (route!.firstChild) {
          route = route.firstChild;
        }

        //sets title
        if (route.snapshot.data['title']) {
          routeTitle = route!.snapshot.data['title'];
        }
        return routeTitle;
      })
    )

    //subscribes and sets title
    .subscribe((title: string) => {
      if (title) {
        this.orderId ? this.titleService.setTitle(`${this.orderId} - ${title}`) : this.titleService.setTitle(title);
      }
    });

    //getting order id from routing params
    this.activatedRoute.queryParams.subscribe((params) => {
      this.orderId = params['orderId'];
  })
  }
  /**
   * Method that get invoke when the window is resized
   * @param event 
   */

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth <= 1024 ? this.isDesktopScreen = false : this.isDesktopScreen = true;
  }
 
}
