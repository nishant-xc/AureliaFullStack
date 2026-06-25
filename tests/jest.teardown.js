import pool from "../src/database/database.js";

export default async function () {
    console.log("JEST TEARDOWN RUNNING");
    await pool.end();
    console.log("POSTGRES POOL CLOSED");
}
