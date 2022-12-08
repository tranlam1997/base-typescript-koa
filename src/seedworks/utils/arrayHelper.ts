import _ from 'lodash';

export default class ArrayHelper<T> {
    diffrence(array1: T[], array2: T[]): T[] {
        return _.difference(array1, array2);
    };

    intersection(array1: T[], array2: T[]): T[] {
        return _.intersection(array1, array2);
    }

    union(array1: T[], array2: T[]): T[] {
        return _.union(array1, array2);
    }
};