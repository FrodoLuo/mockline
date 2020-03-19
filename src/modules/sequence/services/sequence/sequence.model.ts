/**
 * Sequence types.
 */
export enum SequenceType {
    TIME_SEQUENCE = 'TIME_SEQUENCE',
    ORDER_SEQUENCE = 'ORDER_SEQUENCE',
}

/**
 * Base Sequence option
 */
export interface ISequenceOption {
    infinite?: boolean;
}

/**
 * Time Sequence option, extra with sequence
 */
export interface ITimeSequenceOption extends ISequenceOption {
    /**
     * Time sequence, with unit of millsecond.
     */
    sequence: number[];
}

/**
 * This interface shape is for presentation in front end.
 */
export interface SequenceItem {
    uri: string;
    sequenceConfig: ISequenceConfig;
}

/**
 * A base interface shape of sequence.
 */
export interface ISequenceConfig {
    datas: any[];
    type: SequenceType;
    active: boolean;
    option: ISequenceOption;
}

/**
 * A certain type(TimeSequence) definition of sequence
 */
export interface ITimeSequenceConfig extends ISequenceConfig {
    type: SequenceType.TIME_SEQUENCE;
    sequence: number[];
    option: ITimeSequenceOption;
}

/**
 * A certain type(OrderSequence) definition of sequnce
 */
export interface IOrderSequenceConfig extends ISequenceConfig {
    type: SequenceType.ORDER_SEQUENCE;
    option: ISequenceOption;
}

/**
 * Above is some interface and shape definition.
 *
 * Currently, there is only two types of Sequence. I just simply put them here together.
 */

/**
 * Base Sequence class, abstract and must implement getData() and reset() and reset() methods before create any instance
 */
export abstract class BaseSequence {

    /**
     * Options
     *
     * infinite: boolean whether the mock sequence should keep returning the last data after it reaches the last one.
     */
    protected infinite = false;

    protected datas: any[];

    protected currentIndex = 0;

    constructor(datas: any[], option?: ISequenceOption) {
        this.datas = datas;
        this.infinite = option.infinite || false;
    }

    /**
     * Get the data with the currentIndex.
     */
    public getData(): any {
        return this.datas[this.currentIndex] || null;
    }

    /**
     * Reset the sequence instance to the initial status.
     */
    public abstract reset(): void;

    /**
     * Convert the sequence instance to the next status.
     */
    protected abstract next(): void;

}

/**
 * Sequence with ordered data. Every data in sequence will only be fetched once in given order.
 * If inifinte was set to true, after the last data was fetched, any later fetch requesting will get the last data as response.
 * If false, after the last data was fetched, a new loop will start from the first data.
 */
export class OrderSequence extends BaseSequence {

    public getData() {
        const data = this.datas[this.currentIndex];
        this.next();
        return data;
    }

    public reset() {
        this.currentIndex = 0;
    }

    protected next() {
        this.currentIndex = this.currentIndex + 1;
        if (this.currentIndex >= this.datas.length) {
            if (!this.infinite) {
                this.reset();
            } else {
                this.currentIndex -= 1;
            }
        }
    }
}

/**
 * Sequence with data on time sequence. Every data in sequence will got fetched based on when the sequence is requested.
 * Time will start counting at the first request incoming.
 *
 * If infinite was set to true, after the last data's timestamp shows up, any later fetch requesting will get the last data as response.
 * If false, the sequence will got reset to the initial status, and start its time sequence again.
 *
 */
export class TimeSequence extends BaseSequence {

    constructor(datas: any[], option: ITimeSequenceOption) {
        super(datas, option);
        this.sequence = option.sequence;
    }

    private sequence: number[];

    private timer = null;

    public getData() {
        if (this.currentIndex === 0) {
            this.startSequence();
        }
        return this.datas[this.currentIndex];
    }

    public reset() {
        clearTimeout(this.timer);
        this.timer = null;

        this.currentIndex = 0;
    }

    protected next() {
        this.currentIndex += 1;
    }

    private startSequence() {
        if (this.timer) { return; }
        this.startSequenceRecursive(0);
    }

    private startSequenceRecursive(currentTimerIndex: number) {
        if (currentTimerIndex >= this.sequence.length) {
            if (!this.infinite) {
                this.reset();
            }
            return;
        }
        this.timer = setTimeout(() => {
            this.next();
            this.startSequenceRecursive(currentTimerIndex + 1);
        }, this.sequence[currentTimerIndex]);
    }
}
