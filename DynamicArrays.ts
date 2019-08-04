interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;

}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

class DynamicArrays<T> implements Iterator<T>{
    private arr: Array<T>;
    private len: number = 0;
    private capacity: number = 0;
    private readPointer: number = 0

    constructor()
    constructor(capacity: number)

    constructor(capacity?: number) {
        if(!capacity) {
            this.capacity = 16;
        }
        else {
            if (capacity < 0) throw new Error(`Illegal Capacity: ${capacity}`);
            this.capacity = capacity;
        }
        this.arr = new Array<T>(this.capacity);
    }

    public size():number {
        return this.arr.length
    }

    public isEmpty():boolean {
        return this.arr.length > 0 ? false : true
    }

    public get(index: number): T {
        return this.arr[index]
    }

    public set(index: number, elem: T) : void {
        this.arr[index] = elem;
    }

    public addElem(elem: T): void {
        if(this.capacity < this.len + 1) {
            if (this.capacity === 0) this.capacity = 1;
            if (this.capacity > 1) this.capacity = this.capacity * 2;

            let newArr = new Array(this.capacity);

            for (let i = 0; i < this.arr.length; i++) {
                newArr[i] = this.arr[i];
            }
            this.arr = newArr;
        }
        this.arr[this.len++] = elem;

    }

    public clear(): void {
        for(let i = 0; i < this.len; i++)
            this.arr[i] = null

        this.len = 0;
    }

    public next(): IteratorResult<T> {
        if(this.readPointer <= this.len) {
            return {
                done: false,
                value: this.arr[this.readPointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }

    public removeAt(index: number) {
        let newArr = new Array(this.len - 1)
        for(let i = 0; i < this.len; i++) {
            if(i !== index)
                newArr[i] = this.arr[i]
        }
        this.arr = newArr
    }
}
