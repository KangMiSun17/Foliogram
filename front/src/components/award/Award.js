import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
  } from "@mui/material";
import Awards from "./Awards";

/**
 * 수상 이력 카드 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 *
 */
function Award({ isEditable }){
    
    return (
        <Card sx={{ minWidth: 30 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                수상 이력
                </Typography>
                <Typography variant="h5" component="div">
                    <Awards isEditable={isEditable}/>
                </Typography>
            </CardContent>
            <CardActions>
                <Button sx={{
                    display: 'inline',
                    border: 1,
                    }} size="small">추가
                </Button>
            </CardActions>
    </Card>
    );
}

export default Award