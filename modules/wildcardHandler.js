import { showValueOfWildcard } from "./gameViewModule.js";
import { chooseRandom } from "./helper.js";

export function wildcardHandling() {
    let options = [-3, -2, -1, 0, 1, 2, 3];
    const choice = chooseRandom(options);
    showValueOfWildcard(choice);
    return choice;
}