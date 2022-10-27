import upload from '@config/upload';
import fs from 'fs';
import { resolve } from 'path';

import { IStorageProvider } from "../IStorageProvider";

export class LocalStoraProvider implements IStorageProvider {
  async save(folder: string, file: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file), 
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(folder:string, file: string): Promise<void> {
    const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(fileName);
    }  catch {
      return;
    }
  
    await fs.promises.unlink(fileName);
  }
}