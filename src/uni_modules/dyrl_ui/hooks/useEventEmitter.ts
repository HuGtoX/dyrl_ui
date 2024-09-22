import {ref, watchEffect} from 'vue';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
    private subscriptions = new Set<Subscription<T>>();

    emit = (val: T) => {
        for (const subscription of this.subscriptions) {
            subscription(val);
        }
    };

    useSubscription = (callback: Subscription<T>) => {
        const callbackRef = ref<Subscription<T>>();
        callbackRef.value = callback;

        function subscription(val: T) {
            if (callbackRef.value) {
                callbackRef.value(val);
            }
        }

        watchEffect((onCleanup) => {
            this.subscriptions.add(subscription);
            onCleanup(() => {
                this.subscriptions.delete(subscription)
            })
        });
    };
}

const eventEmitter = new EventEmitter<{ type: string, payload?: any }>();
export default function useEventEmitter() {
    const eventEmitterRef = ref<EventEmitter<{ type: string, payload?: any }>>();
    if (!eventEmitterRef.value) {
        eventEmitterRef.value = eventEmitter;
    }
    return eventEmitterRef.value;
}