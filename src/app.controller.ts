import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { IDataPost, IError, IGetAll, IGetDatabaseName, IGetOne } from './IAppService.interface';
import { MessagePattern } from '@nestjs/microservices';
import { IconDto } from './icon.dto';

@Controller('emoji')
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  /**
   * Retrieves the name of the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetDatabaseName | IError>} - Returns the database name or an error object.
   * @version 1.0.0
   */
  @MessagePattern({ cmd: 'database_name' })
  getDatabaseName(): Promise<IGetDatabaseName | IError> {
    return this.appService.getDatabaseName();
  }

  /**
   * Retrieves all emojis from the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetAll | IError>} - Returns all emojis or an error object.
   * @version 1.0.0
   */
  @MessagePattern({ cmd: 'get_all' })
  getHello(): Promise<IGetAll | IError> {
    return this.appService.getAll();
  }
  
  /**
   * Retrieves a specific emoji by its ID.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IGetOne | IError>} - Returns the specific emoji or an error object.
   * @version 1.0.0
   */
  @MessagePattern({ cmd: 'get_one' })
  get(@Body() data: {id: number}): Promise<IGetOne | IError> {
    return this.appService.getOne(data.id);
  }

  /**
   * Creates a new emoji in the database.
   * @author Patouillard Franck<patouillardfranck3@gmail.com>
   * @date 2025-04-07
   * @returns {Promise<IDataPost | IError>} - Returns the created emoji data or an error object.
   * @version 1.0.0
   */
  @MessagePattern({ cmd: 'create_new_emoji' })
  postOne(@Body() emojiData: {data: IconDto, applicant: string, recipient: string}): Promise<IDataPost | IError> {
    return this.appService.postOne(emojiData);
  }

}
