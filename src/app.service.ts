import { HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IDataPost, IError, IGetAll, IGetDatabaseName, IGetOne } from './IAppService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { IconEntity } from './icon.entity';
import { Repository } from 'typeorm';
import { databaseConfig } from './app.config';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { IconDto } from './icon.dto';
import { ExpressionsService } from './expressions.service';
import { IconRepository } from './emoji.repository';

@Injectable()
export class AppService {
  /**
   * Injects the ClientProxy for communicate by TCP transport.
   * @author Patouillard Franck
   * @date 2025-04-07
   * @version 1.0.0
   */
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  })
  private readonly emojiService: ClientProxy;
  constructor(private readonly iconRepository: IconRepository, private readonly expressionsService: ExpressionsService) {}
  /**
   * Retrieves all emojis from the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetAll | IError>} - Returns all emojis or an error object.
   * @version 1.0.0
   * @throws {NotFoundException} - Throws an error if emojis are not found.
   */
  async getAll(): Promise<IGetAll | IError> {
    try {
      return {
        message: 'ok', 
        data: await this.iconRepository.find({
          select: ['id', 'htmlCode', 'name'],
        }), 
        status: HttpStatus.OK
      };
    }catch {
      return {message: 'NOT FOUND', status: HttpStatus.NOT_FOUND};
    }
  }
  
  /**
   * Retrieves all emojis from the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetAll | IError>} - Returns all emojis or an error object.
   * @version 1.0.0
   * @throws {NotFoundException} - Throws an error if emojis are not found.
   */
  async getAllFromService(): Promise<IGetAll | IError> {
    return this.getAll();
  }

  /**
   * Retrieves a specific emoji by its ID.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetOne | IError>} - Returns the specific emoji or an error object.
   * @version 1.0.0
   */
  async getOne(id: number): Promise<IGetOne | IError> {
    try {
    return {
      message: 'ok', 
      data: await this.iconRepository.findOneOrFail({
        where: { id },
        select: ['id', 'htmlCode', 'name'],
      }),
      status: HttpStatus.OK
    };
    } catch {
      return {
        message: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND
      };
    }
  }

  /**
   * Retrieves the name of the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetDatabaseName | IError>} - Returns the database name or an error object.
   * @version 1.0.0
   * @throws {NotFoundException} - Throws an error if the database name is not found.
   */
  async getDatabaseName(): Promise<IGetDatabaseName | IError> {
    try {
      return {
        message: 'Ok',
        data: {
          database_name: databaseConfig.database,
          database_type: databaseConfig.type.toString()
        },
        status: HttpStatus.OK
      }
    }catch {
      return {
        message: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND
      };  
    }
  }

  /**
   * Creates a new emoji in the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IDataPost | IError>} - Returns the created emoji data or an error object.
   * @returns {Error} - Return an error if the emoji already exists.
   * @version 1.0.0
   * @throws {UnauthorizedException} - Throws an error if the user is not authorized to create a new emoji.
   
   */
  async postOne(emojiData: {data: IconDto, applicant: string, recipient: string}): Promise<IDataPost | IError> {    
      if(
        await this.expressionsService.verifyIfIsGoodApplicantAndRecipientToString(emojiData) && 
        !await this.iconRepository.isGoodEmoji(emojiData.data)
      ) {
        await this.iconRepository.save({...emojiData.data, createdAt: new Date()});
        return {
          message: 'New emoji added successfully',
          status: HttpStatus.CREATED
        };
      } else if(await this.iconRepository.isGoodEmoji(emojiData.data)) {
        return {
          message: 'Ooops something went wrong, emoji already exists',
          status: HttpStatus.BAD_REQUEST
        }
      } else {
        throw new UnauthorizedException('You are not authorized to create new emoji');
      }
  }

  /**
   * Deletes an emoji from the database.
   * @date 2025-04-07
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @param emojiData - The emoji data to be deleted.
   * @param emojiData.id - The ID of the emoji to be deleted.
   * @param emojiData.applicant - The applicant's identifier.
   * @param emojiData.recipient - The recipient's identifier.
   * @returns {Promise<IDataPost | IError>} - Returns the result of the deletion or an error object.
   * @version 1.0.0
   * @throws {UnauthorizedException} - Throws an error if the user is not authorized to delete the emoji.
   */
  async deleteOne(emojiData: {id: number, applicant: string, recipient: string}): Promise<IDataPost | IError> {
    if(
      await this.expressionsService.verifyIfIsGoodApplicantAndRecipientToString(emojiData) &&
      await this.iconRepository.findOneBy({ id: emojiData.id })
    ) {
      const icon = await this.iconRepository.findOneBy({ id: emojiData.id });
      icon.deleted_at = new Date();
      await this.iconRepository.save(icon);
      return {
        message: 'Emoji deleted successfully',
        status: HttpStatus.OK
      };
    } else if(await this.expressionsService.verifyIfIsGoodApplicantAndRecipientToString(emojiData)){
      throw new UnauthorizedException('You are not authorized to delete this emoji');
    } else {
      return {
        message: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND
      };
    }
  }

}
