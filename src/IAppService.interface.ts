import { HttpStatus } from "@nestjs/common";
import { IconEntity } from "./icon.entity";

export interface IGetAll {
  message: string;
  data: IconEntity[];
  status: HttpStatus;
};

export interface IGetOne {
  message: string;
  data: IconEntity;
  status: HttpStatus;
}

export interface IError {
  message: string;
  status: HttpStatus;
}

export interface IGetDatabaseName {
  message: string;
  data: {
    database_name: string | Uint8Array<ArrayBufferLike>;
    database_type: string;
  };
  status: HttpStatus;
}

export interface IDataPost {
  message: string;
  status: HttpStatus;
}