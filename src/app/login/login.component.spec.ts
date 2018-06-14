
import {FormsModule} from "@angular/forms";
import {DebugElement,NO_ERRORS_SCHEMA} from "@angular/core";
import {TestBed,ComponentFixture,async,tick,fakeAsync} from "@angular/core/testing";
import {Router,Routes} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import {By} from "@angular/platform-browser";
import {Location} from "@angular/common";
import {of} from "rxjs/observable/of";

import { RoomService } from '../home/core/room.service';
import {LoginComponent} from "./login.component";
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { ErrorPageComponent } from '../error-page/error-page.component';

describe("testing login component",()=>{
    let loginInstance:LoginComponent=null;
    let roomService:RoomService=null;
    let router:Router=null;
    let fixture:ComponentFixture<LoginComponent>=null;
    let de:DebugElement=null;
    let httpMock:HttpTestingController;
    let location:Location;

    const routes:Routes=[
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent},
        {   
            path:"home",
            loadChildren:"app/home/home.module#HomeModule"
        },
        {
            path:"register",
            component:RegisterComponent
        },
        {path:"**",component:ErrorPageComponent}
    ]

    //setup
    beforeEach(async(()=>{
            TestBed.configureTestingModule({
                declarations:[LoginComponent,RegisterComponent,ErrorPageComponent,HomeComponent],
                imports:[RouterTestingModule.withRoutes(routes),HttpClientTestingModule,FormsModule],
                providers:[RoomService],
                schemas:[NO_ERRORS_SCHEMA]
            }).compileComponents();
            roomService=TestBed.get(RoomService);
            router=TestBed.get(Router);
            fixture=TestBed.createComponent(LoginComponent);
            loginInstance=fixture.componentInstance;
            de=fixture.debugElement;
            httpMock=TestBed.get(HttpTestingController);
            location=TestBed.get(Location);
        }
    ));

    //tear up

    afterEach(()=>{
        httpMock.verify();
    })

    it("verifying user",fakeAsync(()=>{
        

        loginInstance.userId="chan";
        loginInstance.password="pass";
        loginInstance.validateUser();
        
        const req=httpMock.expectOne(roomService.url+"/user/validate");
        expect(req.request.method).toBe("POST");
        req.flush("true");

        tick();
        expect(sessionStorage.getItem("userId")).toBe("null");
        expect(location.path()).toBe("/error");
    }));

    //change detection tests
    
    it("change detection from model to view",()=>{
        loginInstance.password="hello";
        loginInstance.userId="chandu";
        fixture.detectChanges();
        const login=de.query(By.css('[name="login-name"]'));
        expect(login.nativeElement.textContent).toBe("chandu");
    })

    it("change detection from view  to model",fakeAsync(()=>{
        const login=de.query(By.css('[name="username"]'));
        login.nativeElement.value="chan";
        login.triggerEventHandler("blur","");
        fixture.detectChanges();
        tick();
        expect(loginInstance.userId).toBe("chan");
    }))

    it("validataing user input",fakeAsync(()=>{
        spyOn(roomService,"validateUser").and.returnValue(of(true));
        expect(roomService.validateUser).toBeTruthy();
        loginInstance.validateUser();
        tick();
        expect(sessionStorage.getItem("userId")).toBe("null");
        expect(location.path()).toBe("/error");
    }));
});