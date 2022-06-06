import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NegociosService } from '../services/negocios.service';

declare var google;

@Component({
    selector: 'app-negocio',
    templateUrl: './negocio.page.html',
    styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {
    id_negocio:number;
    negocio:any = {};
    productos:any = [];
    geocoder:any;
    service:any;
    map:any;
    viewMap:boolean = false;

    constructor(private navParams: NavParams, private modalCtrl: ModalController, private statusBar: StatusBar, private loadingCtrl: LoadingController,
        //SERVICES-----------------------------------------------
        private negociosServ: NegociosService) {
            
    }

    ngOnInit() {
        
    }
    
    ionViewWillEnter() {
        this.statusBar.styleLightContent();
        this.id_negocio = this.navParams.data.id_negocio;
        console.log(this.navParams.data.id_negocio)
        this.listarProductos();
        this.listarNegocio();
    }

    regresar() {
        this.modalCtrl.dismiss({
            'dismissed': true,
            'tipo': 'tipo'
        });
        this.statusBar.styleDefault();
    }

    async listarProductos(){
        let loader = await this.loadingCtrl.create({spinner:'crescent', mode:'ios'});
        await loader.present();
        this.negociosServ.listarProductos({'id':this.id_negocio}).then((data:any)=>{
            loader.dismiss();
            this.productos = data.productos;
        })
    }


    async listarNegocio(){
        let loader = await this.loadingCtrl.create({spinner:'crescent', mode:'ios'});
        await loader.present();
        this.negociosServ.negocio({'id':this.id_negocio}).then((data:any)=>{
            loader.dismiss();
            this.negocio = data.negocio;
            this.loadMap();
        })
    }

    //Carga el mapa en la lat y lng del negocio -----------------------------------------------
    loadMap(){
        let mapEle: HTMLElement = document.getElementById('map');
        let myLatLng = {lat: this.negocio.lat, lng: this.negocio.lng};
        let mapOptions={
            center: myLatLng,
            zoom: 16,
            mapTypeControl: false,
            disableDefaultUI: false
        }
        this.map = new google.maps.Map(mapEle, mapOptions);

        let marker = new google.maps.Marker({
            map: this.map,
            position: myLatLng,
        })
        this.map.setCenter(marker.getPosition(),16);
    }

}
