import React from "react";
import Board from "./Board";
import { Stack } from "@mui/material";

export default function Trello() {
    return (
        <Stack>
            <h1 style={{ textAlign: "center" }}>Trello Clone</h1>
            <Board />
        </Stack>
    );
}
