import { Deserializable } from "../deserializable";


export class Locaciones implements Deserializable{


    public idLocacion?: number;

	  public sala?: string;

	  public librero?: string;

	  public estante?: string;

	  public posicion?: string;

	  public uso?: boolean;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}
