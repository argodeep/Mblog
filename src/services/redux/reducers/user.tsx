import { ActionModel } from "../../models/action";

export function user (state = null, action: ActionModel) {
    switch (action.type) {
        case "SET_USER":
            return action.data
        default:
            return state;
    }
}

export function users (state = [], action: ActionModel) {
    switch (action.type) {
        case "SET_USERS":
            return action.data
        default:
            return state;
    }
}




