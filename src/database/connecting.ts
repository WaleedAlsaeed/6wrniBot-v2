import { DataBaseEvent } from "../structures/Event"

export default new DataBaseEvent(
    "connecting",
    async () => {
        console.log("[DataBase Status]: Connecting...")
    }
);