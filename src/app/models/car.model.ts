import { BaseModel } from "./base/base.model";

export class Car extends BaseModel {
    public veiculo: string;
    public marca: string;
    public ano: number;
    public descricao: string;
    public vendido: boolean;
}