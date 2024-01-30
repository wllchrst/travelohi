import styled from "styled-components";

export const TableContainer = styled.div`
    display: flex;
    justify-content: center;
    table {
        width: 80%;
        max-width: 800px;
        background-color: ${p => p.theme.accent};
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 20px 0;
    }

    th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid ${p => p.theme.fontDimmed};
    }

    th {
        background-color: #3498db;
        color: #fff;
        font-weight: 600;
    }


`
