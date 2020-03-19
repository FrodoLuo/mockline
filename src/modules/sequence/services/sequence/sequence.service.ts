import { Injectable, HttpException } from '@nestjs/common';

import { BaseSequence, SequenceType, TimeSequence, OrderSequence, SequenceItem, ISequenceConfig, ITimeSequenceConfig } from './sequence.model';
import { StorageService } from '../../../storage/storage.service';
import { join } from 'path';

@Injectable()
export class SequenceService {

    constructor(
        private storageService: StorageService,
    ) { }

    public requestCount = 0;

    private sequences: {
        [path: string]: BaseSequence;
    } = {};

    public get sequenceCount() {
        return this.getAllStoredSequenceItems().length;
    }

    public resetSequence(path: string) {
        if (this.sequences[path]) {
            this.sequences[path].reset();
        }
        return { msg: 'success' };
    }

    /**
     * Invoke storageService to scan the whole [data] folder for .json files.
     * And this method will treat every json file as a sequence defining file, and convert them into javascript objects.
     * This method is for View controller to get data, so it will finally return SequenceItem[], which is for front end.
     */
    public getAllStoredSequenceItems(): SequenceItem[] {
        const pathes = this.storageService.scanConfigPathes();
        return pathes
            .map(path => ({
                uri: path,
                sequenceConfig: this.storageService.getObjectFromFile(path),
            }));
    }

    /**
     * Method to get data from sequences. If sequence is not in memory, a new sequence will be created and registried.
     * @param path API path to the related sequence
     */
    public getMockData(path: string) {
        if (!this.sequences[path]) {
            this.registry(
                path,
                this.createSequence(this.storageService.getObjectFromFile<ISequenceConfig>(path)),
            );
        }
        this.requestCount ++;
        return this.sequences[path].getData();
    }

    /**
     * Method to get sequence configs. Considering in the future usage, all the json file should be created by server,
     * so there won't be any content check.
     * @param path API path to related sequence
     */
    public getSequence(path: string) {
        return this.storageService.getObjectFromFile(path);
    }

    /**
     *
     * @param body Sequence defining object
     */
    public async saveSequence(path: string, config: ISequenceConfig) {
        if (this.checkConfig(config)) {
            const s = await this.storageService.saveObjectToFile(path, config);
            this.resignSequence(path);
            return s;
        } else {
            throw new HttpException('config format error', 400);
        }
    }


    public deleteSequence(path: string) {
        this.storageService.deleteFile(path);
    }

    /**
     * When a sequence in instance be modified, a recreate of instance is necessary.
     * @param path
     */
    private resignSequence(path: string) {
        this.sequences[path] = null;
        this.registry(
            path,
            this.createSequence(this.storageService.getObjectFromFile<ISequenceConfig>(path)),
        );
    }

    /**
     * Check whether a object is a Sequence definine
     * @param config configs for checking whether it's a Sequence definine. May I need a more elligant way to do this?
     */
    private checkConfig(config: any) {
        return config.datas
            && config.type
            && (config.type === SequenceType.ORDER_SEQUENCE) || (config.type === SequenceType.TIME_SEQUENCE && config.option.sequence);
    }

    /**
     * Factory method to create Sequence runtime instance.
     * @param config Sequence definines
     */
    private createSequence(config: ISequenceConfig): BaseSequence {
        if (!this.checkConfig(config)) { return null; }
        switch (config.type) {
            case SequenceType.TIME_SEQUENCE:
                return new TimeSequence(config.datas, config.option as ITimeSequenceConfig);
            case SequenceType.ORDER_SEQUENCE:
                return new OrderSequence(config.datas, config.option);
        }
    }

    /**
     * Registry Sequence instance to the memory, using the path as key.
     * @param path API path related to the Sequence
     * @param sequence Sequence instance
     */
    private registry(path: string, sequence: BaseSequence) {
        this.sequences[path] = sequence;
    }
}
