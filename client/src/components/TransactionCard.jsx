import React from 'react';
import { CalendarDays, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';

function TransactionCard({ item }) {
    const { deleteTransaction } = useAppContext();

    const handleDelete = async () => {
        try {
            await deleteTransaction(item._id);
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-gray-50 px-4 py-4 rounded-xl">
            <div>
                <h4 className="font-bold text-lg text-black/80">{item.description}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                    <CalendarDays size={14} className="mr-1" />
                    {new Date(item.date).toLocaleString()}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p
                        className={`font-bold text-xl ${
                            item.type === 'Expense' ? 'text-red-500' : 'text-green-600'
                        }`}
                    >
                        ₹ {parseFloat(item.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                </div>

                {/* Delete Button */}
                <button
                    className="hover:bg-red-50 text-red-500 p-1 rounded-md border border-gray-200 hover:border-red-300"
                    onClick={handleDelete}
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}

export default TransactionCard;
