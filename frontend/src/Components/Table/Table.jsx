import React from 'react'
import './Table.scss'
const Table = ({ data, render, headerItems, tableRowClassName }) => {
    return (
        <table>
            <thead>
                <tr className={tableRowClassName}>
                    {headerItems.map((item, index) => <th key={index + 1} data-label={item}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                {data ? data.map(render) : render()}
            </tbody>
        </table>
    )
}

export default Table