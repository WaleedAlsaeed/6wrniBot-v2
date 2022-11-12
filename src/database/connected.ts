import { DataBaseEvent } from "../structures/Event"

export default new DataBaseEvent(
    "connected",
    async () => {
        console.log("[DataBase Status]: Connected.")
    }
);