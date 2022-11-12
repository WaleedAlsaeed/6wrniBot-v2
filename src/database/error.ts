import { DataBaseEvent } from "../structures/Event"

export default new DataBaseEvent(
    "err",
    async (err) => {
        console.log(`[DataBase Status]: An Error Occured with Connection, Error:\n${err}`)
    }
);