export class Wishlist {
    usuarioId: string;
    listaProductos: Array<string>;
    id: string;
 

    constructor( id: string, producto: string){
        this.usuarioId = id;
        this.listaProductos = new Array<string>();
        this.listaProductos.push(producto);

    }
   
} 
