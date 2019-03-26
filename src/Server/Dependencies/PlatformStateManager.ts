import {PlatformState} from "../../../ui/src/App/Store/PlatformState/PlatformState";
import initialPlatformState from "../../../ui/src/App/Store/PlatformState/initialPlatformState";

type OnUpdateFunc = (state: PlatformState) => void
type UpdateStateFunc = (state: PlatformState) => PlatformState

export default class PlatformStateManager {
    private state: PlatformState = initialPlatformState
    private subscribers: OnUpdateFunc[] = []

    /**
     * Register a subscriber
     */
    onUpdate(func: OnUpdateFunc) {
        this.subscribers.push(func)
    }

    update(updateStateFunc: UpdateStateFunc) {
        this.state = updateStateFunc(this.state)
        this.notifySubscribers()
    }

    private notifySubscribers() {
        for (const sub of this.subscribers) {
            sub(this.state)
        }
    }
}
