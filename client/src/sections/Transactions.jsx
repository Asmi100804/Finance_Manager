import React, { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';
import TransactionCard from '../components/TransactionCard';

function TransactionHistory() {
  const { transactions, search, setSearch } = useAppContext();
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let temp = [...transactions];

    // Filter by type
    if (typeFilter !== 'All') {
      temp = temp.filter(
        (t) => t.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    // Search by date, category, description
    if (search) {
      const lowerSearch = search.toLowerCase();
      temp = temp.filter((t) => {
        const dateString = new Date(t.date).toISOString().split('T')[0]; // YYYY-MM-DD
        return (
          (t.description && t.description.toLowerCase().includes(lowerSearch)) ||
          (t.category && t.category.toLowerCase().includes(lowerSearch)) ||
          dateString.includes(search) // match date search
        );
      });
    }

    // Sorting logic
    if (sortBy === 'Date') {
      temp.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Amount') {
      temp.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'Category') {
      temp.sort((a, b) => a.category.localeCompare(b.category));
    }

    setFiltered(temp);
  }, [search, typeFilter, sortBy, transactions]);

  return (
    <div className="w-full">
      {/* Filter Section */}
      <div className="rounded-xl bg-green-50 p-6 border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ArrowDownUp className="text-gray-1000" size={20} /> Filter Transactions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by date (YYYY-MM-DD), category or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-gray-1000"
          />

          {/* Transaction Type */}
          <div>
            <label className="block font-medium mb-1">Choose Transaction Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-gray-1000"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-medium mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-gray-1000"
            >
              <option value="Date">Date</option>
              <option value="Amount">Amount</option>
              <option value="Category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="rounded-xl bg-green-50 p-6 border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Transaction History</h3>

        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-1000">No transactions found.</p>
          ) : (
            filtered.map((item, index) => (
              <TransactionCard item={item} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
