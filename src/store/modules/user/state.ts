interface User {
    token: string | null,
    username: string,
    role?: string[]
}

import {getToken} from "@/utils";

export const State: User = {
    token: getToken(),
    username: "admin"
}
export default State
