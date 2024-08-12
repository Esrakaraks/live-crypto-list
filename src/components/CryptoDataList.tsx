import React, { useState } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel
} from '@tanstack/react-table';
import UseFetchCryptoData from '../api/UseFetchCryptoData';
import { TypeCryptoData } from '../api/typeCryptoData';

const columnHelper = createColumnHelper<TypeCryptoData>();

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: () => 'Name',
  }),
  columnHelper.accessor('symbol', {
    cell: info => info.getValue(),
    header: () => 'Symbol',
  }),
  columnHelper.accessor('current_price', {
    cell: info => info.getValue(),
    header: () => 'Price',
  }),
  columnHelper.accessor('market_cap', {
    cell: info => info.getValue(),
    header: () => 'Market Value',
  }),

  columnHelper.accessor('sparkline_in_7d', {
    cell: info => {
      const sparklineData = info.getValue()?.price.slice(-24);
      const color = sparklineData[sparklineData.length - 1] > sparklineData[0] ? 'green' : 'red';
      return (
        <Sparklines data={sparklineData} width={100} height={20}>
          <SparklinesLine style={{ stroke: "none", fill: "none" }} color={color}/>
        </Sparklines>
      );
    },
    header: () => '24h Sparkline',
  })
];

const CryptoList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); 
  const { data, error, isLoading } = UseFetchCryptoData(page, perPage);
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
      <div className="h-4" />
      <div className="h-4" />
    </div>
  );
};

export default CryptoList;
