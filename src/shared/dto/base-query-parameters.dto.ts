/*Classe abstrata de parâmetros de query */
export abstract class BaseQueryParametersDto {
  sort: string;
  page: number;
  limit: number;
}
