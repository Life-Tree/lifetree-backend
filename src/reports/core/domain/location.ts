export class Location{
    private address: string;    
    private latitude: string;    
    private longitude: string;
    private neighborhood: string;

    constructor(lat: string,lon: string, neighborhood: string, address: string){
        this.latitude = lat;
        this.longitude = lon;
        this.neighborhood = neighborhood;
        this.address = address;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getLatitude(): string {
        return this.latitude;
    }

    public setLatitude(latitude: string): void {
        this.latitude = latitude;
    }

    public getLongitude(): string {
        return this.longitude;
    }

    public setLongitude(longitude: string): void {
        this.longitude = longitude;
    }

    public getNeighborhood(): string {
        return this.neighborhood;
    }

    public setNeighborhood(neighborhood: string): void {
        this.neighborhood = neighborhood;
    }



}