import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

/**
 * 수상 이력 목록 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 *
 */
function Awards({isEditable}){
    return (
        <>
            리스트
            {isEditable && (
                <>
                    <Button
                      variant="outlined" color="success"
                    >
                      편집
                    </Button>
                    <Button variant="outlined" color="error">
                    삭제
                    </Button>
                </>
        )}
        </>
    )
}

export default Awards