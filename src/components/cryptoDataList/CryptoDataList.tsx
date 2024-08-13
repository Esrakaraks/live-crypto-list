import React, { useState } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {useReactTable,createColumnHelper,flexRender,getCoreRowModel} from '@tanstack/react-table';
import UseFetchCryptoData from '../../api/UseFetchCryptoData';
import { TypeCryptoData } from '../../api/typeCryptoData';
import { MdArrowOutward } from 'react-icons/md';
import { GoArrowDownRight } from 'react-icons/go';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const columnHelper = createColumnHelper<TypeCryptoData>();

const columns = [
  columnHelper.accessor('symbol', {
    cell: info => {
      const row = info.row.original;
      const {symbol,name,image} = row;
      return (
        <div className='crypto-column-container'>
          <img src={image} alt={name} className='crypto-column-image' />
          <div>
            <div className='crypto-column-symbol'>{symbol.toUpperCase()}<div className='usdt-text'>/USDT</div></div>
            <div className='crypto-column-name'>{name}</div>
          </div>
        </div>
      );
    },
    header: () => 'Crypto',
  }),

  columnHelper.accessor('current_price', {
    cell: info => (
    <>
      {info.getValue()} <span className='usdt-text' style={{fontSize: '9px'}}>USDT</span>
    </>
    ),
    header: () => 'Price',
  }),

  columnHelper.accessor('market_cap', {
    cell: info => (
      <>
        {info.getValue()} <span className='usdt-text' style={{fontSize: '9px'}}>USDT</span>
      </>
      ),
    header: () => 'Market Value',
  }),

  columnHelper.accessor('price_change_percentage_24h', {
    cell: info => {
      const priceValue = info.getValue();
      const displayValue = priceValue < 0 ? priceValue.toString().replace('-', '') : priceValue;
      const color = priceValue < 0 ? 'red' : priceValue > 0 ? 'green' : '#777676';
      const Icon = priceValue < 0 ? GoArrowDownRight : priceValue > 0 ? MdArrowOutward : null;

      return (
        <span style={{ color, fontWeight: '600' }}>
          {Icon && <Icon />}
          {Number(displayValue).toFixed(2)}%
        </span>
      );
    },
    header: () => '24h Change',
  }),

  // to get the last 24 data, get the last 24 items
  columnHelper.accessor('sparkline_in_7d', {
    cell: info => {
      const sparklineData = info.getValue()?.price.slice(-24);
      const priceChangePercentage24h = info.row.original.price_change_percentage_24h;
      const color = priceChangePercentage24h < 0 ? 'red' : priceChangePercentage24h > 0 ? 'green' : '#777676';

      return (
        <Sparklines data={sparklineData} width={150} height={40}>
          <SparklinesLine style={{ strokeWidth: 3, fill: 'none' }} color={color} />
        </Sparklines>
      );
    },
    header: () => '',
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
    <div className=''>
      <table className='cryptolist-container'>
        <thead className='cryptolist-head'>
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
      <div className='pagination-container'>
        <MdKeyboardArrowLeft className='pagination-prev' onClick={() => setPage(prev => Math.max(prev - 1, 1))}/>
        <div className='pagination-page'>{page}</div>
        <MdKeyboardArrowRight className='pagination-next' onClick={() => setPage(prev => prev + 1)} />
      </div>    
    </div>
  );
};

export default CryptoList;
