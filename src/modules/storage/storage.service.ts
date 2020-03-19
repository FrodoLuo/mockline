import { Injectable, HttpException } from '@nestjs/common';
import { readFileSync, writeFileSync, readdirSync, unlinkSync, exists, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const urix = require('urix');
const write = require('write');

@Injectable()
export class StorageService {
  /**
   * Scan the [data] folder, and return the file's pathes with out ext name.
   * For example:
   * the file: data/api/cgi/getBooks.json
   * will get mapped to
   * /api/cgi/getBooks
   */
  public scanConfigPathes(): string[] {
    if (!existsSync('./data')) {
      mkdirSync('./data');
    }
    const pathes = this.readAllFiles('./data');
    return pathes
      .map(path => {
        return path.replace(/\.json/, '').replace(/^data(.*)$/, '$1');
      })
      .map(p => urix(p));
  }

  public getObjectFromFile<T = object>(path: string): T {
    try {
      const config = JSON.parse(
        readFileSync(join('./data', `${path}.json`), 'utf8'),
      );

      return config;
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  public async saveObjectToFile(path: string, obj: object) {
    // return writeFileSync(join('./data', path + '.json'), JSON.stringify(obj), {
    //     flag: 'w',
    // });
    return await write(join('./data', path + '.json'), JSON.stringify(obj));
  }

  public deleteFile(path: string) {
    return unlinkSync(join('./data', path + '.json'));
  }

  private readAllFiles(path: string): string[] {
    const status = readdirSync(path, {
      encoding: 'utf8',
      withFileTypes: true,
    });
    const store = status.reduce((prev, curr) => {
      if (curr.isDirectory()) {
        return [...prev, ...this.readAllFiles(join(path, curr.name))];
      } else {
        return [...prev, join(path, curr.name)];
      }
    }, []);
    return store.filter(p => p.match(/^.*\.json$/));
  }
}
