import { Injectable } from "@nestjs/common";
import { MulterModuleOptions } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Injectable()
export class UploadMulter{
   static MulterOption(): MulterModuleOptions {
        return{
            storage : diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    let extArray = file.mimetype.split("/");
                    let extension = extArray[extArray.length - 1];
                    callback(null, file.fieldname + '-' + Date.now()+ '.' +extension)
                }
            }),
            fileFilter(req, file, callback) {
                if (file.mimetype.match(/\/(jpg|jpeg|png)$/) ) {
                    callback(null, true);
                  } else {
                    callback(new Error('Files not are allowed'), false);
                  }
            },
            limits : {fileSize : 1 * 1024 * 1024}
        }
    }
} 