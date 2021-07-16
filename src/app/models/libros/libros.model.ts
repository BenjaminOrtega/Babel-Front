import { Deserializable } from '../deserializable';
import { Locaciones } from '../locaciones/locaciones.model';

export class Libros implements Deserializable {

  public idLibro?: number;

  public titulo?: string;

  public volumen?: string;

  public locacion?: Locaciones;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
