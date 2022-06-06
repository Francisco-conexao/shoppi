import { Component } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';

import { NegociosService } from "../services/negocios.service";

import { NegocioPage } from "../negocio/negocio.page";
import { CategoriasService } from '../services/categorias.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    
    negocios:any = [];
    promos:any = [];
    negocios2:any = [];
    categorias:any = [];
    categoriaElg:number = 0;

    slideOpts:any = {
        slidesPerView: 3.3,
        spaceBetween: 10,
        allowTouchMove: true
    }

    slideOpts2:any = {
        slidesPerView: 1,
        spaceBetween: 10,
        allowTouchMove: true,
        speed: 600,
        autoplay: true
    }

    constructor(private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet, private loadingCtrl: LoadingController,
        //SERVICES-------------------------------
        private categoriasServ: CategoriasService, private negociosServ: NegociosService) {
        
    }

    ionViewWillEnter() {
        this.listarNegocios();
        this.listarCategorias();
    }

    async listarNegocios(){
        let loader = await this.loadingCtrl.create({spinner:'crescent', mode:'ios'});
        await loader.present();
        this.negociosServ.listar({'categoria':this.categoriaElg}).then((data:any)=>{
            loader.dismiss();
            this.negocios = data.negocios;
            this.negocios2 = data.negocios;
            this.promos = data.promos;
        })
    }

    async listarCategorias(){
        let loader = await this.loadingCtrl.create({spinner:'crescent', mode:'ios'});
        await loader.present();
        this.categoriasServ.listar().then((data:any)=>{
            loader.dismiss();
            this.categorias = data.categorias;
        })
    }

    async verNegocio(negocio) {
        const modal = await this.modalCtrl.create({
            component: NegocioPage,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {id_negocio:negocio.id}
        },);
        modal.onWillDismiss().then(data => {
            
        });
        return await modal.present();
    }

    async verPromo(id_negocio){
        const modal = await this.modalCtrl.create({
            component: NegocioPage,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {id_negocio:id_negocio}
        },);
        modal.onWillDismiss().then(data => {
            
        });
        return await modal.present();
    }

    getItems(ev: any) {
        this.negocios = this.negocios2;
        const val = ev.target.value;
        
        if (val && val.trim() != '') {
            this.negocios = this.negocios.filter((item) => {
                return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.palabras_claves.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
    
}
